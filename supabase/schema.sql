-- SeenIt Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    trust_level TEXT DEFAULT 'NEW' CHECK (trust_level IN ('NEW', 'TRUSTED', 'ELITE')),
    identity_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    external_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration INTEGER NOT NULL, -- seconds
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    proof_type TEXT NOT NULL CHECK (proof_type IN ('USAGE', 'UNBOXING', 'FOLLOWUP')),
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- ============================================
-- CREDIBILITY SCORES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.credibility_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score DECIMAL(5,2) DEFAULT 0,
    consistency_factor DECIMAL(5,2) DEFAULT 0,
    watch_time_factor DECIMAL(5,2) DEFAULT 0,
    proof_factor DECIMAL(5,2) DEFAULT 0,
    community_trust DECIMAL(5,2) DEFAULT 0,
    last_calculated TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SCORE HISTORY TABLE (Audit Log)
-- ============================================
CREATE TABLE IF NOT EXISTS public.score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    old_score DECIMAL(5,2),
    new_score DECIMAL(5,2),
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WATCH EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.watch_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    watch_time INTEGER NOT NULL, -- seconds watched
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('FAKE', 'MISLEADING', 'INAPPROPRIATE', 'SPAM')),
    description TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'REVIEWED', 'ACTIONED', 'DISMISSED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES public.profiles(id)
);

-- ============================================
-- EVIDENCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('RECEIPT', 'SCREENSHOT', 'PHOTO')),
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_watch_events_review_id ON public.watch_events(review_id);
CREATE INDEX IF NOT EXISTS idx_reports_review_id ON public.reports(review_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credibility_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- PRODUCTS POLICIES (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create products" ON public.products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- REVIEWS POLICIES
CREATE POLICY "Published reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (status = 'APPROVED' OR user_id = auth.uid());

CREATE POLICY "Users can create their own reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = user_id AND status = 'PENDING');

CREATE POLICY "Users can delete their own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = user_id);

-- CREDIBILITY SCORES POLICIES
CREATE POLICY "Scores are viewable by everyone" ON public.credibility_scores
    FOR SELECT USING (true);

-- WATCH EVENTS POLICIES
CREATE POLICY "Users can create watch events" ON public.watch_events
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Watch events are viewable by review owner" ON public.watch_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.reviews 
            WHERE reviews.id = watch_events.review_id 
            AND reviews.user_id = auth.uid()
        )
    );

-- REPORTS POLICIES
CREATE POLICY "Users can create reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports" ON public.reports
    FOR SELECT USING (reporter_id = auth.uid());

-- EVIDENCE POLICIES
CREATE POLICY "Evidence viewable with review" ON public.evidence
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.reviews 
            WHERE reviews.id = evidence.review_id 
            AND (reviews.status = 'APPROVED' OR reviews.user_id = auth.uid())
        )
    );

CREATE POLICY "Users can add evidence to own reviews" ON public.evidence
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.reviews 
            WHERE reviews.id = review_id 
            AND reviews.user_id = auth.uid()
        )
    );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    
    INSERT INTO public.credibility_scores (user_id, score)
    VALUES (NEW.id, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to calculate credibility score
CREATE OR REPLACE FUNCTION public.calculate_credibility_score(p_user_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    v_consistency DECIMAL := 0;
    v_watch_time DECIMAL := 0;
    v_proof DECIMAL := 0;
    v_community DECIMAL := 0;
    v_total_reviews INTEGER;
    v_approved_reviews INTEGER;
    v_avg_watch_percentage DECIMAL;
    v_total_reports INTEGER;
    v_actioned_reports INTEGER;
    v_final_score DECIMAL;
BEGIN
    -- Get review counts
    SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'APPROVED')
    INTO v_total_reviews, v_approved_reviews
    FROM public.reviews WHERE user_id = p_user_id;
    
    -- Consistency factor (approved/total reviews)
    IF v_total_reviews > 0 THEN
        v_consistency := (v_approved_reviews::DECIMAL / v_total_reviews) * 100;
    END IF;
    
    -- Watch time factor (average watch percentage across all reviews)
    SELECT COALESCE(AVG(
        CASE WHEN r.duration > 0 
        THEN LEAST((w.watch_time::DECIMAL / r.duration) * 100, 100)
        ELSE 0 END
    ), 0)
    INTO v_watch_time
    FROM public.reviews r
    LEFT JOIN public.watch_events w ON r.id = w.review_id
    WHERE r.user_id = p_user_id AND r.status = 'APPROVED';
    
    -- Proof factor (reviews with evidence)
    SELECT COALESCE(
        (COUNT(DISTINCT e.review_id)::DECIMAL / NULLIF(v_approved_reviews, 0)) * 100,
        0
    )
    INTO v_proof
    FROM public.evidence e
    JOIN public.reviews r ON e.review_id = r.id
    WHERE r.user_id = p_user_id AND r.status = 'APPROVED';
    
    -- Community trust (inverse of actioned reports ratio)
    SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'ACTIONED')
    INTO v_total_reports, v_actioned_reports
    FROM public.reports rp
    JOIN public.reviews rv ON rp.review_id = rv.id
    WHERE rv.user_id = p_user_id;
    
    IF v_total_reports > 0 THEN
        v_community := (1 - (v_actioned_reports::DECIMAL / v_total_reports)) * 100;
    ELSE
        v_community := 100; -- No reports = perfect community trust
    END IF;
    
    -- Calculate final score with weights
    v_final_score := (
        (v_consistency * 0.35) +
        (v_watch_time * 0.30) +
        (v_proof * 0.20) +
        (v_community * 0.15)
    );
    
    -- Update credibility_scores table
    UPDATE public.credibility_scores
    SET 
        score = v_final_score,
        consistency_factor = v_consistency,
        watch_time_factor = v_watch_time,
        proof_factor = v_proof,
        community_trust = v_community,
        last_calculated = NOW()
    WHERE user_id = p_user_id;
    
    RETURN v_final_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA (Sample Products)
-- ============================================
INSERT INTO public.products (name, category, image_url) VALUES
    ('Sony WH-1000XM5', 'Electronics', NULL),
    ('MacBook Pro 14"', 'Computers', NULL),
    ('iPhone 15 Pro', 'Electronics', NULL),
    ('Samsung Galaxy S24 Ultra', 'Electronics', NULL),
    ('Dyson V15 Detect', 'Home Appliances', NULL),
    ('Apple Watch Series 9', 'Wearables', NULL),
    ('iPad Pro 12.9"', 'Tablets', NULL),
    ('Bose QuietComfort Ultra', 'Electronics', NULL),
    ('LG C3 OLED TV', 'Electronics', NULL),
    ('Instant Pot Duo', 'Kitchen', NULL)
ON CONFLICT DO NOTHING;

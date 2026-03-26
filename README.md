# SeenIt - India's Trust-First Review Platform

SeenIt is a video-first UGC review platform powered by the **SARS™ (Subconscious Authenticity Recognition System) Engine**. It is designed to combat fake reviews on the internet by strictly hosting 100% honest, verified user-generated video experiences.

## 🌟 Key Features
- **🎥 Video-First Reviews:** No text-heavy fake hype. Just real people showing real products.
- **🛡️ SARS™ Trust Engine:** A proprietary scoring system ensuring authenticity and credibility. 
- **💰 Earn from Impact:** A 2-sided ecosystem allowing creators to earn from genuine influence while brands get high-converting trusted UGC.
- **🥇 Gamified Trust XP:** An integrated XP leaderboard, tiers (New, Trusted, Elite), and commission multipliers based on trust metrics.
- **🇮🇳 Made for India:** Tailor-built for the Indian market dynamics.

## 🛠 Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Directory)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) & `@react-three/fiber`
- **Backend/Auth:** [Supabase](https://supabase.com/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables. 
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application!

## 🧩 Project Structure
- `/src/app/` - Next.js App Router pages (`page.tsx`, `layout.tsx`, etc.)
- `/src/app/(auth)/login/` - Custom themed cyberpunk/glassmorphic Authentication suite
- `/src/components/ui/` - Highly interactive custom components (Radar Hero, HoverFooter, ExpandCards, Interactive Marquee)
- `/src/lib/` - Utilities and Supabase client configurations

## 🎨 Design System
- **Colors:** Deep Navy (`#040C1A`), Trust Blue (`#1648CC`), Authenticity Gold (`#FFD700`)
- **Typography:** Titles in `Bangers` (comic-heavy/Gen-Z feel), Body in `Space Grotesk` (clean tech readability)
- **Vibe:** Cinematic, dynamic, game-like trust UI, heavily motion-driven to subconsciously signal authenticity.

## 📄 License
© 2026 SeenIt Technologies Inc. All rights reserved.

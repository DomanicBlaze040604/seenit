import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, Crown } from "lucide-react";
import type { TrustLevel } from "@/types";

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-200",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
                new: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                trusted:
                    "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300",
                elite:
                    "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md",
                success: "bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300",
                warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
                error: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
            },
            size: {
                sm: "text-[10px] px-2 py-0.5",
                default: "text-xs px-3 py-1",
                lg: "text-sm px-4 py-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
    );
}

// Trust Badge Component
interface TrustBadgeProps {
    level: TrustLevel;
    showIcon?: boolean;
    size?: "sm" | "default" | "lg";
    className?: string;
}

function TrustBadge({
    level,
    showIcon = true,
    size = "default",
    className,
}: TrustBadgeProps) {
    const config = {
        NEW: {
            label: "New",
            variant: "new" as const,
            icon: Shield,
        },
        TRUSTED: {
            label: "Trusted",
            variant: "trusted" as const,
            icon: ShieldCheck,
        },
        ELITE: {
            label: "Elite",
            variant: "elite" as const,
            icon: Crown,
        },
    };

    const { label, variant, icon: Icon } = config[level];

    return (
        <Badge variant={variant} size={size} className={className}>
            {showIcon && <Icon className="w-3 h-3" />}
            {label}
        </Badge>
    );
}

// Proof Type Badge
type ProofType = "USAGE" | "UNBOXING" | "FOLLOWUP";

interface ProofBadgeProps {
    type: ProofType;
    size?: "sm" | "default" | "lg";
    className?: string;
}

function ProofBadge({ type, size = "default", className }: ProofBadgeProps) {
    const config = {
        USAGE: { label: "Usage Review", variant: "success" as const },
        UNBOXING: { label: "Unboxing", variant: "default" as const },
        FOLLOWUP: { label: "Follow-up", variant: "warning" as const },
    };

    const { label, variant } = config[type];

    return (
        <Badge variant={variant} size={size} className={className}>
            {label}
        </Badge>
    );
}

// Status Badge
type StatusType = "PENDING" | "APPROVED" | "REJECTED";

interface StatusBadgeProps {
    status: StatusType;
    size?: "sm" | "default" | "lg";
    className?: string;
}

function StatusBadge({ status, size = "default", className }: StatusBadgeProps) {
    const config = {
        PENDING: { label: "Pending Review", variant: "warning" as const },
        APPROVED: { label: "Approved", variant: "success" as const },
        REJECTED: { label: "Rejected", variant: "error" as const },
    };

    const { label, variant } = config[status];

    return (
        <Badge variant={variant} size={size} className={className}>
            {label}
        </Badge>
    );
}

export { Badge, badgeVariants, TrustBadge, ProofBadge, StatusBadge };

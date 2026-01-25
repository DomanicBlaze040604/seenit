import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "elevated" | "glass" | "gradient";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variantStyles = {
            default:
                "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
            elevated:
                "rounded-xl border border-gray-100 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-gray-800 dark:bg-gray-900",
            glass:
                "rounded-xl border border-white/20 bg-white/80 backdrop-blur-lg shadow-lg dark:bg-gray-900/80 dark:border-gray-700/50",
            gradient:
                "rounded-xl border-0 bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg",
        };

        return (
            <div
                ref={ref}
                className={cn(variantStyles[variant], className)}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

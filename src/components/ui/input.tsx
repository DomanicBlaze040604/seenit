import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        id={inputId}
                        className={cn(
                            "flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-sm shadow-sm transition-all duration-200",
                            "placeholder:text-gray-400",
                            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
                            "dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500",
                            error
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-700",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };

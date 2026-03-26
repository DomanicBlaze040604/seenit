"use client";
import React from "react";
import { motion } from "framer-motion";

function twMerge(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-[#1648CC]/20",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 8s linear infinite;
        }
      `}</style>
      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[500px] md:w-[600px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_15px_#FFD700]" />
      </div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 6}rem`,
            width: `${(idx + 1) * 6}rem`,
            border: `1px solid rgba(22, 72, 204, ${0.4 - (idx + 1) * 0.04})`,
            boxShadow: idx === 3 ? "0 0 40px rgba(22, 72, 204, 0.1) inset" : "none",
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center space-y-3"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1648CC]/40 bg-[#0C1628] shadow-[0_0_20px_rgba(22,72,204,0.15)] overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1648CC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {icon}
      </div>
      <div className="hidden rounded-full px-3 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md md:block shadow-lg">
        <div className="text-center text-xs font-bold text-[#9BB5D9] tracking-wide">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

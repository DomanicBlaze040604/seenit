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
        @keyframes trail-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        @keyframes center-pulse {
          0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 6px #FFD700, 0 0 18px rgba(255,215,0,0.5), 0 0 36px rgba(255,215,0,0.2);
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.5);
            box-shadow: 0 0 12px #FFD700, 0 0 32px rgba(255,215,0,0.65), 0 0 60px rgba(255,215,0,0.3);
          }
        }
        @keyframes ring-pulse {
          0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
          40% { opacity: 0.5; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
        }
        .animate-radar-spin { animation: radar-spin 8s linear infinite; }
        .animate-trail-spin  { animation: trail-spin 8s linear infinite; }
        .animate-center-pulse { animation: center-pulse 2.4s ease-in-out infinite; }
        .animate-ring-pulse { animation: ring-pulse 2.4s ease-out infinite; }
      `}</style>

      {/* Sweep trail — conic gradient rotating in sync */}
      <div
        className="animate-trail-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "900px",
          height: "900px",
          background:
            "conic-gradient(from -18deg, rgba(255,215,0,0.22) 0deg, rgba(255,215,0,0.10) 25deg, rgba(255,215,0,0.02) 45deg, transparent 60deg, transparent 360deg)",
        }}
      />

      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[500px] md:w-[620px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div
          className="relative z-40 h-[2px] w-full"
          style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,215,0,0.6) 40%, #FFD700 80%, #fff8c0 100%)",
            boxShadow: "0 0 6px #FFD700, 0 0 18px rgba(255,215,0,0.55), 0 0 35px rgba(255,215,0,0.25)",
          }}
        />
      </div>

      {/* Pulsing ring behind center dot */}
      <div
        className="animate-ring-pulse absolute z-49 rounded-full bg-[#FFD700]/30 pointer-events-none"
        style={{ width: "20px", height: "20px", left: "50%", top: "50%" }}
      />

      {/* Center pulsing gold dot */}
      <div
        className="animate-center-pulse absolute z-50 rounded-full bg-[#FFD700]"
        style={{ width: "9px", height: "9px", left: "50%", top: "50%" }}
      />

      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 6}rem`,
            width: `${(idx + 1) * 6}rem`,
            border: `1px solid rgba(22, 72, 204, ${Math.max(0.06, 0.48 - idx * 0.05)})`,
            boxShadow:
              idx === 0
                ? "0 0 24px rgba(22,72,204,0.18) inset"
                : idx === 3
                ? "0 0 40px rgba(22,72,204,0.10) inset"
                : "none",
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center gap-2"
    >
      <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl border border-[#1648CC]/40 bg-[#0C1628]/90 shadow-[0_0_24px_rgba(22,72,204,0.2)] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1648CC]/15 to-transparent" />
        {icon}
      </div>
      <div className="rounded-full px-2.5 py-1 border border-white/10 bg-[#040C1A]/85 backdrop-blur-md shadow-lg">
        <div className="text-center text-[10px] md:text-xs font-bold text-[#9BB5D9] tracking-wide whitespace-nowrap">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

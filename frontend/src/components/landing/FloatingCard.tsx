"use client";

import { motion } from "framer-motion";

interface FloatingCardProps {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  badgeInitials?: string;
  badgeColor?: string;
}

export default function FloatingCard({
  className = "",
  delay = 0,
  duration = 4,
  children,
  badgeInitials,
  badgeColor = "bg-[#d3e3fc]" // Sky Wash default
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [-6, 6, -6],
        opacity: 1
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        },
        opacity: {
          duration: 0.8,
          delay
        }
      }}
      className={`absolute bg-surface-card rounded-cards p-5 shadow-[rgba(4,23,43,0.05)_0px_0px_0px_1px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] ${className}`}
    >
      {badgeInitials && (
        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-avatars flex items-center justify-center ${badgeColor} text-ink text-[13px] font-[500] shadow-sm`}>
          {badgeInitials}
        </div>
      )}
      {children}
    </motion.div>
  );
}

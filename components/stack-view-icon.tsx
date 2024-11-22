"use client";

export function StackViewIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="2" width="12" height="4" rx="1" className="fill-current" />
      <rect x="2" y="7" width="12" height="4" rx="1" className="fill-current opacity-60" />
      <rect x="2" y="12" width="12" height="2" rx="1" className="fill-current opacity-30" />
    </svg>
  );
}
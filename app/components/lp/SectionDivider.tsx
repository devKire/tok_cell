'use client';

export default function SectionDivider() {
  return (
    <div className="relative">
      {/* Gradient line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-3xl">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-sm" />
      </div>
    </div>
  );
}

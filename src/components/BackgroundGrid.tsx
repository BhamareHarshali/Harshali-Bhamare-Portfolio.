import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[#060a16]" />

      {/* Subtle radial ambient glows in blue & purple */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-purple-600/10 blur-[140px]" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-cyan-600/5 blur-[150px]" 
        aria-hidden="true" 
      />

      {/* Subtle developer grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:48px_48px]" 
        aria-hidden="true" 
      />

      {/* Subtle scanline vignette */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(6,10,22,0.8)_100%]" 
        aria-hidden="true" 
      />
    </div>
  );
};

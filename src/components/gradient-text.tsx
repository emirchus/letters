export function AnimatedGradientText() {
  return (
    <h1 className="leading-tighter opacity-1 transform-none text-left text-4xl font-semibold tracking-tighter text-foreground blur-0 will-change-auto sm:text-5xl md:text-6xl">
      <span className="inline-block transform-none text-balance opacity-100 will-change-auto">
        <span className="relative inline-flex overflow-hidden bg-background leading-normal">
          Write with <br /> Letters
          <div className="aurora pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
            <div className="absolute top-[-50%] h-[60vw] w-[60vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]"></div>
            {/* <div className="absolute h-[60vw] w-[60vw]"></div> */}
            <div className="absolute bottom-0 left-0 h-[60vw] w-[60vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]"></div>
            <div className="absolute bottom-[-50%] right-0 h-[60vw] w-[60vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]"></div>
            <div className="absolute h-[60vw] w-[60vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-5_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-5))] mix-blend-overlay blur-[1rem]"></div>
          </div>
        </span>
      </span>
    </h1>
  );
}

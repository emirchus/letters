import React from "react";

import FlickeringGrid from "./ui/flickering-grid";

interface Props {
  title: string | React.ReactNode;
  id: string;
  children: React.ReactNode;
}

export const AppSection = ({ title, id, children }: Props) => {
  return (
    <section id={id}>
      <div className="container relative mx-auto">
        <div className="relative z-0 mx-auto overflow-hidden border-x border-t p-2 py-8 text-center md:p-12">
          <h2 className="tracking-tigh text-balance text-sm font-semibold uppercase text-muted-foreground">{title}</h2>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-full w-full bg-gradient-to-t from-background from-50% dark:from-background" />
          <FlickeringGrid
            className="absolute inset-0 -z-20 size-full bg-transparent"
            color="#6B7280"
            flickerChance={0.1}
            gridGap={6}
            height={800}
            maxOpacity={0.5}
            squareSize={4}
          />
        </div>
        <div className="border-x border-t">{children}</div>
      </div>
    </section>
  );
};

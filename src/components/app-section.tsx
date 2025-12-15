import React from 'react';

import FlickeringGrid from './ui/flickering-grid';

interface Props {
  title: string | React.ReactNode;
  id: string;
  children: React.ReactNode;
}

export function AppSection({ title, id, children }: Props) {
  return (
    <section id={id}>
      <div className="relative container mx-auto">
        <div className="relative z-0 mx-auto overflow-hidden border-x border-t p-2 py-8 text-center md:p-12">
          <h2 className="tracking-tigh text-muted-foreground text-sm font-semibold text-balance uppercase">{title}</h2>
          <div className="from-background dark:from-background pointer-events-none absolute right-0 bottom-0 left-0 -z-10 h-full w-full bg-linear-to-t from-50%" />
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
}

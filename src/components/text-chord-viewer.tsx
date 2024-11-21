"use client";

import React, { useMemo } from "react";

import { useEditor } from "@/provider/editor-provider";

const LazyChordsViewer = React.lazy(() => import("./chords-viewer"));

export const TextChordViewer = () => {
  const { chords } = useEditor();

  const allChordsNames = useMemo(() => {
    return Array.from(new Set(Object.values(chords).filter(chord => chord !== "")));
  }, [chords]);

  return allChordsNames.length > 0 && <LazyChordsViewer chords={allChordsNames} />;
};

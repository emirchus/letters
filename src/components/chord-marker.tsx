"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { LegacyRef, memo, useEffect, useId, useRef, useState } from "react";

import useClickOutside from "@/hooks/use-click-outside";
import { ChordSelector } from "./chord-selector";
import { Chord } from "@/interface/chord";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

interface Props {
  chord: Chord | React.ReactNode;
  onRemove: () => void;
  onSelectChord: (chord: Chord) => void;
}

export function ChordMarker({ chord, onSelectChord }: Props) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<null | string>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setNote(null);
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="text-xs"
          style={{
            borderRadius: 8,
            pointerEvents: "auto",
          }}
          onClick={openMenu}
        >
          {chord}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <ChordsPopover
              formContainerRef={formContainerRef}
              uniqueId={uniqueId}
              closeMenu={closeMenu}
              note={note}
              onSelectChord={onSelectChord}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

const ChordsPopover = memo(function renderChordPopover({
  formContainerRef,
  uniqueId,
  closeMenu,
  note,
  onSelectChord,
}: {
  formContainerRef: LegacyRef<HTMLDivElement> | undefined;
  uniqueId: string;
  closeMenu: () => void;
  note: string | null;
  onSelectChord: (chord: Chord) => void;
}) {
  return (
    <motion.div
      ref={formContainerRef}
      layoutId={`popover-${uniqueId}`}
      className="absolute z-50 flex h-[300px] w-[364px] flex-col overflow-hidden border border-zinc-950/10 bg-white p-4 outline-none dark:bg-zinc-700"
      style={{
        borderRadius: 12,
        pointerEvents: "auto",
      }}
    >
      <div className="flex w-full flex-row items-center justify-start">
        <button type="button" className="flex items-center" onClick={closeMenu} aria-label="Close popover">
          <ArrowLeftIcon size={16} className="text-zinc-900 dark:text-zinc-100" />
        </button>
        <motion.span
          aria-hidden="true"
          style={{
            opacity: note ? 0 : 1,
          }}
          className="my-auto ml-2 select-none text-sm text-zinc-500 dark:text-zinc-400"
        >
          Add Chord
        </motion.span>
        <button
          className="relative ml-auto flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
          type="submit"
          aria-label="Submit note"
          onClick={() => {
            closeMenu();
          }}
        >
          Delete Chord
        </button>
      </div>

      <div className="h-full w-full">
        <ChordSelector
          onSelectChord={chord => {
            closeMenu();
            onSelectChord(chord);
          }}
        />
      </div>
    </motion.div>
  );
});

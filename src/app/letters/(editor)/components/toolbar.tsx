"use client";

import { FloppyDisk, MagnifyingGlass, Metronome, MusicNote, NotePencil } from "@phosphor-icons/react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Redo, Undo } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useMeasure from "react-use-measure";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

function ItemButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  active: boolean;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "group relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg bg-sidebar-accent transition-all hover:bg-sidebar-primary/10 hover:text-sidebar-accent-foreground focus-visible:ring-2 active:scale-[0.98]",
        active ? "bg-sidebar-border text-sidebar-primary" : ""
      )}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const ITEMS = [
  {
    id: 3,
    label: "Save",
    title: <FloppyDisk className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },
  {
    id: 1,
    label: "Text",
    title: <NotePencil className="h-5 w-5" />,
    content: (
      <div className="flex flex-row items-center justify-center space-x-4">
        <Button variant="ghost">
          <Undo className="h-5 w-5" />
          Undo
        </Button>
        <Button variant="ghost">
          <Redo className="h-5 w-5" />
          Redo
        </Button>
      </div>
    ),
  },
  {
    id: 2,
    label: "Music",
    title: <MusicNote className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },

  {
    id: 4,
    label: "Metronome",
    title: <Metronome className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <h4 className="text-sm font-medium">Metronome</h4>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="bpm" className="text-right">
            BPM
          </Label>
          <Input
            id="bpm"
            type="number"
            // onChange={e => setBpm(Number(e.target.value))}
            className="col-span-3"
          />
        </div>
        <Button>Start</Button>
      </div>
    ),
  },
];

export function ToolbarPortal() {
  const [docEnv, setDocEnv] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setDocEnv(true);
    }
  }, []);

  return docEnv ? createPortal(<ToolbarExpandable />, document.getElementById("editor-content")!) : null;
}

export function ToolbarExpandable() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setIsSearching(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig transition={transition}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        className="absolute bottom-3 left-1/2 z-50 -translate-x-1/2 transform will-change-transform"
      >
        <div className="h-full w-full rounded-xl border border-sidebar-border bg-sidebar">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  initial={{ height: 0 }}
                  style={{
                    width: maxWidth,
                  }}
                >
                  <div ref={contentRef} className="p-2">
                    {ITEMS.map(item => {
                      const isSelected = active === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          className=""
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                        >
                          <div className={cn("px-2 pt-2 text-sm", isSelected ? "block" : "hidden")}>{item.content}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div ref={menuRef} className="flex space-x-2 p-2">
            {ITEMS.map(item => (
              <ItemButton
                key={item.id}
                active={active === item.id}
                ariaLabel={item.label}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);

                    return;
                  }

                  setActive(item.id);
                }}
              >
                <div>{item.title}</div>
              </ItemButton>
            ))}
            <Separator className="my-auto h-4" orientation="vertical" />
            <motion.div
              animate={{
                width: isSearching ? "300px" : "46px",
              }}
              initial={false}
            >
              {!isSearching ? (
                <ItemButton
                  active={false}
                  ariaLabel="Search notes"
                  onClick={() => {
                    setIsSearching(true);
                    setIsOpen(false);
                    setActive(null);
                  }}
                >
                  <MagnifyingGlass className="h-4 w-4" />
                </ItemButton>
              ) : (
                <div className="flex space-x-2">
                  <ItemButton active={false} ariaLabel="Back" onClick={() => setIsSearching(false)}>
                    <ArrowLeft className="h-4 w-4" />
                  </ItemButton>
                  <div className="relative w-full">
                    <Input
                      autoFocus
                      className="h-9 w-full rounded-lg border-accent/10 bg-sidebar-border focus:outline-none focus:ring-0"
                      placeholder="Search notes"
                    />
                    <div className="absolute right-1 top-0 flex h-full items-center justify-center" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

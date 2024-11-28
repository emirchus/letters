"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, Folder, MessageCircle, Search, User, WalletCards } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import useClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.25,
};

function Button({
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
    id: 1,
    label: "User",
    title: <User className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },
  {
    id: 2,
    label: "Messages",
    title: <MessageCircle className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },
  {
    id: 3,
    label: "Documents",
    title: <Folder className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },
  {
    id: 4,
    label: "Wallet",
    title: <WalletCards className="h-5 w-5" />,
    content: <div className="flex flex-col space-y-4"></div>,
  },
];

export default function ToolbarExpandable() {
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
      <div ref={ref} className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
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
              <Button
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
                <div className="group-hover:scale-110">{item.title}</div>
              </Button>
            ))}
            <Separator className="my-auto h-4" orientation="vertical" />
            <motion.div
              animate={{
                width: isSearching ? "300px" : "46px",
              }}
              initial={false}
            >
              {!isSearching ? (
                <Button
                  active={false}
                  ariaLabel="Search notes"
                  onClick={() => {
                    setIsSearching(true);
                    setIsOpen(false);
                    setActive(null);
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button active={false} ariaLabel="Back" onClick={() => setIsSearching(false)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
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
      </div>
    </MotionConfig>
  );
}

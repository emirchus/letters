'use client';

import { ChevronsUpDown, Loader2 } from 'lucide-react';
// External dependencies
import type { FC } from 'react';
import { useEffect, useState } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * Props interface for the ComboBox component
 * @interface ComboBoxProps
 * @property {React.ReactNode} children - Content to be rendered in the dropdown list
 * @property {React.ReactNode} selectedItem - Currently selected item to display
 * @property {string} [placeholder] - Optional placeholder text for search input
 * @property {boolean} [isLoading] - Optional loading state indicator
 */
interface ComboBoxProps {
  children: React.ReactNode;
  selectedItem: React.ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  closeOnSelect?: boolean;
}

/**
 * ComboBox Component
 *
 * A customizable single-select combobox with search functionality.
 * Features:
 * - Search filtering
 * - Loading state
 * - Accessible keyboard navigation
 * - Custom trigger display
 *
 * @param {ComboBoxProps} props - Component props
 * @returns {JSX.Element} The ComboBox component
 */
export function ComboBox({
  children,
  selectedItem,
  placeholder = 'Search...',
  isLoading = false,
  closeOnSelect = true,
}: ComboBoxProps) {
  // State for controlling popover
  const [open, setOpen] = useState(false);

  // Close the popover when the selected item changes
  useEffect(() => {
    if (closeOnSelect) {
      setOpen(false);
    }
  }, [closeOnSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <Button
          aria-controls="combo-box-content"
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between gap-2"
          role="combobox"
          variant="outline"
        >
          {/* Selected Item Display */}
          <span role="option" tabIndex={0} aria-label={`Selected: ${selectedItem}`} className="truncate">
            {selectedItem}
          </span>

          {/* Status Indicators */}
          <div aria-hidden="true" className="flex items-center justify-between gap-2">
            {/* Loading Indicator */}
            {isLoading && <Loader2 aria-hidden="true" className="size-4 animate-spin opacity-50" />}
            {/* Dropdown Indicator */}
            <ChevronsUpDown aria-hidden="true" className="size-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>

      {/* Dropdown Content */}
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" id="combo-box-content">
        <Command aria-label="Search and select options" className="w-full">
          {/* Search Input */}
          <CommandInput aria-label={placeholder} placeholder={placeholder} />

          {/* Options List */}
          <CommandList aria-label="Available options">
            {/* Empty State */}
            <CommandEmpty aria-live="polite" role="status">
              No items found.
            </CommandEmpty>

            {/* Options Group */}
            <CommandGroup aria-label="Options" role="listbox">
              {children}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

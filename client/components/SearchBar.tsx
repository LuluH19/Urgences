'use client';

import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Recherche...",
  className = "",
}: SearchBarProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(value ?? "");

  React.useEffect(() => {
    if (isControlled) return;
    setInternalValue(value ?? "");
  }, [value, isControlled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = isControlled ? (value ?? "") : internalValue;
    if (e.key === "Enter" && onSearch) onSearch(current);
  };

  return (
    <div
      className={[
        "flex items-center",
        "w-full",
        "bg-white text-black",
        "border-2 border-black",
        "rounded-full",
        "px-6 py-3",
        "shadow-sm",
        "font-[Arial]",
        "focus-within:ring-0",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-center shrink-0 mr-4">
        <FaSearch className="text-2xl md:text-3xl text-black" aria-hidden="true" />
      </div>

      <input
        type="text"
        value={isControlled ? (value ?? "") : internalValue}
        onChange={(e) => {
          const v = e.target.value;
          if (onChange) onChange(v);
          else setInternalValue(v);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={[
          "w-full bg-transparent outline-none",
          "text-lg md:text-xl",
          "placeholder:text-gray-400",
          "caret-black",
        ].join(" ")}
      />
    </div>
  );
}

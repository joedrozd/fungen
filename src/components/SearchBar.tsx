"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search activities..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    function closeOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, []);

  function close() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="site-search" ref={containerRef}>
      <button type="button" ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="site-icon-button" aria-label="Open search" aria-expanded={isOpen}><Search size={16} /></button>
      {isOpen && <form role="search" className="site-search-form" onSubmit={(event) => {
        event.preventDefault(); onSearch(query.trim()); close();
      }} onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
        <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} aria-label="Search activities" />
        <button type="submit" aria-label="Search"><ArrowRight size={18} /></button>
        <button type="button" onClick={close} aria-label="Close search"><X size={18} /></button>
      </form>}
    </div>
  );
}

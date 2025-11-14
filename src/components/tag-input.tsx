"use client";

import { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  mode?: 'simple' | 'key-value';
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}

export function TagInput({ 
  value = [], 
  onChange, 
  placeholder,
  mode = 'simple',
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value'
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (mode === 'key-value') {
        if (!key) {
          setKey(inputValue.trim());
          setInputValue("");
        } else {
          addTag(`${key}: ${inputValue.trim()}`);
          setKey(null);
        }
      } else {
        addTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && inputValue === '') {
       if (key) {
         setKey(null);
       }
    }
  };

  const addTag = (tag: string) => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };
  
  const currentPlaceholder = mode === 'key-value' 
    ? (key ? valuePlaceholder : keyPlaceholder)
    : placeholder;

  return (
    <div className="w-full">
        <div className="flex flex-wrap items-center gap-2 mb-2">
            {key && (
                 <Badge variant="outline" className="flex items-center gap-1.5">
                    {key}:
                 </Badge>
            )}
            <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentPlaceholder}
                className="pr-10 flex-1"
            />
        </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1.5">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-destructive/20"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

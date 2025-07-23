import React, { useRef } from "react";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  label: string;
}

export default function TagInput({ 
  tags, 
  onTagsChange, 
  suggestions = [], 
  placeholder = "Type and press Enter...",
  label 
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue("");
      e.preventDefault();
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-3">
      <label className="mb-1">{label}</label>
      <div
        style={{
          background: "#172343",
          border: "1px solid #2E3956",
          borderRadius: 6,
          padding: "8px 8px 4px 8px",
          minHeight: 44,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          position: "relative",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#0B1739",
              color: "#fff",
              borderRadius: 16,
              padding: "3px 10px 3px 12px",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              style={{
                background: "none",
                border: "none",
                color: "#fa6d43",
                marginLeft: 6,
                cursor: "pointer",
                fontSize: 15,
                lineHeight: 1,
                padding: 0,
              }}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 14,
            flex: 1,
            minWidth: 80,
            marginBottom: 4,
          }}
          list="tag-suggestions"
        />
        <datalist id="tag-suggestions">
          {suggestions
            .filter(
              (suggestion) =>
                !tags.includes(suggestion) &&
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
        </datalist>
      </div>
    </div>
  );
}

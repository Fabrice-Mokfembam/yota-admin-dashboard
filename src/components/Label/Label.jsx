import React from "react";

function Label({
  id,
  value,
  selectedCategory,
  handleCategoryChange,
  onClick,
  label,
}) {
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        value={value}
        checked={selectedCategory === value}
        onChange={handleCategoryChange}
        onClick={onClick}
      />
      {label}
    </label>
  );
}

export default Label;

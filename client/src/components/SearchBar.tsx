import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;

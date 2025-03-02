import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  // Handle filter changes
  const handleFilterChange = () => {
    onFilterChange({ category, type, search });
  };

  return (
    <div className="filters">
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Dessert">Dessert</option>
        <option value="Main Course">Main Course</option>
      </select>

      <select onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Veg">Veg</option>
        <option value="Non-Veg">Non-Veg</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default Filters;

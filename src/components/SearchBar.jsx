// SearchBar.js
import React from "react";

const SearchBar = ({
  filterText,
  handleFilterTextChange,
  submit,
  handleSortChange,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        defaultValue={filterText}
        onChange={(e) => {
          handleFilterTextChange(e.target.value);
        }}
      />
      <select onChange={handleSortChange} style={{ margin: "0 10px" }}>
        <option value="pokemon">search by Name or ID</option>
        <option value="type">filter by type</option>
        <option value="ability">filter by ability</option>
        {/* <option value="other">...</option> */}
      </select>

      <button onClick={() => submit(filterText)}>search</button>
    </div>
  );
};

export default SearchBar;

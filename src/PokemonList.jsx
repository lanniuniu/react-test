import React, { useEffect, useState } from "react";
import {
  getPokemonList,
  getPokemonDetailsByName,
  getPokemonDetailsByFilter,
} from "./api";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import Pagination from "./components/Pagination";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState("pokemon");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState("common");

  /**
   * Fetches data from the API and sets the Pokemon list state.
   *
   * @return {Promise<void>} This function does not return anything.
   */
  const fetchData = async () => {
    const paginationParams = {
      pageSize,
      number: currentPage,
    };

    const { data, pagination } = await getPokemonList(paginationParams);
    setTotalPages(Math.ceil(pagination.total / pageSize));
    console.log("pokemon", data);
    console.log(pagination);
    setPokemonList(data);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  /**
   * Handles the form submission.
   *
   * @return {Promise<void>} A promise that resolves when the submission is handled.
   */
  const handleSubmit = async () => {
    if (filterText.trim() === "") {
      // 正常分页
      fetchData();
      setMode("common");
    } else {
      // 不分页, search
      const params = {
        content: filterText,
        type: sortOption,
      };
      const { data } = await getPokemonDetailsByFilter(params);
      console.log(data);
      setPokemonList(data);
      setMode("search");
    }
  };

  /**
   * Updates the sort option and triggers a state update.
   *
   * @param {Event} e - The event object representing the change in sort option.
   * @return {void} This function does not return a value.
   */
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  /**
   * Handles the page change event.
   *
   * @param {any} page - The new page number.
   * @return {void} No return value.
   */
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  /**
   * Sets the filter text to the specified value.
   *
   * @param {string} text - The new filter text.
   * @return {undefined} This function does not return anything.
   */
  const handleFilterTextChange = (text) => {
    setFilterText(text);
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchBar
        filterText={filterText}
        submit={handleSubmit}
        handleSortChange={handleSortChange}
        handleFilterTextChange={handleFilterTextChange}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "1500px",
          justifyContent: "space-between",
        }}
      >
        {pokemonList.length === 0 ? (
          <div style={{ textAlign: "center" }}>No pokemons found</div>
        ) : (
          pokemonList.map((pokemon) => (
            <Card
              key={pokemon.name}
              name={pokemon.name}
              image={pokemon.sprites.back_default}
              style={{ flexBasis: "20%" }}
              stats={pokemon.stats}
              handlereSubmit={async (name) => {
                // 重新请求某个pokemon，替换掉另一个
                const pokemon = await getPokemonDetailsByName(name);
                const list = pokemonList.map((unit) => {
                  if (unit.name === pokemon.name) {
                    return {
                      ...unit,
                      detail: pokemon,
                    };
                  }
                  return unit;
                });
                setPokemonList(list);
              }}
            />
          ))
        )}
      </div>

      {mode === "common" ? (
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};

export default PokemonList;

// api.js
const API_BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Retrieves a list of Pokemon based on the given pagination parameters.
 *
 * @param {Object} pagination - The pagination parameters.
 * @param {number} pagination.number - The page number to retrieve.
 * @param {number} pagination.pageSize - The number of items per page.
 * @return {Object} An object containing the retrieved Pokemon data and pagination information.
 * @return {Array} return.data - An array of Pokemon data.
 * @return {number} return.pagination.number - The page number.
 * @return {number} return.pagination.pageSize - The number of items per page.
 * @return {number} return.pagination.total - The total number of Pokemon.
 */
export const getPokemonList = async (
  pagination = { number: 1, pageSize: 20 }
) => {
  try {
    const { number, pageSize } = pagination;
    const response = await fetch(
      `${API_BASE_URL}/pokemon?limit=${pageSize}&offset=${
        (number - 1) * pageSize
      }`
    );
    const { results: list, count } = await response.json();
    // 查询该页的20个数据
    const data = await Promise.allSettled(
      list.map(async (unit) => {
        // handle single error
        try {
          const response = await fetch(unit.url);
          const data = await response.json();
          return {
            ...unit,
            ...data,
          };
        } catch (err) {
          console.log(err);
          return {
            ...unit,
          };
        }
      })
    );
    const formatData = data.map((unit) => {
      return unit.value;
    });
    return { data: formatData, pagination: { number, pageSize, total: count } };
  } catch (err) {
    // handle 500 and other errors like network error
    return { data: [], pagination: { number: 1, pageSize: 20, total: 0 } };
  }
};

// search by name
export const getPokemonDetailsByName = async (parmas) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${parmas}`);
  const data = await response.json();
  return data;
};

// search or filter by type
export const getPokemonDetailsByFilter = async (filter) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${filter.type}/${filter.content}`
    );
    const data = await response.json();

    if (filter.type === "pokemon") {
      return {
        data: [data],
      };
    } else if (filter.type === "type" || filter.type === "ability") {
      const list = await Promise.allSettled(
        data.pokemon.map(async (unit) => {
          // handle single error
          try {
            const response = await fetch(unit.pokemon.url);
            const data = await response.json();
            return {
              ...unit.pokemon,
              ...data,
            };
          } catch (err) {
            console.log(err);
            return {
              ...unit,
            };
          }
        })
      );

      const formatData = list.map((unit) => {
        return unit.value;
      });
      return { data: formatData };
    }
  } catch (err) {
    // handle 500 and other errors like network error
    return { data: [] };
  }
};

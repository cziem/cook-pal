const filters = {
  sortBy: 'byEdited',
  searchText: '',
  hasIngredient: false
}

const getFilters = () => filters

const setFilters = ({ sortBy, searchText, hasIngredient }) => {
  if (typeof searchText === 'string') filters.searchText = searchText

  if (typeof sortBy === 'string') filters.sortBy = sortBy

  if (typeof hasIngredient === 'boolean') filters.hasIngredient = hasIngredient
}

export { getFilters, setFilters }
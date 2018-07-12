const filters = {
  sortBy: 'byEdited',
  searchText: ''
}

const getFilters = () => filters

const setFilters = ({ sortBy, searchText, hasIngredient }) => {
  if (typeof searchText === 'string') filters.searchText = searchText

  if (typeof sortBy === 'string') filters.sortBy = sortBy
}

export { getFilters, setFilters }
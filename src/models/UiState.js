import { FILTERS } from '../constants';

export class UiState {
  constructor() {
    this.search, (this.selectedFilter = FILTERS.ALL);
    this.selectedItems = [];
  }

  setFilter = value => {
    this.selectedFilter = value;
  };

  setSearch = value => {
    this.search = value;
  };

  toggleItemSelection = id => {
    const updatedSelectedItems = this.selectedItems.includes(id)
      ? this.selectedItems.filter(itemId => itemId !== id)
      : [...this.selectedItems, id];

    this.selectedItems = updatedSelectedItems;
  };

  deselectItems = () => {
    this.selectedItems = [];
  };

  getUiState = () => ({
    search: this.search,
    selectedItems: this.selectedItems,
    selectedFilter: this.selectedFilter,
  });

  getSearchValue = () => this.search;

  getSelectedItems = () => this.selectedItems;

  getSelectedFilter = () => this.selectedFilter;
}

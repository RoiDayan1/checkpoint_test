import {AnyAction, Dispatch} from "redux";
import {AppState, BooksStore} from "../index";
import {ApiBooksFilter, ApiBooksPrintType, ApiBooksSort} from "../../services/Api.models";

interface FiltersStoreState {
  showSideFilters: boolean;
  searchInputFilter: string;
  selectedPrintTypeFilter: ApiBooksPrintType;
  selectedCategoryFilter: ApiBooksFilter;
  selectedSort: ApiBooksSort;
}

class FiltersStore {
  
  static TOGGLE_SIDE_FILTERS = 'FiltersStore.TOGGLE_SIDE_FILTERS';
  static SET_SEARCH_INPUT_FILTER = 'FiltersStore.SET_SEARCH_INPUT_FILTER';
  static SET_PRINT_TYPE_FILTER = 'FiltersStore.SET_PRINT_TYPE_FILTER';
  static SET_CATEGORY_FILTER = 'FiltersStore.SET_CATEGORY_FILTER';
  static SET_SORT = 'FiltersStore.SET_SORT';
  
  static initialState: FiltersStoreState = {
    showSideFilters: false,
    searchInputFilter: '',
    selectedPrintTypeFilter: ApiBooksPrintType.ALL,
    selectedCategoryFilter: ApiBooksFilter.E_BOOKS,
    selectedSort: ApiBooksSort.RELEVANCE,
  };
  
  static toggleSideFilters() {
    return {
      type: FiltersStore.TOGGLE_SIDE_FILTERS,
    };
  }
  
  static setSearchInputFilter(searchInput: typeof FiltersStore.initialState.searchInputFilter) {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: FiltersStore.SET_SEARCH_INPUT_FILTER,
        searchInputFilter: searchInput,
      });
      dispatch<any>(BooksStore.fetchBooks(false));
    };
  }
  
  static setPrintTypeFilter(printType: typeof FiltersStore.initialState.selectedPrintTypeFilter) {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: FiltersStore.SET_PRINT_TYPE_FILTER,
        selectedPrintTypeFilter: printType,
      });
      dispatch<any>(BooksStore.fetchBooks(false));
    };
  }
  
  static setCategoryFilter(category: typeof FiltersStore.initialState.selectedCategoryFilter) {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: FiltersStore.SET_CATEGORY_FILTER,
        selectedCategoryFilter: category,
      });
      dispatch<any>(BooksStore.fetchBooks(false));
    };
  }
  
  static setSort(sort: typeof FiltersStore.initialState.selectedSort) {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      dispatch({
        type: FiltersStore.SET_SORT,
        selectedSort: sort,
      });
      dispatch<any>(BooksStore.fetchBooks(false));
    };
  }
  
  static reducer(state = FiltersStore.initialState, action: Partial<FiltersStoreState> & AnyAction) {
    switch (action.type) {
      case FiltersStore.TOGGLE_SIDE_FILTERS:
        return {...state, showSideFilters: !state.showSideFilters};
      case FiltersStore.SET_SEARCH_INPUT_FILTER:
        return {...state, searchInputFilter: action.searchInputFilter};
      case FiltersStore.SET_PRINT_TYPE_FILTER:
        return {...state, selectedPrintTypeFilter: action.selectedPrintTypeFilter};
      case FiltersStore.SET_CATEGORY_FILTER:
        return {...state, selectedCategoryFilter: action.selectedCategoryFilter};
      case FiltersStore.SET_SORT:
        return {...state, selectedSort: action.selectedSort};
      default:
        return state;
    }
  }
}

export default FiltersStore;
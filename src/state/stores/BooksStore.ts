import {AnyAction, Dispatch} from "redux";
import Api from "../../services/Api";
import {AppState} from "../index";
import {ApiGetBooksResponseItem} from "../../services/Api.models";

interface BooksStoreState {
  isFetchingBooks: boolean;
  errorFetchingBooks: string;
  perPage: number;
  books: ApiGetBooksResponseItem[];
  selectedBook: ApiGetBooksResponseItem | null;
}

class BooksStore {
  
  static FETCH_BOOKS_REQUEST = 'BooksStore.FETCH_BOOKS_REQUEST';
  static FETCH_BOOKS_ERROR = 'BooksStore.FETCH_BOOKS_ERROR';
  static FETCH_BOOKS_SUCCESS = 'BooksStore.FETCH_BOOKS_SUCCESS';
  static SET_SELECTED_BOOK = 'BooksStore.SET_SELECTED_BOOK';
  
  static initialState: BooksStoreState = {
    isFetchingBooks: false,
    errorFetchingBooks: '',
    perPage: 40,
    books: [],
    selectedBook: null,
  };
  
  static fetchBooks(append: boolean = true) {
    return async (dispatch: Dispatch, getState: () => AppState) => {
      const state: AppState = getState();
      dispatch({
        type: BooksStore.FETCH_BOOKS_REQUEST,
        append: append
      });
      dispatch(BooksStore.setSelectedBook(null));
      try {
        const response = await Api.getBooks(state.FiltersStore.searchInputFilter, {
          maxResults: state.BooksStore.perPage,
          startIndex: append ? Math.max(state.BooksStore.books.length - 1, 0) : 0,
          orderBy: state.FiltersStore.selectedSort,
          filter: state.FiltersStore.selectedCategoryFilter,
          printType: state.FiltersStore.selectedPrintTypeFilter,
        });
        dispatch({
          type: BooksStore.FETCH_BOOKS_SUCCESS,
          books: append ? [...state.BooksStore.books, ...(response.items || [])] : response.items || [],
        });
      } catch (e) {
        dispatch({
          type: BooksStore.FETCH_BOOKS_ERROR,
          error: e,
        });
      }
    }
  }
  
  static setSelectedBook(book: typeof BooksStore.initialState.selectedBook) {
    return {
      type: BooksStore.SET_SELECTED_BOOK,
      selectedBook: book,
    };
  }
  
  static reducer(state = BooksStore.initialState, action: Partial<BooksStoreState> & AnyAction) {
    switch (action.type) {
      case BooksStore.FETCH_BOOKS_REQUEST:
        return {...state, isFetchingBooks: true, books: action.append ? state.books : []};
      case BooksStore.FETCH_BOOKS_ERROR:
        return {...state, isFetchingBooks: false, errorFetchingBooks: action.error, books: []};
      case BooksStore.FETCH_BOOKS_SUCCESS:
        return {...state, isFetchingBooks: false, errorFetchingBooks: '', books: action.books};
      case BooksStore.SET_SELECTED_BOOK:
        return {...state, selectedBook: action.selectedBook};
      default:
        return state;
    }
  }
}

export default BooksStore;
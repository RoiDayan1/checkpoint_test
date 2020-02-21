import React, {Component, ReactNode} from "react";
import styles from "./ResultsTable.module.scss";
import {AppState, BooksStore, connectAppStore, FiltersStore} from "../../../../state";
import Table from "../../../../components/Table/Table";

export type ResultsTableProps = {
  isFetchingBooks: typeof BooksStore.initialState.isFetchingBooks;
  errorFetchingBooks: typeof BooksStore.initialState.errorFetchingBooks;
  books: typeof BooksStore.initialState.books;
  fetchBooks: typeof BooksStore.fetchBooks;
  searchInputFilter: typeof FiltersStore.initialState.searchInputFilter;
  setSelectedBook: typeof BooksStore.setSelectedBook;
};

class ResultsTableComponent extends Component<ResultsTableProps> {
  
  constructor(props: ResultsTableProps) {
    super(props);
    if (this.props.searchInputFilter) {
      this.props.fetchBooks();
    }
  }
  
  formatBooksForTable = () => {
    const {books} = this.props;
    return {
      headers: ['Title', 'Authors', 'Publisher', 'Published Date', 'Language', 'Average Rating'],
      rows: books.map((book, index) => {
        return [
          book?.volumeInfo?.title,
          book?.volumeInfo?.authors?.join(', '),
          book?.volumeInfo?.publisher,
          book?.volumeInfo?.publishedDate,
          book?.volumeInfo?.language,
          book?.volumeInfo?.averageRating
        ];
      })
    }
  };
  
  onLoadMore = () => {
    this.props.fetchBooks();
  };
  
  onTableRowClick = (index: number) => {
    const {setSelectedBook = () => null, books} = this.props;
    setSelectedBook(books[index]);
  };
  
  render(): ReactNode {
    const {isFetchingBooks, searchInputFilter, errorFetchingBooks} = this.props;
    
    const {headers, rows} = this.formatBooksForTable();
    
    let tableMessage: string | undefined;
    if (!searchInputFilter && !rows.length && !isFetchingBooks) {
      tableMessage = "Please search a book in the search box above";
    } else if (errorFetchingBooks && !isFetchingBooks) {
      tableMessage = "Failed to fetch books from the API";
    } else if (searchInputFilter && !rows.length && !isFetchingBooks) {
      tableMessage = "No results was found";
    }
  
    return (
        <div className={styles.mainContainer}>
  
          <Table headers={headers} rows={rows} message={tableMessage}
                 onClick={this.onTableRowClick} onLoadMore={this.onLoadMore} loadingMore={isFetchingBooks}
          />
      
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isFetchingBooks: state.BooksStore.isFetchingBooks,
    errorFetchingBooks: state.BooksStore.errorFetchingBooks,
    books: state.BooksStore.books,
    searchInputFilter: state.FiltersStore.searchInputFilter,
  }
};

const mapDispatchToProps = {
  fetchBooks: BooksStore.fetchBooks,
  setSelectedBook: BooksStore.setSelectedBook,
};

const ResultsTable = connectAppStore(ResultsTableComponent, mapStateToProps, mapDispatchToProps);
export default ResultsTable;
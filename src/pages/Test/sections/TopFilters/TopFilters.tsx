import React, {ChangeEvent, Component, ReactNode, RefObject} from "react";
import styles from "./TopFilters.module.scss";
import {debounce, find} from "lodash";
import {ToastConsumerContext, withToastManager} from "react-toast-notifications";
import {IoIosClose, IoIosList, IoIosSearch} from "react-icons/io";
import {MdFileDownload, MdRefresh} from "react-icons/md";
import {TiFilter} from "react-icons/ti";
import {FormControl} from "react-bootstrap";
import {AppState, connectAppStore, FiltersStore, TabsMenuStore} from "../../../../state";
import {ApiBooksSort} from "../../../../services/Api.models";
import HoverButton from "../../../../components/HoverButton/HoverButton";
import DropdownButton, {DropdownButtonItem} from "../../../../components/DropdownButton/DropdownButton";
import {TabMenu} from "../../../../state/stores/TabsMenuStore";


export type TopFiltersProps = {
  selectedTabId: typeof TabsMenuStore.initialState.selectedTabId;
  showSideFilters: typeof FiltersStore.initialState.showSideFilters;
  toggleSideFilters: typeof FiltersStore.toggleSideFilters;
  searchInputFilter: typeof FiltersStore.initialState.searchInputFilter;
  setSearchInputFilter: typeof FiltersStore.setSearchInputFilter;
  selectedSort: typeof FiltersStore.initialState.selectedSort;
  setSort: typeof FiltersStore.setSort;
  toastManager: ToastConsumerContext;
};

class TopFiltersComponent extends Component<TopFiltersProps> {
  
  searchInputRef: RefObject<FormControl<"input">> & RefObject<HTMLInputElement> = React.createRef();
  
  setSearchInputFilterDebounce = debounce((value: string) => {
    const {setSearchInputFilter = () => null} = this.props;
    setSearchInputFilter(value);
  }, 800);
  
  onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setSearchInputFilterDebounce(value)
  };
  
  onSortSelect = (value: string) => {
    const {setSort = () => null} = this.props;
    setSort(value as ApiBooksSort);
  };
  
  onRefreshClick = (event: React.MouseEvent<HTMLElement>) => {
    const {setSearchInputFilter = () => null, toastManager} = this.props;
    setSearchInputFilter(this.searchInputRef.current?.value || '');
    toastManager.add("Books table has been refreshed", {appearance: 'success'})
  };
  
  onDownloadEMLClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.toastManager.add("EML download failed", {appearance: 'error'})
  };
  
  onRejectClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.toastManager.add("Something has been rejected", {appearance: 'warning'})
  };
  
  onReleaseClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.toastManager.add("Something has been released", {appearance: 'info'})
  };
  
  render(): ReactNode {
    const {selectedTabId, showSideFilters, toggleSideFilters, searchInputFilter, selectedSort} = this.props;
  
    const isWithFilters = selectedTabId === TabMenu.WITH_FILTERS;
  
    const items: DropdownButtonItem[] = [
      {value: ApiBooksSort.RELEVANCE, title: 'Relevance'},
      {value: ApiBooksSort.NEWEST, title: 'Newest'},
    ];
  
    const item = find(items, {value: selectedSort});
  
    return (
        <div className={styles.mainContainer}>
        
          {isWithFilters &&
          <div className={styles.statusDropdownContainer}>
            <div>Sort</div>
            <DropdownButton id={'statusDropdown'} items={items} selectedItem={item} onSelect={this.onSortSelect}/>
          </div>}
          <div className={styles.centerContainer}>
            <HoverButton className={styles.button} onClick={this.onReleaseClick}>
              <IoIosList size={'1.3em'} className={styles.iconRelease}/>Release
            </HoverButton>
            <HoverButton className={styles.button} onClick={this.onRejectClick}>
              <IoIosClose size={'1.8em'} className={styles.iconReject}/>Reject
            </HoverButton>
            <HoverButton className={styles.button} onClick={this.onDownloadEMLClick}>
              <MdFileDownload size={'1.1em'} className={styles.iconDownload}/>Download EML
            </HoverButton>
            <HoverButton className={styles.button} onClick={this.onRefreshClick}>
              <MdRefresh size={'1.2em'} className={styles.iconRefresh}/>Refresh
            </HoverButton>
            <IoIosSearch size={'1.1em'} className={styles.iconSearch}/>
            <FormControl ref={this.searchInputRef} className={styles.searchInput}
                         placeholder="Search" defaultValue={searchInputFilter} onChange={this.onSearchInputChange}
            />
            {isWithFilters &&
            <HoverButton className={styles.buttonFilter} active={showSideFilters} onClick={toggleSideFilters}>
              <TiFilter size={'1.5em'} className={styles.iconFilter}/>
            </HoverButton>}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedTabId: state.TabsMenuStore.selectedTabId,
    showSideFilters: state.FiltersStore.showSideFilters,
    searchInputFilter: state.FiltersStore.searchInputFilter,
    selectedSort: state.FiltersStore.selectedSort,
  }
};

const mapDispatchToProps = {
  toggleSideFilters: FiltersStore.toggleSideFilters,
  setSearchInputFilter: FiltersStore.setSearchInputFilter,
  setSort: FiltersStore.setSort,
};

const TopFilters = connectAppStore(withToastManager(TopFiltersComponent), mapStateToProps, mapDispatchToProps);
export default TopFilters;
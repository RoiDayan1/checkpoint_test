import React, {Component, ReactNode} from "react";
import styles from "./TestPage.module.scss";
import {AppState, BooksStore, connectAppStore, FiltersStore, TabsMenuStore} from "../../state";

import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import TabsMenu from "./sections/TabsMenu/TabsMenu";
import TopFilters from "./sections/TopFilters/TopFilters";
import SideFilters from "./sections/SideFilters/SideFilters";
import ResultsTable from "./sections/ResultsTable/ResultsTable";
import {TabMenu} from "../../state/stores/TabsMenuStore";
import HoverButton from "../../components/HoverButton/HoverButton";
import {IoIosClose} from "react-icons/io";
import ItemDetails from "./sections/ItemDetails/ItemDetails";

export type TestPageProps = {
  selectedTabId: typeof TabsMenuStore.initialState.selectedTabId;
  setSelectedTab: typeof TabsMenuStore.setSelectedTab;
  showSideFilters: typeof FiltersStore.initialState.showSideFilters;
  selectedBook: typeof BooksStore.initialState.selectedBook;
};

export const TestPageRoute = "/test";

class TestPageComponent extends Component<TestPageProps> {
  
  render(): ReactNode {
    const {selectedTabId, setSelectedTab, showSideFilters, selectedBook} = this.props;
    
    const isFullScreen = selectedTabId === TabMenu.FULL_SCREEN;
    const isWithFilters = selectedTabId === TabMenu.WITH_FILTERS;
    
    return (
        <div className={styles.mainContainer}>
          
          <Header rightContainer={
            isFullScreen &&
            <HoverButton className={styles.headerRightButton} onClick={() => setSelectedTab(TabMenu.WITH_FILTERS)}>
              <IoIosClose size={'1.8em'} className={styles.headerRightButtonIcon}/>Close Full Screen
            </HoverButton>
          }/>
          
          <div className={styles.firstLayoutContainer}>
            
            <SideBar/>
            
            
            {!isFullScreen &&
            <TabsMenu/>}
            
            <div className={styles.secondLayoutContainer}>
              
              {!isFullScreen &&
              <TopFilters/>}
  
              <div className={styles.bodyContainer}>
    
                <div className={styles.dataContainer}>
      
                  <div className={styles.tableContainer}>
                    <ResultsTable/>
                  </div>
      
                  <div
                      className={`${styles.itemContainer} ${selectedBook ? styles.show : styles.hide}`}>
                    <ItemDetails/>
                  </div>
    
                </div>
                {!isFullScreen &&
                <div
                    className={`${styles.sideFiltersContainer} ${isWithFilters && showSideFilters ? styles.show : styles.hide}`}>
                  <SideFilters/>
                </div>}
  
              </div>
          
            </div>
        
          </div>
      
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedTabId: state.TabsMenuStore.selectedTabId,
    showSideFilters: state.FiltersStore.showSideFilters,
    selectedBook: state.BooksStore.selectedBook,
  }
};

const mapDispatchToProps = {
  setSelectedTab: TabsMenuStore.setSelectedTab,
};

const TestPage = connectAppStore(TestPageComponent, mapStateToProps, mapDispatchToProps);
export default TestPage;

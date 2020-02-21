import {AnyAction} from "redux";

export enum TabMenu {
  WITH_FILTERS = "With Filters",
  NO_FILTERS = "No Filters",
  FULL_SCREEN = "Full Screen",
}

interface TabsMenuStoreState {
  selectedTabId: TabMenu;
}

class TabsMenuStore {
  
  static SET_SELECTED_TAB = 'TabsMenuStore.SET_SELECTED_TAB';
  
  static initialState: TabsMenuStoreState = {
    selectedTabId: TabMenu.WITH_FILTERS,
  };
  
  static setSelectedTab(id: typeof TabsMenuStore.initialState.selectedTabId) {
    return {
      type: TabsMenuStore.SET_SELECTED_TAB,
      selectedTabId: id,
    }
  }
  
  static reducer(state = TabsMenuStore.initialState, action: Partial<TabsMenuStoreState> & AnyAction) {
    switch (action.type) {
      case TabsMenuStore.SET_SELECTED_TAB:
        return {...state, selectedTabId: action.selectedTabId};
      default:
        return state;
    }
  }
}

export default TabsMenuStore;
import React, {Component, ReactNode} from "react";
import styles from "./TabsMenu.module.scss";
import TabsMenuItem from "../../../../components/TabsMenuItem/TabsMenuItem";
import {AppState, connectAppStore, TabsMenuStore} from "../../../../state";
import {TabMenu} from "../../../../state/stores/TabsMenuStore";

export type TabsMenuProps = {
  selectedTabId: typeof TabsMenuStore.initialState.selectedTabId;
  setSelectedTab: typeof TabsMenuStore.setSelectedTab;
};

class TabsMenuComponent extends Component<TabsMenuProps> {
  
  render(): ReactNode {
    const {selectedTabId, setSelectedTab} = this.props;
    return (
        <div className={styles.mainContainer}>
          <TabsMenuItem title={"With Filters"} id={1} isSelected={selectedTabId === TabMenu.WITH_FILTERS}
                        onClick={() => setSelectedTab(TabMenu.WITH_FILTERS)}/>
          <TabsMenuItem title={"No Filters"} id={2} isSelected={selectedTabId === TabMenu.NO_FILTERS}
                        onClick={() => setSelectedTab(TabMenu.NO_FILTERS)}/>
          <TabsMenuItem title={"Full Screen"} id={3} isSelected={selectedTabId === TabMenu.FULL_SCREEN}
                        onClick={() => setSelectedTab(TabMenu.FULL_SCREEN)}/>
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedTabId: state.TabsMenuStore.selectedTabId,
  }
};

const mapDispatchToProps = {
  setSelectedTab: TabsMenuStore.setSelectedTab,
};

const TabsMenu = connectAppStore(TabsMenuComponent, mapStateToProps, mapDispatchToProps);
export default TabsMenu;

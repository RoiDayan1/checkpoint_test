import React, {Component, ReactNode} from "react";
import styles from "./TabsMenuItem.module.scss";

export type TabsMenuItemProps = {
  id: string | number;
  title: string;
  onClick?: (id: string | number) => void;
  isSelected?: boolean;
};

class TabsMenuItemComponent extends Component<TabsMenuItemProps> {
  
  render(): ReactNode {
    const {id, title, onClick = () => null, isSelected = true} = this.props;
    return (
        <div className={`${styles.mainContainer} ${isSelected ? styles.selected : ''}`}
             onClick={() => !isSelected ? onClick(id) : null}>
          {title}
        </div>
    );
  }
}

const TabsMenuItem = TabsMenuItemComponent;
export default TabsMenuItem;

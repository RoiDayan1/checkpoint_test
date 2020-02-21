import React, {Component, ReactNode, SyntheticEvent} from "react";
import styles from "./DropdownButton.module.scss";
import Dropdown from "react-bootstrap/Dropdown";
import {DropdownButton as DropdownButtonRB} from "react-bootstrap";

export type DropdownButtonProps = {
  id: string;
  selectedItem: DropdownButtonItem | undefined;
  items: DropdownButtonItem[];
  onSelect?: (value: string) => void;
};

export type DropdownButtonItem = {
  value: string;
  title: string | Component;
};

class DropdownButtonComponent extends Component<DropdownButtonProps> {
  
  onSelect = (value: string, event: SyntheticEvent) => {
    const {selectedItem, onSelect = () => null} = this.props;
    if (value !== selectedItem?.value) {
      onSelect(value);
    }
  };
  
  render(): ReactNode {
    const {id, selectedItem, items} = this.props;
    
    return (
        <div className={styles.mainContainer}>
          <DropdownButtonRB id={id} title={selectedItem?.title} variant="outline-secondary"
                            className={styles.dropdownButton} onSelect={this.onSelect}>
            {items.map((item, index) => {
              const style = item.value === selectedItem?.value ? styles.active : undefined;
              return (
                  <Dropdown.Item key={item.value} eventKey={item.value}
                                 className={style}>{item.title}</Dropdown.Item>
              );
            })}
          </DropdownButtonRB>
        </div>
    );
  }
}

const DropdownButton = DropdownButtonComponent;
export default DropdownButton;

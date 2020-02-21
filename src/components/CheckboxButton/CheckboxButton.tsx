import React, {Component, HTMLAttributes, ReactNode} from "react";
import styles from "./CheckboxButton.module.scss";
import {IoMdCheckbox, IoMdSquareOutline} from "react-icons/io";

export type CheckboxButtonProps = {
  name: string;
  id: string;
  value: string;
} & HTMLAttributes<HTMLDivElement>;

class CheckboxButtonComponent extends Component<CheckboxButtonProps> {
  
  render(): ReactNode {
    const {name, id, children, onChange, className, value, defaultChecked} = this.props;
    return (
        <div className={className}>
          <label className={styles.label}>
            <input type="checkbox" name={name} id={id} onChange={onChange} defaultChecked={defaultChecked} value={value}/>
            <span><IoMdSquareOutline size={'1.1em'}/></span>
            <span><IoMdCheckbox size={'1.1em'}/></span>
            {children}
          </label>
        </div>
    );
  }
}

const CheckboxButton = CheckboxButtonComponent;
export default CheckboxButton;

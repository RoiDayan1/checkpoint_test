import React, {Component, HTMLAttributes, ReactNode} from "react";
import styles from "./RadioButton.module.scss";
import {IoMdRadioButtonOff, IoMdRadioButtonOn} from "react-icons/io";

export type RadioButtonProps = {
  name: string;
  id: string;
  value: string;
} & HTMLAttributes<HTMLDivElement>;

class RadioButtonComponent extends Component<RadioButtonProps> {
  
  render(): ReactNode {
    const {name, id, children, onChange, className, value, defaultChecked} = this.props;
    return (
        <div className={className}>
          <label className={styles.label}>
            <input type="radio" name={name} id={id} onChange={onChange} defaultChecked={defaultChecked} value={value}/>
            <span><IoMdRadioButtonOff size={'1.1em'}/></span>
            <span><IoMdRadioButtonOn size={'1.1em'}/></span>
            {children}
          </label>
        </div>
    );
  }
}

const RadioButton = RadioButtonComponent;
export default RadioButton;

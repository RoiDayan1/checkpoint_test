import React, {Component, HTMLAttributes, ReactNode} from "react";
import styles from "./HoverButton.module.scss";
import {Button} from "react-bootstrap";

export type HoverButtonProps = {
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
} & HTMLAttributes<HTMLDivElement>;

class HoverButtonComponent extends Component<HoverButtonProps> {
  
  render(): ReactNode {
    const {children, className, active, onClick} = this.props;
    return (
        <Button className={`${styles.button} ${className} ${active ? styles.active : ''}`}
                variant="outline-primary" onClick={onClick}>{children}</Button>
    );
  }
}

const HoverButton = HoverButtonComponent;
export default HoverButton;

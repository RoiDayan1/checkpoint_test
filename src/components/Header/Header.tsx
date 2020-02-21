import React, {Component, ReactNode} from "react";
import styles from "./Header.module.scss";

export type HeaderProps = {
  rightContainer?: ReactNode;
};

class HeaderComponent extends Component<HeaderProps> {
  
  render(): ReactNode {
    const {rightContainer} = this.props;
    
    return (
        <div className={styles.mainContainer}>
          <div className={styles.title}>Test Page</div>
          {rightContainer}
        </div>
    );
  }
}

const Header = HeaderComponent;
export default Header;

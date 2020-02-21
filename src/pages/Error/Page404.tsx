import React, {Component, ReactNode} from "react";
import styles from "./ErrorPage.module.scss";
import {RouteComponentProps} from "react-router-dom";

import gif404 from "../../assets/images/404.gif";

class Page404 extends Component<RouteComponentProps> {
  
  goToRootPage = (): void => {
    this.props.history.push('/');
  };
  
  render(): ReactNode {
    return (
        <div className={styles.mainContainer}>
          <img className={styles.gif} src={gif404} alt="404 GIF"/>
          <p className="lead">Page Not Found</p>
          <hr/>
          <p>We're sorry, we couldn't find the page you were looking for</p>
          Maybe
          <button type="button" className="btn btn-primary" onClick={this.goToRootPage}>Head Back Home?</button>
        </div>
    );
  }
}

export default Page404;

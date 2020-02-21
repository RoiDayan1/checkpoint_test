import React, {Component, ReactNode} from "react";
import styles from "./App.module.scss";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import RootPage, {RootPageRoute} from "./pages/Root/RootPage";
import TestPage, {TestPageRoute} from "./pages/Test/TestPage";
import Page404 from "./pages/Error/Page404";

class App extends Component {
  
  render(): ReactNode {
    return (
        <div className={styles.mainContainer}>
          <Router>
            <Switch>
              <Route exact path={RootPageRoute} component={RootPage}/>
              <Route exact path={TestPageRoute} component={TestPage}/>
              <Route component={Page404}/>
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
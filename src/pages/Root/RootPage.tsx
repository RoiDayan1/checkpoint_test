import React, {Component, ReactNode} from "react";
import styles from "./RootPage.module.scss";
import {RouteComponentProps} from "react-router-dom";
import {TestPageRoute} from "../Test/TestPage";

export type RootPageProps = RouteComponentProps;

interface RootPageState {
}

export const RootPageRoute = "/";

class RootPageComponent extends Component<RootPageProps, RootPageState> {
  
  goToTestPage = (): void => {
    this.props.history.push(TestPageRoute);
  };
  
  render(): ReactNode {
    return (
        <div className={styles.mainContainer}>
  
          <h1 className={`display-4 ${styles.header}`}>Checkpoint Test</h1>
          <hr/>
  
          <div className={styles.paragraph}>
            <p className="lead">by Roi Dayan</p>
    
            <button type="button" className={`btn btn-primary btn-lg ${styles.button}`}
                    onClick={this.goToTestPage}>Go To The Test Page
            </button>
          </div>
          <hr/>
  
  
          <p>
            In this demo you'll find a different redux architecture from the old known one, I believe like many others
            in combining responsibilities, if you'll take a closer look at it I'm sure you'll find it's qualities and
            benefits, specially if you are working with Typescript.
          </p>
          <p>
            I find this as the best practice for large applications developed by teams.
          </p>
          <p>
            In a real application I'll usually divide and combine the stores somehow different to avoid unnecessary
            amount of stores, but in this demo I've over divided the stores to be able to demonstrate the redux
            architecture and its qualities and benefits.
          </p>

        </div>
    );
  }
}

const RootPage = RootPageComponent;
export default RootPage;
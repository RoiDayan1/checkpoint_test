import React, {Component, ReactNode} from "react";
import styles from "./Table.module.scss";
import Spinner from "react-bootstrap/Spinner";

export type TableProps = {
  headers: string[];
  rows: (string | undefined)[][];
  onClick?: (index: number) => void;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  message?: string | undefined;
};

class TableComponent extends Component<TableProps> {
  
  canSendLoadMoreCallback = true;
  
  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = Number((target.scrollHeight - target.scrollTop).toFixed(0)) - target.clientHeight < 300;
    if (bottom && this.canSendLoadMoreCallback) {
      this.canSendLoadMoreCallback = false;
      const {onLoadMore = () => null} = this.props;
      onLoadMore();
    }
  };
  
  componentDidUpdate(prevProps: Readonly<TableProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const prevRowsLength = prevProps.rows.length;
    const thisRowsLength = this.props.rows.length;
    if (
        prevRowsLength !== thisRowsLength ||
        !prevRowsLength || !thisRowsLength ||
        prevProps.rows[prevRowsLength - 1][0] !== this.props.rows[thisRowsLength - 1][0]
    ) {
      this.canSendLoadMoreCallback = true;
    }
  }
  
  render(): ReactNode {
    const {headers, rows, onClick = () => null, loadingMore, message} = this.props;
    
    return (
        <div className={styles.mainContainer} onScroll={this.handleScroll}>
          {/*TODO add virtualization */}
          {/*<Virtuoso className={"Virtuoso-Table"} totalCount={rows.length} topItems={1} item={this.rowRenderer}/>*/}
          
          <table>
            <thead>
            <tr>
              {headers.map((header, index) => {
                return <th key={index}>{header}</th>;
              })}
            </tr>
            </thead>
            <tbody>
  
            {loadingMore && rows.length ?
                <tr>
                  <td colSpan={headers.length}>
                    <div className={styles.loadingMoreContainer}>
                      <Spinner animation="grow" variant="primary"/>
                      <div>Loading</div>
                      <Spinner animation="grow" variant="primary"/>
                    </div>
                  </td>
                </tr>
                : null}
  
            {message ?
                <tr>
                  <td colSpan={headers.length}>
                    <div className={styles.messageContainer}>{message}</div>
                  </td>
                </tr>
                : null}
  
            {rows.map((row, rowIndex) => {
              return (
                  <tr key={rowIndex} className={styles.trRow} onClick={() => onClick(rowIndex)}>
                    {row.map((text, textIndex) => {
                      return <td key={textIndex}>{text}</td>;
                    })}
                  </tr>
              );
            })}
  
            {loadingMore ?
                <tr>
                  <td colSpan={headers.length}>
                    <div className={styles.loadingMoreContainer}>
                      <Spinner animation="grow" variant="primary"/>
                      <div>Loading</div>
                      <Spinner animation="grow" variant="primary"/>
                    </div>
                  </td>
                </tr>
                : null}
  
            </tbody>
          </table>

        </div>
    );
  }
}

const Table = TableComponent;
export default Table;
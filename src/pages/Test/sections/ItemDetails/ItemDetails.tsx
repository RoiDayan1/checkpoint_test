import React, {Component, ReactNode} from "react";
import styles from "./ItemDetails.module.scss";
import {AppState, BooksStore, connectAppStore} from "../../../../state";
import {Tab, Tabs} from "react-bootstrap";
import HoverButton from "../../../../components/HoverButton/HoverButton";
import {IoIosClose} from "react-icons/io";

export type ItemDetailsProps = {
  selectedBook: typeof BooksStore.initialState.selectedBook;
  setSelectedBook: typeof BooksStore.setSelectedBook;
};

class ItemDetailsComponent extends Component<ItemDetailsProps> {
  
  onCloseClick = () => {
    const {setSelectedBook = () => null} = this.props;
    setSelectedBook(null);
  };
  
  render(): ReactNode {
    const {selectedBook} = this.props;
    
    if (!selectedBook) return null;
    
    return (
        <div className={styles.mainContainer}>
          
          <HoverButton className={styles.buttonClose} onClick={this.onCloseClick}>
            <IoIosClose size={'1.8em'} className={styles.iconClose}/>
          </HoverButton>
          
          <Tabs defaultActiveKey="volumeInfo" id="item-details-tabs" className={styles.tabs}>
            
            <Tab eventKey="general" title="General">
              <div className={styles.dataContainer}>
                <div className={styles.dataItem}>
                  <div>id:</div>
                  <div>{selectedBook.id}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>kind:</div>
                  <div>{selectedBook.kind}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>etag:</div>
                  <div>{selectedBook.etag}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>selfLink:</div>
                  <div>
                    <a href={selectedBook.selfLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.selfLink}</a>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="volumeInfo" title="Volume Info">
              <div className={styles.dataContainer}>
                <div className={styles.dataItem}>
                  <div>title:</div>
                  <div>{selectedBook.volumeInfo.title}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>authors:</div>
                  <div>{selectedBook.volumeInfo.authors?.join(', ')}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>publishedDate:</div>
                  <div>{selectedBook.volumeInfo.publishedDate}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>publisher:</div>
                  <div>{selectedBook.volumeInfo.publisher}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>pageCount:</div>
                  <div>{selectedBook.volumeInfo.pageCount}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>printType:</div>
                  <div>{selectedBook.volumeInfo.printType}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>categories:</div>
                  <div style={{minWidth: 700}}>{selectedBook.volumeInfo.categories?.join(', ')}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>maturityRating:</div>
                  <div>{selectedBook.volumeInfo.maturityRating}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>contentVersion:</div>
                  <div>{selectedBook.volumeInfo.contentVersion}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>language:</div>
                  <div>{selectedBook.volumeInfo.language}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>averageRating:</div>
                  <div>{selectedBook.volumeInfo.averageRating}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>previewLink:</div>
                  <div><a href={selectedBook.volumeInfo.previewLink} target="_blank"
                          rel="noopener noreferrer">{selectedBook.volumeInfo.previewLink}</a></div>
                </div>
                <div className={styles.dataItem}>
                  <div>infoLink:</div>
                  <div>
                    <a href={selectedBook.volumeInfo.infoLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.volumeInfo.infoLink}</a>
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <div>canonicalVolumeLink:</div>
                  <div>
                    <a href={selectedBook.volumeInfo.canonicalVolumeLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.volumeInfo.canonicalVolumeLink}</a>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="saleInfo" title="Sale Info">
              <div className={styles.dataContainer}>
                <div className={styles.dataItem}>
                  <div>country:</div>
                  <div>{selectedBook.saleInfo.country}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>saleability:</div>
                  <div>{selectedBook.saleInfo.saleability}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>buyLink:</div>
                  <div>
                    <a href={selectedBook.saleInfo.buyLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.saleInfo.buyLink}</a>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="accessInfo" title="Access Info">
              <div className={styles.dataContainer}>
                <div className={styles.dataItem}>
                  <div>country:</div>
                  <div>{selectedBook.accessInfo.country}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>viewability:</div>
                  <div>{selectedBook.accessInfo.viewability}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>accessViewStatus:</div>
                  <div>{selectedBook.accessInfo.accessViewStatus}</div>
                </div>
                <div className={styles.dataItem}>
                  <div>epub:</div>
                  <div>
                    <a href={selectedBook.accessInfo.epub?.downloadLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.accessInfo.epub?.downloadLink}</a>
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <div>pdf:</div>
                  <div>
                    <a href={selectedBook.accessInfo.pdf?.downloadLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.accessInfo.pdf?.downloadLink}</a>
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <div>webReaderLink:</div>
                  <div>
                    <a href={selectedBook.accessInfo.webReaderLink} target="_blank"
                       rel="noopener noreferrer">{selectedBook.accessInfo.webReaderLink}</a>
                  </div>
                </div>
              </div>
            </Tab>
          
          </Tabs>
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedBook: state.BooksStore.selectedBook,
  }
};

const mapDispatchToProps = {
  setSelectedBook: BooksStore.setSelectedBook,
};

const ItemDetails = connectAppStore(ItemDetailsComponent, mapStateToProps, mapDispatchToProps);
export default ItemDetails;
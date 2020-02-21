import React, {ChangeEvent, Component, ReactNode} from "react";
import styles from "./SideFilters.module.scss";
import {AppState, connectAppStore, FiltersStore} from "../../../../state";
import Form from "react-bootstrap/Form";
import {ApiBooksFilter, ApiBooksPrintType} from "../../../../services/Api.models";
import RadioButton from "../../../../components/RadioButton/RadioButton";

export type SideFiltersProps = {
  selectedCategoryFilter: typeof FiltersStore.initialState.selectedCategoryFilter;
  setCategoryFilter: typeof FiltersStore.setCategoryFilter;
  selectedPrintTypeFilter: typeof FiltersStore.initialState.selectedPrintTypeFilter;
  setPrintTypeFilter: typeof FiltersStore.setPrintTypeFilter;
};

class SideFiltersComponent extends Component<SideFiltersProps> {
  
  setCategoryFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const {setCategoryFilter = () => null} = this.props;
    setCategoryFilter(event.target.value as ApiBooksFilter);
  };
  
  setPrintTypeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const {setPrintTypeFilter = () => null} = this.props;
    setPrintTypeFilter(event.target.value as ApiBooksPrintType);
  };
  
  render(): ReactNode {
    const {selectedCategoryFilter, selectedPrintTypeFilter} = this.props;
    
    return (
        <div className={styles.mainContainer}>
          
          <div className={styles.header}>Filters</div>
          
          <div className={styles.subheader}>Print Type</div>
          <Form.Group className={styles.inputGroup} onChange={this.setPrintTypeFilter}>
            <RadioButton name={"printTypeFilterRadios"} id={"printTypeFilterRadios-ALL"}
                         value={ApiBooksPrintType.ALL}
                         defaultChecked={selectedPrintTypeFilter === ApiBooksPrintType.ALL}
            >All</RadioButton>
            <RadioButton name={"printTypeFilterRadios"} id={"printTypeFilterRadios-BOOKS"}
                         value={ApiBooksPrintType.BOOKS}
                         defaultChecked={selectedPrintTypeFilter === ApiBooksPrintType.BOOKS}
            >Books</RadioButton>
            <RadioButton name={"printTypeFilterRadios"} id={"printTypeFilterRadios-MAGAZINES"}
                         value={ApiBooksPrintType.MAGAZINES}
                         defaultChecked={selectedPrintTypeFilter === ApiBooksPrintType.MAGAZINES}
            >Magazines</RadioButton>
          </Form.Group>
          
          
          <div className={styles.subheader}>Category</div>
          <Form.Group className={styles.inputGroup} onChange={this.setCategoryFilter}>
            <RadioButton name={"categoryFilterRadios"} id={"categoryFilterRadios-E_BOOKS"}
                         value={ApiBooksFilter.E_BOOKS}
                         defaultChecked={selectedCategoryFilter === ApiBooksFilter.E_BOOKS}
            >E Books</RadioButton>
            <RadioButton name={"categoryFilterRadios"} id={"categoryFilterRadios-FREE_E_BOOKS"}
                         value={ApiBooksFilter.FREE_E_BOOKS}
                         defaultChecked={selectedCategoryFilter === ApiBooksFilter.FREE_E_BOOKS}
            >Free E Books</RadioButton>
            <RadioButton name={"categoryFilterRadios"} id={"categoryFilterRadios-PAID_E_BOOKS"}
                         value={ApiBooksFilter.PAID_E_BOOKS}
                         defaultChecked={selectedCategoryFilter === ApiBooksFilter.PAID_E_BOOKS}
            >Paid E Books</RadioButton>
            <RadioButton name={"categoryFilterRadios"} id={"categoryFilterRadios-FULL"}
                         value={ApiBooksFilter.FULL}
                         defaultChecked={selectedCategoryFilter === ApiBooksFilter.FULL}
            >Full</RadioButton>
            <RadioButton name={"categoryFilterRadios"} id={"categoryFilterRadios-PARTIAL"}
                         value={ApiBooksFilter.PARTIAL}
                         defaultChecked={selectedCategoryFilter === ApiBooksFilter.PARTIAL}
            >Partial</RadioButton>
          </Form.Group>
        
        
        </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedPrintTypeFilter: state.FiltersStore.selectedPrintTypeFilter,
    selectedCategoryFilter: state.FiltersStore.selectedCategoryFilter,
  }
};

const mapDispatchToProps = {
  setPrintTypeFilter: FiltersStore.setPrintTypeFilter,
  setCategoryFilter: FiltersStore.setCategoryFilter,
};

const SideFilters = connectAppStore(SideFiltersComponent, mapStateToProps, mapDispatchToProps);
export default SideFilters;
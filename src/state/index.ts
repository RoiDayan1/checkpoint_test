import {ComponentType} from "react";
import {
  ActionCreatorsMapObject,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  createStore,
  Middleware
} from "redux";
import {connect, MapStateToPropsParam} from "react-redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import {mapValues} from "lodash";

import TabsMenuStore from "./stores/TabsMenuStore";
import FiltersStore from "./stores/FiltersStore";
import BooksStore from "./stores/BooksStore";

const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger({collapsed: true}))
}

export interface AppState {
  TabsMenuStore: typeof TabsMenuStore.initialState;
  FiltersStore: typeof FiltersStore.initialState;
  BooksStore: typeof BooksStore.initialState;
}

export const AppStore = createStore(
    combineReducers({
      TabsMenuStore: TabsMenuStore.reducer,
      FiltersStore: FiltersStore.reducer,
      BooksStore: BooksStore.reducer,
    }),
    applyMiddleware(...middleware),
);

export {
  TabsMenuStore,
  FiltersStore,
  BooksStore,
};

export const connectAppStore = (
    component: ComponentType<any>,
    mapStateToProps: MapStateToPropsParam<{}, {}, AppState>,
    mapDispatchToProps: ActionCreatorsMapObject,
) => {
  return connect(mapStateToProps, (dispatch) => {
    return mapValues(mapDispatchToProps, (o) => bindActionCreators(o, dispatch));
  })(component);
};



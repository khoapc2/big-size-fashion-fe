import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, reloadReducer } from "redux/reducers/userReducer";
import { listProductReducer } from "redux/reducers/productReducer";
import {
  listStoreReducer,
  createStoreReducer,
  deleteStoreReducer,
  viewDetailStoreReducer,
} from "redux/reducers/storeReducer";

import { listSizeReducer } from "redux/reducers/sizeReducer";
import { listColorReducer } from "redux/reducers/colorReducer";
import { listCategoryReducer } from "redux/reducers/categoryReducer";
import { listPromotionReducer } from "redux/reducers/promotionReducer";
import { listManagerReducer } from "redux/reducers/managerReducer";
import { listStaffReducer } from "redux/reducers/staffReducer";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  triggerReload: reloadReducer,
  productList: listProductReducer,
  storeList: listStoreReducer,
  sizeList: listSizeReducer,
  colorList: listColorReducer,
  categoryList: listCategoryReducer,
  promotionList: listPromotionReducer,
  createStoreState: createStoreReducer,
  deleteStoreState: deleteStoreReducer,
  managerList: listManagerReducer,
  staffList: listStaffReducer,
  viewStore: viewDetailStoreReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

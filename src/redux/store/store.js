import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, reloadReducer } from "redux/reducers/userReducer";
import {
  listProductReducer,
  createProductReducer,
  viewDetailProductReducer,
} from "redux/reducers/productReducer";
import {
  listStoreReducer,
  createStoreReducer,
  deleteStoreReducer,
  viewDetailStoreReducer,
  updateStoreReducer,
  listStoreDropdownReducer,
} from "redux/reducers/storeReducer";

import {
  listSizeReducer,
  createSizeReducer,
  updateSizeReducer,
  viewDetailSizeReducer,
} from "redux/reducers/sizeReducer";
import {
  listColorReducer,
  createColorReducer,
  viewDetailColorReducer,
  updateColorReducer,
  listColorDropdownReducer,
} from "redux/reducers/colorReducer";
import {
  listCategoryReducer,
  createCategoryReducer,
  updateCategoryReducer,
  viewDetailCategoryReducer,
  listCategoryDropdownReducer,
} from "redux/reducers/categoryReducer";
import {
  listPromotionReducer,
  createPromotionReducer,
  deletePromotionReducer,
  viewDetailPromotionReducer,
  updatePromotionReducer,
} from "redux/reducers/promotionReducer";
import { listManagerReducer } from "redux/reducers/managerReducer";
import { listStaffReducer, listStaffInStoreReducer } from "redux/reducers/staffReducer";
import {
  listOnlineOrderReducer,
  listOfflineOrderReducer,
  viewDetailOfflineOrderReducer,
  approveOfflineOrderReducer,
  rejectOfflineOrderReducer,
} from "redux/reducers/orderReducer";
import {
  listCustomerReducer,
  deleteAccountReducer,
  viewDetailAccountReducer,
  createAccountReducer,
  resetPasswordReducer,
} from "redux/reducers/customerReducer";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  triggerReload: reloadReducer,
  productList: listProductReducer,
  createProductState: createProductReducer,
  viewProduct: viewDetailProductReducer,
  storeList: listStoreReducer,
  sizeList: listSizeReducer,
  colorList: listColorReducer,
  categoryList: listCategoryReducer,
  promotionList: listPromotionReducer,
  createStoreState: createStoreReducer,
  deleteStoreState: deleteStoreReducer,
  updateStoreState: updateStoreReducer,
  viewStore: viewDetailStoreReducer,
  managerList: listManagerReducer,
  staffList: listStaffReducer,
  customerList: listCustomerReducer,
  createCategoryState: createCategoryReducer,
  updateCategoryState: updateCategoryReducer,
  viewCategory: viewDetailCategoryReducer,
  createPromotionState: createPromotionReducer,
  updatePromotionState: updatePromotionReducer,
  viewPromotion: viewDetailPromotionReducer,
  deletePromotionState: deletePromotionReducer,
  createSizeState: createSizeReducer,
  updateSizeState: updateSizeReducer,
  viewSize: viewDetailSizeReducer,
  createColorState: createColorReducer,
  updateColorState: updateColorReducer,
  viewColor: viewDetailColorReducer,
  deleteAccountState: deleteAccountReducer,
  viewAccount: viewDetailAccountReducer,
  getListColorDropdown: listColorDropdownReducer,
  getListCategoryDropdown: listCategoryDropdownReducer,
  getListStoreDropdown: listStoreDropdownReducer,
  createAccountState: createAccountReducer,
  viewOnlineOrder: listOnlineOrderReducer,
  viewOfflineOrder: listOfflineOrderReducer,
  viewDetailOfflineOrder: viewDetailOfflineOrderReducer,
  approveOfflineOrder: approveOfflineOrderReducer,
  rejectOfflineOrder: rejectOfflineOrderReducer,
  getListStaffDropDown: listStaffInStoreReducer,
  resetPasswordState: resetPasswordReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

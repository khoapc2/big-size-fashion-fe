import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, reloadReducer } from "redux/reducers/userReducer";
import {
  listProductReducer,
  createProductReducer,
  viewDetailProductReducer,
  updateProductReducer,
  productImportInvoiceReducer,
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
  listSizeDropdownReducer,
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
  listPromotionDropdownReducer,
} from "redux/reducers/promotionReducer";
import { listManagerReducer } from "redux/reducers/managerReducer";
import { listStaffReducer, listStaffInStoreReducer } from "redux/reducers/staffReducer";
import {
  listOnlineOrderReducer,
  listOfflineOrderReducer,
  viewDetailOfflineOrderReducer,
  approveOfflineOrderReducer,
  approveOnlineOrderReducer,
  rejectOfflineOrderReducer,
  rejectOnlineOrderReducer,
  cancelOnlineOrderReducer,
  orderTodayReducer,
} from "redux/reducers/orderReducer";
import {
  listCustomerReducer,
  deleteAccountReducer,
  viewDetailAccountReducer,
  createAccountReducer,
  resetPasswordReducer,
} from "redux/reducers/customerReducer";
import {
  listImportDeliverReducer,
  listExportDeliverReducer,
  createImportDeliverReducer,
} from "redux/reducers/deliverReducer";
import { zaloLinkReducer } from "redux/reducers/zaloReducer";
import {
  getStorewarehouseReducer,
  quantityAjustmentReducer,
} from "redux/reducers/inventoryReducer";
import { viewRevenueReducer } from "redux/reducers/revenueReducer";

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
  approveOnlineOrder: approveOnlineOrderReducer,
  rejectOnlineOrder: rejectOnlineOrderReducer,
  resetPasswordState: resetPasswordReducer,
  getListSizeDropdown: listSizeDropdownReducer,
  getListPromotionDropdown: listPromotionDropdownReducer,
  viewImportDeliver: listImportDeliverReducer,
  viewExportDeliver: listExportDeliverReducer,
  updateProduct: updateProductReducer,
  listImportProduct: productImportInvoiceReducer,
  createImportDeliver: createImportDeliverReducer,
  getZaloLink: zaloLinkReducer,
  listInventoryProduct: getStorewarehouseReducer,
  quantityAjustment: quantityAjustmentReducer,
  cancelOnlineOrder: cancelOnlineOrderReducer,
  viewRevenue: viewRevenueReducer,
  orderToday: orderTodayReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

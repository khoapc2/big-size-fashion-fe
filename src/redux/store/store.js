import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, reloadReducer } from "redux/reducers/userReducer";
import {
  listProductReducer,
  createProductReducer,
  viewDetailProductReducer,
  updateProductReducer,
  productImportInvoiceReducer,
  deleteProductReducer,
} from "redux/reducers/productReducer";
import {
  listStoreReducer,
  createStoreReducer,
  deleteStoreReducer,
  viewDetailStoreReducer,
  updateStoreReducer,
  listStoreDropdownReducer,
  listActiveStoreDropdownReducer,
  getMainWareHouseReducer,
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
  listProductOfPromotionReducer,
  deleteProductFromPromotionReducer,
  addProductToPromotionReducer,
  listProductsToAddPromotionReducer,
} from "redux/reducers/promotionReducer";
import {
  listManagerReducer,
  viewOwnProfileReducer,
  updateProfileReducer,
} from "redux/reducers/managerReducer";
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
  staffPerformanceOrderReducer,
  changePaymentMethodReducer,
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
  viewDetailDeliveryNoteReducer,
  approveDeliveryReducer,
  rejectDeliveryReducer,
  cancelDeliveryReducer,
} from "redux/reducers/deliverReducer";
import { zaloLinkReducer } from "redux/reducers/zaloReducer";
import {
  getStorewarehouseReducer,
  quantityAjustmentReducer,
  listInventoryNoteReducer,
  viewDetailInventoryNoteReducer,
  createInventoryNoteReducer,
  deleteInventoryNoteReducer,
  listInventoryNoteAfterCreateReducer,
  viewDetailInventoryNoteAfterCreateReducer,
} from "redux/reducers/inventoryReducer";
import { viewRevenueReducer } from "redux/reducers/revenueReducer";
import { listFeedbackReducer, deleteFeedbackReducer } from "redux/reducers/feedbackReducer";

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
  viewDetailDeliveryNote: viewDetailDeliveryNoteReducer,
  orderToday: orderTodayReducer,
  orderStaffPerformance: staffPerformanceOrderReducer,
  approveDeliveryState: approveDeliveryReducer,
  rejectDeliveryState: rejectDeliveryReducer,
  listActiveStoreDropdown: listActiveStoreDropdownReducer,
  getMainWareHouse: getMainWareHouseReducer,
  listFeedbackState: listFeedbackReducer,
  deleteFeedbackState: deleteFeedbackReducer,
  listProductOfPromotionState: listProductOfPromotionReducer,
  deleteProductFromPromotionState: deleteProductFromPromotionReducer,
  addProductToPromotionState: addProductToPromotionReducer,
  listProductsToAddPromotionState: listProductsToAddPromotionReducer,
  deleteProductState: deleteProductReducer,
  listInventoryNote: listInventoryNoteReducer,
  viewOwnProfileState: viewOwnProfileReducer,
  updateProfileState: updateProfileReducer,
  cancelDeliveryState: cancelDeliveryReducer,
  viewDetailInventoryNote: viewDetailInventoryNoteReducer,
  createInventoryNote: createInventoryNoteReducer,
  deleteInventoryNoteState: deleteInventoryNoteReducer,
  changePaymentMethod: changePaymentMethodReducer,
  listInventoryNoteAfterCreate: listInventoryNoteAfterCreateReducer,
  viewDetailInventoryNoteAfterCreate: viewDetailInventoryNoteAfterCreateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

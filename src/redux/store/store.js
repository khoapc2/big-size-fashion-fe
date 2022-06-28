import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, reloadReducer } from "redux/reducers/userReducer";
import { listProductReducer } from "redux/reducers/productReducer";
import { listStoreReducer } from "redux/reducers/storeReducer";
import { listSizeReducer } from "redux/reducers/sizeReducer";
import { listColorReducer } from "redux/reducers/colorReducer";
import { listCategoryReducer } from "redux/reducers/categoryReducer";

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
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;

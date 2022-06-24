import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import { MaterialUIControllerProvider } from "context";

// Material Dashboard 2 React Context Provider
// import Toastify from "./components/Toastify";
import store from "./redux/store/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

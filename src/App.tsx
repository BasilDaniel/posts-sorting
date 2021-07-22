import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import { store, history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";
import Layout from "./components/layout/Layout";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

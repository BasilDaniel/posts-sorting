import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import { store, history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={history}></ConnectedRouter>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { AxiosResponse } from "axios";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { message } from "antd";
import { Middleware, MiddlewareAPI, Dispatch as ReduxDispatch } from "redux";
import { createBrowserHistory } from "history";
import createLoadingPlugin from "@rematch/loading";
import models, { IRootModel } from "../models";
import { EStatusCodes } from "../api/constants";

export const history = createBrowserHistory();

const loadingPlugin = createLoadingPlugin<IRootModel>({ asNumber: false });
const router = connectRouter(history);

const errorHandler: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next: ReduxDispatch) =>
  (action) => {
    try {
      return next(action).catch(({ response }: { response: AxiosResponse }) => {
        if (response) {
          switch (response.status) {
            case EStatusCodes.Unauthorized:
              message.error(response.data.error);
              break;
            case EStatusCodes.InternalServerError:
              message.error("Something went wrong, contact administration.");
              break;

            default:
              break;
          }
        }
      });
    } catch (error) {}
  };

export const store = init({
  plugins: [loadingPlugin],
  models,
  redux: {
    rootReducers: {
      resetStore: () => undefined,
    },
    middlewares: [routerMiddleware(history), errorHandler],
    reducers: {
      router,
    },
  },
});

interface ILoadingPlugin {
  loading: {
    global: boolean;
    models: RematchRootState<IRootModel>;
    effects: Dispatch;
  };
}

interface IConnectedRouter {
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
      query: { [key: string]: string };
    };
  };
}

export type Store = typeof store;
export type Dispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel> &
  ILoadingPlugin &
  IConnectedRouter;
export const dispatchResetStore = () => store.dispatch({ type: "resetStore" });

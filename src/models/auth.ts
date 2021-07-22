import { createModel } from "@rematch/core";
import { push } from "connected-react-router";
import { IRootModel } from ".";
import AuthSevice from "../api/AuthSevice";
import { EStatusCodes } from "../api/constants";

interface IState {}

const initialState: IState = {};

export interface IAuthData {
  email: string;
  client_id: string;
  sl_token: string;
}

export interface IAuthResponse {
  data: IAuthData;
  meta: {
    request_id: string;
  };
}

export interface IUserLogin {
  email: string;
  client_id: string;
  name: string;
}

export const auth = createModel<IRootModel>()({
  state: initialState,
  reducers: {},
  effects: (d) => {
    return {
      async onLogin(params: IUserLogin) {
        const { data, status } = await AuthSevice.login(params);
        if (status === EStatusCodes.Ok) {
          localStorage.setItem("sl_token", data.data.sl_token);
        }
      },
      async onLogout() {
        localStorage.removeItem("sl_token");
        d(push("/"));
      },
    };
  },
});

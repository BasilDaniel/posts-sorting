import axios from "axios";
import { IAuthResponse, IUserLogin } from "../models/auth";

const url = "/register";

const AuthSevice = {
  login: (params: IUserLogin) => axios.post<IAuthResponse>(url, params),
};

export default AuthSevice;

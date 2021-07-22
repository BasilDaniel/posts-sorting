import { Models } from "@rematch/core";
import { auth } from "./auth";
import { post } from "./post";

export interface IRootModel extends Models<IRootModel> {
  auth: typeof auth;
  post: typeof post;
}
const rootModel: IRootModel = {
  auth,
  post,
};

export default rootModel;

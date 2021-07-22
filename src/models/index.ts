import { Models } from "@rematch/core";

export interface IRootModel extends Models<IRootModel> {}
const rootModel: IRootModel = {};

export default rootModel;

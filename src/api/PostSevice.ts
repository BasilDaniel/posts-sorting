import axios from "axios";
import { IGetPostsParams, IPostResponse } from "../models/post";

const url = "/posts";

const PostSevice = {
  getPosts: (params: IGetPostsParams) =>
    axios.get<IPostResponse>(url, { params }),
};

export default PostSevice;

import { createModel } from "@rematch/core";
import moment from "moment";
import { IRootModel } from ".";
import PostSevice from "../api/PostSevice";
import {
  getAverageCharacterLengthByMoth,
  getAverageNumberOfPostsPerUserPerMonth,
  getLongestPostByCharacterPerMonth,
  getTotalPostsSplitByWeekNumber,
  sortByMonth,
  sortByWeek,
} from "../utils/sortingHandlers";

export interface IPost {
  id: string;
  created_time: string;
  from_id: string;
  from_name: string;
  message: string;
  type: string;
}
export interface IPostResponse {
  data: {
    page: number;
    posts: IPost[];
  };
  meta: { request_id: string };
}
export interface IPostWithMonthWeek extends IPost {
  month: number;
  week: number;
}
export interface IAverageCharacterLengthPerMoth {
  month: number;
  averageCharacterLength: number;
}
export interface ILongestPostByCharacterPerMonth {
  month: number;
  post?: IPostWithMonthWeek;
}
export interface IAverageNumberOfPostsPerUserPerMonth {
  month: number;
  averageNumberOfPostsPerUser: number;
}
export interface ITotalPostsSplitByWeekNumber {
  week: number;
  totalPosts: number;
}
export interface IGetPostsParams {
  page: number;
  sl_token: string;
}

interface IState {
  averageCharacterLengthByMoth: IAverageCharacterLengthPerMoth[] | null;
  longestPostByCharacterPerMonth: ILongestPostByCharacterPerMonth[] | null;
  averageNumberOfPostsPerUserPerMonth:
    | IAverageNumberOfPostsPerUserPerMonth[]
    | null;
  totalPostsSplitByWeekNumber: ITotalPostsSplitByWeekNumber[] | null;
}

const initialState: IState = {
  averageCharacterLengthByMoth: null,
  longestPostByCharacterPerMonth: null,
  averageNumberOfPostsPerUserPerMonth: null,
  totalPostsSplitByWeekNumber: null,
};

export const post = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setAverageCharacterLengthByMoth(
      state,
      averageCharacterLengthByMoth: IAverageCharacterLengthPerMoth[]
    ): IState {
      return { ...state, averageCharacterLengthByMoth };
    },
    setLongestPostByCharacterPerMonth(
      state,
      longestPostByCharacterPerMonth: ILongestPostByCharacterPerMonth[]
    ): IState {
      return { ...state, longestPostByCharacterPerMonth };
    },
    setAverageNumberOfPostsPerUserPerMonth(
      state,
      averageNumberOfPostsPerUserPerMonth: IAverageNumberOfPostsPerUserPerMonth[]
    ): IState {
      return { ...state, averageNumberOfPostsPerUserPerMonth };
    },
    setTotalPostsSplitByWeekNumber(
      state,
      totalPostsSplitByWeekNumber: ITotalPostsSplitByWeekNumber[]
    ): IState {
      return { ...state, totalPostsSplitByWeekNumber };
    },
  },
  effects: (d) => {
    return {
      async getPosts(amount: number) {
        const sl_token = localStorage.getItem("sl_token");
        if (!sl_token) {
          return;
        }
        const pageSize = 100;
        const pageAmount = amount > pageSize ? Math.ceil(amount / pageSize) : 1;

        const values = await Promise.all(
          [...Array(pageAmount)].map(async (item, index) => {
            const { data } = await PostSevice.getPosts({
              page: index + 1,
              sl_token,
            });
            return data.data.posts;
          })
        );

        const postsWithMonthWeek: IPostWithMonthWeek[] = values
          .flat()
          .map((post) => ({
            ...post,
            month: moment(post.created_time).month() + 1,
            week: moment(post.created_time).week(),
          }));

        const sortedByMonth = sortByMonth(postsWithMonthWeek);
        const sortedByWeek = sortByWeek(postsWithMonthWeek);

        d.post.setAverageCharacterLengthByMoth(
          getAverageCharacterLengthByMoth(sortedByMonth)
        );
        d.post.setLongestPostByCharacterPerMonth(
          getLongestPostByCharacterPerMonth(sortedByMonth)
        );
        d.post.setAverageNumberOfPostsPerUserPerMonth(
          getAverageNumberOfPostsPerUserPerMonth(sortedByMonth)
        );
        d.post.setTotalPostsSplitByWeekNumber(
          getTotalPostsSplitByWeekNumber(sortedByWeek)
        );
      },
    };
  },
});

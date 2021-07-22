import {
  IAverageCharacterLengthPerMoth,
  IAverageNumberOfPostsPerUserPerMonth,
  ILongestPostByCharacterPerMonth,
  IPostWithMonthWeek,
  ITotalPostsSplitByWeekNumber,
} from "../models/post";

export const sortByMonth = (
  posts: IPostWithMonthWeek[]
): IPostWithMonthWeek[][] => {
  const sorted: IPostWithMonthWeek[][] = [...Array(12)].map(() => []);
  posts.forEach((post) => {
    sorted[post.month - 1].push(post);
  });
  return sorted;
};

export const sortByWeek = (
  posts: IPostWithMonthWeek[]
): IPostWithMonthWeek[][] => {
  const sorted: IPostWithMonthWeek[][] = [...Array(53)].map(() => []);
  posts.forEach((post) => {
    sorted[post.week - 1].push(post);
  });
  return sorted;
};

export const getAverageCharacterLengthByMoth = (
  posts: IPostWithMonthWeek[][]
): IAverageCharacterLengthPerMoth[] => {
  return posts.map((item, index) => {
    let totalCharacterAmount = 0;
    item.forEach((post) => (totalCharacterAmount += post.message.length));
    return {
      month: index + 1,
      averageCharacterLength:
        Math.ceil(totalCharacterAmount / item.length) || 0,
    };
  });
};

export const getLongestPostByCharacterPerMonth = (
  posts: IPostWithMonthWeek[][]
): ILongestPostByCharacterPerMonth[] => {
  return posts.map((item, index) => {
    return {
      month: index + 1,
      post: item.sort((a, b) => a.message.length - b.message.length)[
        item.length - 1
      ],
    };
  });
};

export const getAverageNumberOfPostsPerUserPerMonth = (
  posts: IPostWithMonthWeek[][]
): IAverageNumberOfPostsPerUserPerMonth[] => {
  return posts.map((item, index) => {
    const uniqueUsers: (number | string)[] = [];
    item.forEach(
      (post) =>
        !uniqueUsers.some((uniqueUser) => uniqueUser === post.from_id) &&
        uniqueUsers.push(post.from_id)
    );
    return {
      month: index + 1,
      averageNumberOfPostsPerUser:
        Math.ceil(item.length / uniqueUsers.length) || 0,
    };
  });
};

export const getTotalPostsSplitByWeekNumber = (
  posts: IPostWithMonthWeek[][]
): ITotalPostsSplitByWeekNumber[] => {
  return posts.map((item, index) => {
    return {
      week: index + 1,
      totalPosts: item.length,
    };
  });
};

import { Col, Row, Table } from "antd";
import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { IPost } from "../../models/post";
import { Dispatch, IRootState } from "../../redux/store";

const mapState = (state: IRootState) => ({
  averageCharacterLengthByMoth: state.post.averageCharacterLengthByMoth,
  longestPostByCharacterPerMonth: state.post.longestPostByCharacterPerMonth,
  averageNumberOfPostsPerUserPerMonth:
    state.post.averageNumberOfPostsPerUserPerMonth,
  totalPostsSplitByWeekNumber: state.post.totalPostsSplitByWeekNumber,
});

const mapDispatch = (dispatch: Dispatch) => ({
  getPosts: dispatch.post.getPosts,
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type IProps = connectedProps;

const Main: FC<IProps> = ({
  getPosts,
  averageCharacterLengthByMoth,
  longestPostByCharacterPerMonth,
  averageNumberOfPostsPerUserPerMonth,
  totalPostsSplitByWeekNumber,
}) => {
  useEffect(() => {
    getPosts(1000);
  }, []);
  if (
    !averageCharacterLengthByMoth ||
    !longestPostByCharacterPerMonth ||
    !averageNumberOfPostsPerUserPerMonth ||
    !totalPostsSplitByWeekNumber
  ) {
    return null;
  }
  const averageCharacterColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    {
      title: "Average character length",
      dataIndex: "averageCharacterLength",
      key: "averageCharacterLength",
    },
  ];

  const longestPostColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    {
      title: "Longest post",
      dataIndex: "post",
      key: "post",
      render: (post: IPost) => post?.message || "-",
      ellipsis: true,
    },
  ];
  const averageNumberOfPostsColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    {
      title: "Average number of posts",
      dataIndex: "averageNumberOfPostsPerUser",
      key: "averageNumberOfPostsPerUser",
    },
  ];

  const totalPostsSplitByWeekNumberColumns = [
    { title: "Week", dataIndex: "week", key: "week" },
    {
      title: "Total posts",
      dataIndex: "totalPosts",
      key: "totalPosts",
    },
  ];
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Table
          columns={averageCharacterColumns}
          dataSource={averageCharacterLengthByMoth}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Col>
      <Col span={6}>
        <Table
          columns={longestPostColumns}
          dataSource={longestPostByCharacterPerMonth}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Col>
      <Col span={6}>
        <Table
          columns={averageNumberOfPostsColumns}
          dataSource={averageNumberOfPostsPerUserPerMonth}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Col>
      <Col span={6}>
        <Table
          columns={totalPostsSplitByWeekNumberColumns}
          dataSource={totalPostsSplitByWeekNumber}
          pagination={false}
          scroll={{ y: 600 }}
        />
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Main);

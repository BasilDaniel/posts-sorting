import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch, IRootState } from "../../redux/store";
import { Button, Col, Form, Input, Row } from "antd";
import { IUserLogin } from "../../models/auth";
import { cliendId } from "../../api/constants";

const mapState = (state: IRootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({
  onLogin: dispatch.auth.onLogin,
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Login: FC<IProps> = ({ onLogin }) => {
  const onFinish = (values: IUserLogin) => {
    onLogin({ ...values, client_id: cliendId });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" className="login-wrapper">
      <Col span={10}>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default connect(mapState, mapDispatch)(Login);

import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { Dispatch, IRootState } from "../../redux/store";
import Spiner from "../common/Spiner";
import Login from "../auth/Login";
import Main from "./Main";

const mapState = (state: IRootState) => ({
  onGlobalLoading: state.loading.global,
});

const mapDispatch = (dispatch: Dispatch) => ({});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

type IProps = connectedProps & {};

const Layout: FC<IProps> = ({ onGlobalLoading }) => {
  const sl_token = localStorage.getItem("sl_token");
  return (
    <>
      <Row justify="space-around" className="main-wrapper" align="middle">
        <Col span={24}>
          <Switch>
            {!sl_token && <Route exact path="*" component={Login} />}
            {sl_token && <Route path="/" component={Main} />}
          </Switch>
        </Col>
      </Row>
      {onGlobalLoading && <Spiner loading={onGlobalLoading} />}
    </>
  );
};

export default connect(mapState, mapDispatch)(Layout);

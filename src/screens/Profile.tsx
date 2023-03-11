import { Button, Card, Col, Row } from "antd";
import React from "react";

function Profile(): JSX.Element {
  return (
    <Card
      title="User Profile"
      bordered={false}
      style={{ width: "80%" }}
      className="mx-auto mt-10 shadow-md"
    >
      <Row>
        <Col span={12}>
          <div className="">Name</div>
          <div className="">Email</div>
          <div className="">Phone</div>
          <div className="">Payment ID</div>
          <Button
            type="default"
            style={{
              height: "40px",
              borderRadius: "5px",
              textAlign: "center",
              background: "#1668dc",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "capitalize",
              width: "auto",
            }}
            htmlType="submit"
            size="large"
            className="float-right"
          >
            Generate Payment ID
          </Button>
        </Col>
        <Col span={12} title="Transaction History">
          <div>Incoming Transactions</div>
          <div>Outgoing Transactions</div>
        </Col>
      </Row>
    </Card>
  );
}

export default Profile;
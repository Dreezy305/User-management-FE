import { Button, Card, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function SIgnUp(): JSX.Element {
  const navigate = useNavigate();
  const onFinish = (value: object) => {
    console.log(value);
    navigate("/profile");
  };
  return (
    <Card
      title="Sign up"
      bordered={false}
      style={{ width: 400 }}
      className="mx-auto mt-10 shadow-md"
    >
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number" },
          ]}
        >
          <Input placeholder="phone number" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

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
            width: "132px",
          }}
          htmlType="submit"
          size="large"
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default SIgnUp;

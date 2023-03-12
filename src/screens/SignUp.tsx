import { Button, Card, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInterface } from "../utils/interfaces";

const Context = React.createContext({ name: "Default" });

type NotificationType = "success" | "info" | "warning" | "error";

function SIgnUp(): JSX.Element {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  // OPENS NOTIFICATION
  const openNotification = (type: NotificationType) => {
    api.success({
      message: `Success`,
      description: (
        <Context.Consumer>
          {({ name }) => `Account created successfully.`}
        </Context.Consumer>
      ),
    });
  };

  console.log(`${process.env.REACT_APP_BASE_URL}/user/signup`);

  const onFinish = async (value: signInterface) => {
    const text = value.name;
    const payload = {
      email: value.email,
      name: text.trim(),
      phoneNumber: value.phoneNumber,
      password: value.password,
    };

    try {
      const response = await axios.post(
        `https://user-management-assessment.herokuapp.com/v1/api/user/signup`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        navigate(`/profile?${value.email}`, { state: { email: value.email } });
        openNotification("success");
      }
    } catch (error: any) {
      console.log(error?.response);
      openNotification("error");
      return error;
    }
  };
  return (
    <>
      {contextHolder}
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
    </>
  );
}

export default SIgnUp;

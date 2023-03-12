/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Profile(): JSX.Element {
  const location = useLocation();
  const locationEmail = location?.state?.email;
  const [data, setUserData] = useState<any>([]);

  const generateProfile = async (email: string) => {
    const payload = { email: email };
    try {
      const response = await axios.post(
        "https://user-management-assessment.herokuapp.com/v1/api/user/getTransactionHistory",
        payload
      );
      console.log(response, "ki");
      if (response.status === 200) {
        setUserData(response?.data?.data);
      }
    } catch (error) {
      return error;
    }
  };

  const deletePaymentID = async (id: string, paymentID: string) => {
    try {
      const response = await axios.delete(
        `https://user-management-assessment.herokuapp.com/v1/api/user/deletePaymentId/${id}/paymentId/${paymentID}`
      );
      if (response.status === 200) {
        generateProfile(locationEmail);
      }
    } catch (error) {
      return error;
    }
  };

  const generatePaymentID = async (id: string) => {
    try {
      const response = await axios.put(
        `https://user-management-assessment.herokuapp.com/v1/api/user/generatePaymentId/${id}`
      );
      if (response.status === 200) {
        generateProfile(locationEmail);
      }
    } catch (error) {
      return error;
    }
  };

  console.log(data, "llo");
  const paymentID = data?.paymentID;

  useEffect(() => {
    generateProfile(locationEmail);
  }, []);
  return (
    <Card
      title="User Profile"
      bordered={false}
      style={{ width: 400 }}
      className="mx-auto mt-10 shadow-md"
    >
      <Row>
        <Col span={8}>
          <div className="flex flex-row items-center justify-between py-3 space-x-8">
            <span>Name</span>
            <span>{data?.name}</span>
          </div>
          <div className="flex flex-row items-center  justify-between py-3 space-x-8">
            <span>Email</span>
            <span>{data?.email}</span>
          </div>
          <div className="flex flex-row items-center  justify-between py-3 space-x-8">
            <span>Phone</span>
            <span>{data?.phone_number}</span>
          </div>
          <div className="flex flex-row items-center flex-wrap">
            <div>Payment IDs</div>
            {paymentID?.map((i: any) => {
              return (
                <>
                  {" "}
                  <span>{i}</span>
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      deletePaymentID(data?.id, i);
                    }}
                  >
                    Delete Payment ID
                  </Button>
                </>
              );
            })}
            <span></span>
          </div>
          <div className="py-3">
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
              htmlType="button"
              size="large"
              onClick={() => generatePaymentID(data?.id)}
            >
              Generate Payment ID
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Profile;

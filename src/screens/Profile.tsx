/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Col, Input, InputNumber, Modal, Row, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { transferDto } from "../utils/interfaces";

function Profile(): JSX.Element {
  const location = useLocation();
  const { Column } = Table;
  const locationEmail = location?.state?.email;
  const [data, setUserData] = useState<any>([]);
  const [recEmail, setRecEmail] = useState("");
  const [amount, setAmount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

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

  const transferFunds = async (payload: transferDto) => {
    try {
      const response = await axios.post(
        `https://user-management-assessment.herokuapp.com/v1/api/user/transferFunds`,
        payload
      );
      if (response.status === 200) {
        generateProfile(locationEmail);
        setRecEmail("");
        setAmount(0);
        handleCancel();
      }
    } catch (error) {
      return error;
    }
  };

  const payload: transferDto = {
    amount: amount,
    receiverEmail: recEmail,
    senderEmail: data?.email,
  };

  console.log(data, "llo");
  const paymentID = data?.paymentID;
  const sentTx = data?.sentTransactions;
  const recievedTx = data?.receivedTransactions;

  const onChange = (value: number) => {
    setAmount(value);
  };

  useEffect(() => {
    generateProfile(locationEmail);
  }, []);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <>
            <Button
              type="default"
              style={{
                height: "40px",
                borderRadius: "3px",
                background: "#1668dc",
                textAlign: "center",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "capitalize",
                width: "132px",
              }}
              className="capitalize mt-3"
              onClick={() => transferFunds(payload)}
            >
              Send
            </Button>
          </>
        }
      >
        <div className="flex flex-col space-y-3">
          <Input
            placeholder="Receiver email"
            value={recEmail}
            onChange={(e) => setRecEmail(e.target.value)}
            size="large"
            className="w-full"
          />
          <InputNumber
            placeholder="Amount"
            onChange={(value: any) => onChange(value)}
            size="large"
            className="w-full"
          />
        </div>
      </Modal>
      <Card
        title="User Profile"
        bordered={false}
        style={{ width: 700 }}
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
            <div className="flex flex-row items-center  justify-between py-3 space-x-8">
              <span>Account Balance</span>
              <span>{data?.accountBalance}</span>
            </div>
            <div className="flex flex-row items-center flex-wrap">
              <div>Payment IDs</div>
              <div className="flex flex-row justify-evenly space-x-3">
                {paymentID?.map((i: any) => {
                  return (
                    <div className="flex flex-col">
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
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="py-3 flex flex-row space-x-8">
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
                onClick={() => {
                  // transferFunds(payload);
                  showModal();
                }}
              >
                Transfer Funds
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card
        title="Incoming Transactions"
        bordered={false}
        style={{ width: "80%" }}
        className="mx-auto mt-10 shadow-md"
      >
        <Table dataSource={recievedTx}>
          <Column
            title="Sender Email"
            dataIndex="senderEmail"
            key="1"
            className=""
          />
          <Column
            title="Receiver Email"
            dataIndex="receiverEmail"
            key="2"
            className=""
          />
          <Column title="Currency" dataIndex="currency" key="3" className="" />
          <Column title="Amount" dataIndex="amount" key="4" className="" />
        </Table>
      </Card>

      <Card
        title="Outgoing Transactions"
        bordered={false}
        style={{ width: "80%" }}
        className="mx-auto mt-10 shadow-md"
      >
        <Table dataSource={sentTx}>
          <Column
            title="Sender Email"
            dataIndex="senderEmail"
            key="1"
            className=""
          />
          <Column
            title="Receiver Email"
            dataIndex="receiverEmail"
            key="2"
            className=""
          />
          <Column title="Currency" dataIndex="currency" key="3" className="" />
          <Column title="Amount" dataIndex="amount" key="4" className="" />
        </Table>
      </Card>
    </>
  );
}

export default Profile;

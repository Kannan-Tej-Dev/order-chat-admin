
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "../assets/css/Login.css"; // Import the CSS file for styling
import { loginUser } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {loginSuccess,error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogin = async (values) => {
    setLoading(true);

    try {
      console.log("Login credentials:", {
        employeeId: values.employeeId,
        password: values.password,
      });

      // TODO: Dispatch your Redux login thunk here.
      // Example:
      await dispatch(loginUser(values)).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(
    () => {
    if (loginSuccess) {
      // Redirect to the dashboard or home page after successful login
    //   window.location.href = "/dashboard"; // Change this to your desired route

    navigate("/"); // Change this to your desired route
    console.log("Login successful, redirecting to dashboard...");
    }
  },[loginSuccess])
  console.log("dajcadhmcb:", error, loginSuccess);
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          {/* Replace with your actual logo if available */}
          <div className="logo-symbol">✦</div>
          <h1>
            Order<span>Chat</span>
          </h1>
        </div>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          autoComplete="on"
          className="login-form"
        >
          <Form.Item
            label="Employee ID"
            name="employeeId"
            rules={[
              {
                required: true,
                message: "Please enter your Employee ID",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter Employee ID"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter Password"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone />
                ) : (
                  <EyeInvisibleOutlined />
                )
              }
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item className="login-button-item">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="login-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

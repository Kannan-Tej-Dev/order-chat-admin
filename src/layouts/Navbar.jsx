
import { Layout, Button, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/econnectlogo.png";
import logo from "../assets/logo3.png";


const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear Redux authentication state here.
    navigate("/login", { replace: true });
  };

  const profileMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
        onClick: () => navigate("/profile"),
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Sign Out",
        danger: true,
        onClick: handleSignOut,
      },
    ],
  };

  return (
    <Header className="dashboard-navbar">
      <div
        className="brand"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src={logo}
          alt="E Connect logo"
          className="brand-logo"
        />

        <span className="brand-name">
          E<span className="brand-green"> Connect</span>
        </span>
      </div>

      <Dropdown
        menu={profileMenu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button type="text" className="profile-button">
          <Avatar
            icon={<UserOutlined />}
            className="profile-avatar"
          />

          <span className="profile-name">Admin</span>

          <DownOutlined className="profile-chevron" />
        </Button>
      </Dropdown>
    </Header>
  );
}

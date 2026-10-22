import { Layout, Button, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/econnectlogo.png";
import logo from "../assets/logo3.png";
import logoName from "../assets/name2.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    // Clear Redux authentication state here.
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const profileMenu = {
    items: [
      // {
      //   key: "profile",
      //   icon: <UserOutlined />,
      //   label: "Profile",
      //   onClick: () => navigate("/profile"),
      // },
      // {
      //   type: "divider",
      // },
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
      <div className="brand" onClick={() => navigate("/")}>
        <img src={logo} alt="E Connect logo" className="brand-logo" />
        <img src={logoName} alt="E Connect logo" className="brand-logo-name" />
        {/* <span className="brand-name">
          E<span className="brand-green"> Connect</span>
        </span> */}
      </div>

      <Dropdown menu={profileMenu} trigger={["click"]} placement="bottomRight">
        <Button type="text" className="profile-button">
          <Avatar icon={<UserOutlined />} className="profile-avatar" />

          <span className="profile-name">Admin</span>

          <DownOutlined className="profile-chevron" />
        </Button>
      </Dropdown>
    </Header>
  );
}

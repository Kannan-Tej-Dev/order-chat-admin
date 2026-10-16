import {
  Layout,
  Menu,
  
} from "antd";
import {
  DashboardOutlined,
  // ShoppingOutlined,
  // UserOutlined,
  // MessageOutlined,
  // MailOutlined,
} from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
export function Sidebar() {
  // const navigate = useNavigate();

const {  Sider,  } = Layout;

return (
    <>
      <Sider
          width={220}
          breakpoint="lg"
          collapsedWidth="0"
          className="dashboard-sidebar"
        >
          <Menu
            mode="inline"
            selectedKeys={["dashboard"]}
            className="sidebar-menu"
            items={[
              {
                key: "dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
              },
              // {
              //   key: "orders",
              //   icon: <ShoppingOutlined />,
              //   label: "Orders",
              //   onClick: () => navigate("/orders"),
              // },
              // {
              //   key: "users",
              //   icon: <UserOutlined />,
              //   label: "Users",
              //   onClick: () => navigate("/users"),
              // },
              // {
              //   key: "chats",
              //   icon: <MessageOutlined />,
              //   label: "Chats",
              //   onClick: () => navigate("/chats"),
              // },
              // {
              //   key: "messages",
              //   icon: <MailOutlined />,
              //   label: "Messages",
              //   onClick: () => navigate("/messages"),
              // },
            ]}
          />
        </Sider>
    </>
)

}
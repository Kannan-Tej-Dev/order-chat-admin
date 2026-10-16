import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  // Row,
  // Col,
  Table,
  Button,
  Avatar,
  Typography,
  Modal,
  Input,
  Tag,
  Empty,
  Image
} from "antd";

import {
  // UserOutlined,
  // MessageOutlined,
  // MailOutlined,
  SearchOutlined,
  // EyeOutlined,
  CloseOutlined,
  PaperClipOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Users,
  MessagesSquare,
  MessageCircle,
} from "lucide-react";

import "../assets/css/Dashboard.css"; // Import the CSS file for styling
import Navbar from "../layouts/Navbar";
// import { Sidebar } from "../layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getChats, getstats } from "../features/chatSlice";
const { Content } = Layout;
const { Title, Text } = Typography;

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { chats, loading, statsData } = useSelector((state) => state.chats);
  console.log("chats:", chats);
  console.log(statsData, "sjkdhsl");
  const columns = [
    {
      title: "CO Number",
      dataIndex: "coNumber",
      key: "coNumber",
    },
    {
      title: "Number of Users",
      dataIndex: "totalParticipants",
      key: "totalParticipants",
      align: "center",
    },

    {
      title: "Messages",
      dataIndex: "totalMessages",
      key: "totalMessages",
      align: "center",
    },
   
{
  title: "Status",
  dataIndex: "status",
  key: "status",
  align: "center",
  render: (status) => {
    const normalizedStatus = String(status || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return (
      <span className={`orders-status-badge status-${normalizedStatus}`}>
        <span className="orders-status-dot" />
        {status || "Unknown"}
      </span>
    );
  },
},

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        // <Button
        //   type="primary"
        //   icon={<EyeOutlined />}
        //   className="view-button"
        //   onClick={() => setSelectedOrder(record)}
        // >
        //   View
        // </Button>
        <Button
  className="order-view-button"
  onClick={() => setSelectedOrder(record)}
>
  View
</Button>
      ),
    },
  ];

  const stats = [
    {
      title: "Users",
      value: statsData?.totalUsers || 0,
         icon: Users,

     color: "green",
    },
    {
      title: "Chats",
      value: statsData?.totalChats || 0,
     icon: MessagesSquare,
      color: "blue",
    },
    {
      title: "Messages",
      value: statsData?.totalMessages || 0,
       icon: MessageCircle,
      color: "purple",
    },
  ];

  useEffect(() => {
    dispatch(getChats({ page: 1, limit: 10 ,search: searchText}));
    dispatch(getstats());
  }, [dispatch,searchText]);
 
  return (
    <Layout className="dashboard-layout">
      <Navbar />

      <Layout>
        {/* <Sidebar /> */}

        <Content className="dashboard-content">
          <div className="page-heading">
            <Title level={2}>Dashboard</Title>
            <Text type="secondary">Overview of your platform activity</Text>
          </div>
<div className="stats-grid">
  {stats.map((stat) => {
    const Icon = stat.icon;

    return (
      <div
        className={`stats-card stats-${stat.color}`}
        key={stat.title}
      >
        <div className="stats-card-top">
          <div className="stats-icon">
            <Icon size={25} strokeWidth={2} />
          </div>
          <div className="stats-decoration">
            <Icon size={62} strokeWidth={1} />
          </div>
        </div>

        <div className="stats-card-title">
          {stat.title}
        </div>

        <div className="stats-card-value">
          {stat.value}
        </div>
      </div>
    );
  })}
</div>

          <Card className="orders-card" bordered={false}>
            <div className="table-heading">
              <Title level={4}>Orders</Title>

              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by order number..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="order-search"
              />
            </div>

            <Table
             className="orders-table"
              columns={columns}
              dataSource={chats?.items}
              loading={loading}
              pagination={{
                current: chats?.page ?? 1,
                pageSize: chats?.limit ?? 20,
                total: chats?.total ?? 0,
                showSizeChanger: true,
                pageSizeOptions: ["5", "8", "10", "20"],
                showTotal: (total) => `Total ${total} chats`,
                onChange: (page, pageSize) => {
                  dispatch(getChats({ page, limit: pageSize ,search: searchText}));
                },
              }}
              scroll={{ x: 650 }}
              locale={{
                emptyText: <Empty description="No orders found" />,
              }}
              rowKey="key"
            />
          </Card>
        </Content>
      </Layout>

      <Modal
        title={null}
        open={Boolean(selectedOrder)}
        onCancel={() => setSelectedOrder(null)}
        closeIcon={<CloseOutlined />}
        footer={null}
        width={720}
        centered
        destroyOnHidden
        className="whatsapp-modal"
      >
        {selectedOrder && (
          <div className="whatsapp-chat">
            {/* Group header */}
            <div className="whatsapp-header">
              <Avatar
                size={48}
                style={{ backgroundColor: "#128C7E" }}
                icon={<TeamOutlined />}
              />

              <div className="whatsapp-header-info">
                <Title level={5} style={{ margin: 0 }}>
                  {selectedOrder.coNumber ||
                    selectedOrder.customerId ||
                    "Group Chat"}
                </Title>

                <Text type="secondary">
                  {selectedOrder.participants?.length || 0} participants
                  {" · "}
                  {selectedOrder.totalMessages ||
                    selectedOrder.Messages?.length ||
                    0}{" "}
                  messages
                </Text>
              </div>

              <Tag
                color={selectedOrder.status === "open" ? "green" : "default"}
              >
                {selectedOrder.status || "Chat"}
              </Tag>
            </div>

            {/* Group participant list */}
            <div className="whatsapp-participants">
              <Text type="secondary">Participants</Text>

              <div className="whatsapp-participant-list">
                {(selectedOrder.participants || []).map(
                  (participant, index) => {
                    const user = participant.userId;

                    const name =
                      typeof user === "object"
                        ? user?.name || user?.employeeId || "User"
                        : participant.name || "User";

                    return (
                      <Tag color="green" key={user?._id || user || index}>
                        {name}
                      </Tag>
                    );
                  },
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="whatsapp-messages">
              {(selectedOrder.Messages || selectedOrder.messages || [])
                .length === 0 ? (
                <Empty description="No messages found" />
              ) : (
                (selectedOrder.Messages || selectedOrder.messages || []).map(
                  (message, index) => {
                    const sender =
                      typeof message.senderId === "object"
                        ? message.senderId
                        : null;

                    const senderName =
                      sender?.name || sender?.employeeId || "Unknown user";

                    const messageTime = message.createdAt
                      ? new Date(message.createdAt).toLocaleString([], {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "";

                    const reply = message.replyTo;

                    return (
                      <div
                        className="whatsapp-message-row"
                        key={message._id || index}
                      >
                        <Avatar
                          size={32}
                          style={{
                            backgroundColor: "#128C7E",
                            flexShrink: 0,
                          }}
                        >
                          {senderName.charAt(0).toUpperCase()}
                        </Avatar>

                        <div className="whatsapp-bubble">
                          <Text className="whatsapp-sender">{senderName}</Text>

                          {/* Reply preview */}
                          {reply && (
                            <div className="whatsapp-reply">
                              <Text strong>
                                {typeof reply.senderId === "object"
                                  ? reply.senderId?.name || "Reply"
                                  : "Reply"}
                              </Text>

                              <div className="whatsapp-reply-content">
                                {reply.content || "Attachment"}
                              </div>
                            </div>
                          )}

                          {/* Message text */}
                          {message.content && (
                            <div className="whatsapp-message-text">
                              {message.content}
                            </div>
                          )}

                          {/* Attachments */}
                          {message.attachments?.map(
                            (attachment, attachmentIndex) => {
                              if (
                                typeof attachment !== "object" ||
                                !attachment.url
                              ) {
                                return null;
                              }

                              const attachmentUrl = attachment.url;

                              const imageUrl = attachmentUrl.startsWith("http")
                                ? attachmentUrl
                                : `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/${attachmentUrl.replace(/^\//, "")}`;

                              const isImage =
                                attachment.mimeType?.startsWith("image/") ||
                                message.messageType === "image";

                              return (
                                <div key={attachment._id || attachmentIndex}>
                                  {isImage ? (
                                    <Image
                                      src={imageUrl}
                                      alt="Message attachment"
                                      className="whatsapp-attachment"
                                      style={{
                                        maxWidth: 260,
                                        maxHeight: 260,
                                        objectFit: "contain",
                                        borderRadius: 8,
                                      }}
                                      fallback="/image-fallback.png"
                                    />
                                  ) : (
                                    <a
                                      href={imageUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <PaperClipOutlined /> View attachment
                                    </a>
                                  )}
                                </div>
                              );
                            },
                          )}

                          <div className="whatsapp-message-time">
                            {message.isDeleted
                              ? "This message was deleted"
                              : messageTime}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )
              )}
            </div>

            {/* Close button */}
            <div className="whatsapp-footer">
              <Button type="primary" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}

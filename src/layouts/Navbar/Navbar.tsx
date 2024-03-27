import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import { UserOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";

import "./navbar.css";

const items: MenuProps["items"] = [
    {
        key: "1",
        label: <Link to={"/profile"}>Profile</Link>,
        icon: <SmileOutlined />,
    },
    {
        key: "2",
        danger: true,
        label: <Link to={"/login"}>Login</Link>,
        onClick: () => {
            localStorage.clear();
        },
    },
];

const Navbar = () => {
    // const user = useSelector((state) => state.auth.user);

    return (
        <div className="navbar">
            <Link to={"/"} className="navbar__profile">
                <Avatar size={64} icon={<UserOutlined />} />
            </Link>

            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <h2>Hello, {localStorage.getItem("userName")}</h2>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>

            {/* {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Description: {user.description}</p>
                    <p>Country: {user.region}</p>
                    <p>City: {user.state}</p>

                </div>
            )} */}
        </div>
    );
};

export default Navbar;

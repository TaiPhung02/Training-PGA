import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import { UserOutlined, DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd";

import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IUserProfile } from "../../interfaces/user-interface";
import { logout } from "../../redux/auth/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const user: IUserProfile = useSelector(
        (state: RootState) => state.auth.user
    );

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Link style={{ fontSize: "16px" }} to={"/profile"}>
                    Profile
                </Link>
            ),
            icon: <SmileOutlined />,
        },
        {
            key: "2",
            danger: true,
            label: <Link to={"/login"}>Logout</Link>,
            onClick: () => {
                localStorage.clear();
                dispatch(logout());
            },
        },
    ];

    return (
        <div className="navbar">
            <Link to={"/"} className="navbar__profile">
                <Avatar size={64} icon={<UserOutlined />} />
            </Link>

            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {/* <h2>Hello, {localStorage.getItem("name")}</h2> */}
                        {/* <h2>Hello, {user.name}</h2> */}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default Navbar;

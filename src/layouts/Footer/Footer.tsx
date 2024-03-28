import React from "react";
import { FloatButton, QRCode, Space } from "antd";

import "./footer.css";

const Footer = () => {
    return (
        <>
            <FloatButton.Group shape="circle">
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
            <Space>
                <QRCode type="svg" value="https://github.com/TaiPhung02" />
            </Space>
        </>
    );
};

export default Footer;

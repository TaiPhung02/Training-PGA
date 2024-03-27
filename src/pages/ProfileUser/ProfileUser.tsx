import React, { useEffect, useState } from "react";

import { Modal } from "antd";

import { userApi } from "../../services/user-services";

import "./profileUser.css";

const ProfileUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState([]);

    const fetchData = async () => {
        try {
            const response = await userApi();
            console.log(response.data);
            setUserProfile(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profileUser">
            <div className="profileUser__row">
                <div className="profileUser__image">
                    <img
                        onClick={showModal}
                        src={`http://api.training.div3.pgtest.co/${userProfile?.avatar}`}
                        alt="Avatar"
                    />
                    <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <div className="profileUsercontent">
                    <h1 className="profileUse__name">
                        <span>Username: </span>
                        {userProfile?.name}
                    </h1>
                    <p className="profileUser__email">
                        <span>Email: </span>
                        {userProfile?.email}
                    </p>
                    <p className="profileUser__gender">
                        <span>Gender: </span>
                        {userProfile?.gender}
                    </p>
                    <p className="profileUser__desc">
                        <span>Description: </span>
                        {userProfile?.description
                            ? "userProfile?.description"
                            : "No bio yet"}
                    </p>
                    <p className="profileUser__region">
                        <span>Region: </span>
                        {userProfile?.region}
                    </p>
                    <p className="profileUser__state">
                        <span>State: </span>
                        {userProfile?.state}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;

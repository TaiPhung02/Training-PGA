import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { addProductValidation } from "../../utils/validate-utils";

import { toast } from "react-toastify";

import { addProductApi } from "../../services/user-services";

import "./addNewProduct.css";

const initialValues = {
    status: "STATUS",
    currency: "",
    fundingMethod: "",
    total: "",
    order: "",
    client: "",
    invoice: "",
};

const AddNewProduct = ({ fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: addProductValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleSelectChange = (value: string) => {
        formik.setFieldValue("status", value);
    };

    const handleOk = async () => {
        const res = await addProductApi(
            formik.values.status,
            formik.values.currency,
            formik.values.fundingMethod,
            formik.values.total,
            formik.values.order,
            formik.values.client,
            formik.values.invoice
        );

        if (res && res.code === 200) {
            formik.handleSubmit();
            setIsModalOpen(false);
            fetchData();
            toast.success("A Product is created succeed!");

            formik.resetForm();
        } else {
            toast.error("An error occurred, please try again later");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        formik.resetForm();
    };

    return (
        <>
            <Button
                style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                onClick={showModal}
            >
                <span>Add New Product</span>
                <PlusOutlined />
            </Button>
            <Modal
                title="Add New Product "
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form.Item label="Status">
                    <Select
                        value={formik.values.status}
                        onChange={handleSelectChange}
                        onBlur={formik.handleBlur}
                    >
                        <Select.Option value="PROCESSING">
                            PROCESSING
                        </Select.Option>
                        <Select.Option value="FULFILLED">
                            FULFILLED
                        </Select.Option>
                        <Select.Option value="RECEIVED">RECEIVED</Select.Option>
                        <Select.Option value="PENDING">PENDING</Select.Option>
                    </Select>
                </Form.Item>
                {formik.touched.status && formik.errors.status && (
                    <p className="add-product__message-error">
                        {formik.errors.status}
                    </p>
                )}

                {/* <Form.Item label="Date">
                    <DatePicker />
                </Form.Item> */}

                <Form.Item label="Currency">
                    <Input
                        name="currency"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.currency && formik.errors.currency && (
                    <p className="add-product__message-error">
                        {formik.errors.currency}
                    </p>
                )}
                <Form.Item label="FundingMethod">
                    <Input
                        name="fundingMethod"
                        value={formik.values.fundingMethod}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.fundingMethod &&
                    formik.errors.fundingMethod && (
                        <p className="add-product__message-error">
                            {formik.errors.fundingMethod}
                        </p>
                    )}
                <Form.Item label="Total">
                    <Input
                        name="total"
                        value={formik.values.total}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.total && formik.errors.total && (
                    <p className="add-product__message-error">
                        {formik.errors.total}
                    </p>
                )}
                <Form.Item label="Order">
                    <Input
                        name="order"
                        value={formik.values.order}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.order && formik.errors.order && (
                    <p className="add-product__message-error">
                        {formik.errors.order}
                    </p>
                )}
                <Form.Item label="Client">
                    <Input
                        name="client"
                        value={formik.values.client}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.client && formik.errors.client && (
                    <p className="add-product__message-error">
                        {formik.errors.client}
                    </p>
                )}

                <Form.Item label="Invoice #">
                    <Input
                        name="invoice"
                        value={formik.values.invoice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Item>
                {formik.touched.invoice && formik.errors.invoice && (
                    <p className="add-product__message-error">
                        {formik.errors.invoice}
                    </p>
                )}
            </Modal>
        </>
    );
};

export default AddNewProduct;

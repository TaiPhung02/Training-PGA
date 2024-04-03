import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import { useFormik } from "formik";
import { editProductValidation } from "../../utils/validate-utils";

import { editProductApi } from "../../services/user-services";

import "./editProduct.css";
import { IKeyProduct } from "../../interfaces/table-interface";

const initialValues = {
    status: "",
    currency: "",
    fundingMethod: "",
    total: 0,
    order: "",
    client: "",
    invoice: "",
};

interface Props {
    record: IKeyProduct;
    fetchData: () => void;
}

const EditProduct = ({ record, fetchData }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecordLoaded, setIsRecordLoaded] = useState(false);
    const [initialRecordValues, setInitialRecordValues] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
    };

    console.log(record);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: editProductValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleSelectChange = (value: string) => {
        formik.setFieldValue("status", value);
    };

    const loadRecordData = () => {
        if (record && !isRecordLoaded) {
            formik.setValues({
                ...formik.values,
                status: record.status,
                currency: record.currency,
                fundingMethod: record.fundingMethod,
                total: record.total,
                order: record.order,
                client: record.client,
                invoice: record.invoice,
            });
            setInitialRecordValues({ ...record });
            setIsRecordLoaded(true);
        }
    };

    useEffect(() => {
        loadRecordData();
    }, [record, isRecordLoaded]);

    const handleEditProduct = () => {
        record.status = formik.values.status;
        record.currency = formik.values.currency;
        record.fundingMethod = formik.values.fundingMethod;
        record.total = formik.values.total;
        record.order = formik.values.order;
        record.client = formik.values.client;
        record.invoice = formik.values.invoice;
    };

    const handleOk = async () => {
        handleEditProduct();

        try {
            const res = await editProductApi({
                id: record.id,
                status: record.status,
                currency: record.currency,
                fundingMethod: record.fundingMethod,
                total: record.total,
                order: record.order,
                client: record.client,
                invoice: record.invoice,
            });

            if (res && res.code === 200) {
                formik.handleSubmit();
                setIsModalOpen(false);
                fetchData();
                toast.success("A Product is updated successfully!");
            } else {
                formik.setValues(initialRecordValues);
                toast.error("An error occurred, please try again later 1");
            }
        } catch (error) {
            console.error("Error editing product:", error);
            toast.error("An error occurred, please try again later 2");
        }

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        formik.setValues(initialRecordValues);
    };

    return (
        <>
            <Button
                style={{ backgroundColor: "#FFC107", color: "#fff" }}
                onClick={showModal}
            >
                <span>Edit</span>
                <EditOutlined />
            </Button>
            <Modal
                title="Edit Product "
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form.Item label="Status">
                    <Select
                        value={formik.values.status}
                        onChange={handleSelectChange}
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

export default EditProduct;

import React, { useEffect, useState } from "react";

import { Space, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Select, DatePicker, Input, Skeleton } from "antd";

import { getProductApi, deleteProductApi } from "../../services/user-services";

import { toast } from "react-toastify";
import { debounce } from "lodash";

import AddNewProduct from "../../pages/AddNewProduct/AddNewProduct";
import EditProduct from "../../pages/EditProduct/EditProduct";
import "./tableForm.css";
import {
    IFilterParams,
    IKeyProduct,
    IDataType,
} from "../../interfaces/table-interface";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;

const TableForm = () => {
    const [products, setProducts] = useState<IKeyProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const fetchData = async () => {
        try {
            const response = await getProductApi();
            const productsWithKeys = response.data.map(
                (product: IKeyProduct) => ({
                    ...product,
                    key: product.id,
                })
            );
            setProducts(productsWithKeys);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApply = () => {
        console.log("Applied filters");
    };

    const handleClear = () => {
        window.history.pushState({}, "", window.location.pathname);

        toast.success("Cleared filters");
        fetchData();
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProductApi(productId);
            setProducts(
                products.filter((product) => product.key !== productId)
            );
            toast.success(`Product with id ${productId} deleted successfully.`);
        } catch (error) {
            console.error(
                `Error deleting product with id ${productId}:`,
                error
            );
        }
    };

    const handleSearchInvoice = debounce((e) => {
        const term = e.target.value.trim();

        if (term) {
            console.log(term);
            setProducts(products.filter((item) => item.invoice.includes(term)));
        } else {
            fetchData();
        }
    }, 300);

    const handleSearchStatus = async (value: string) => {
        if (value === "all") {
            try {
                fetchData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            setProducts(
                products.filter(
                    (item) => item.status.toUpperCase() === value.toUpperCase()
                )
            );
        }
        updateURL({ status: value });
    };

    const updateURL = (searchParams: IFilterParams) => {
        const queryParams = new URLSearchParams(window.location.search);
        for (const [key, value] of Object.entries(searchParams)) {
            queryParams.set(key, value);
        }
        const newURL = `${window.location.pathname}${
            queryParams.toString() ? "?" + queryParams.toString() : ""
        }`;
        window.history.pushState({}, "", newURL);
    };

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const statusParam = urlSearchParams.get("status");

        if (statusParam) {
            handleSearchStatus(statusParam);
        }
    }, []);

    return (
        <>
            <div className="tableForm__filter">
                <Select
                    id="status-select"
                    defaultValue="Status"
                    className="tableForm__filter-select"
                    onChange={handleSearchStatus}
                >
                    <Option value="processing">PROCESSING</Option>
                    <Option value="fulfilled">FULFILLED</Option>
                    <Option value="pending">PENDING</Option>
                    <Option value="received">RECEIVED</Option>
                    <Option value="all">ALL</Option>
                </Select>
                <Select
                    defaultValue="Client"
                    className="tableForm__filter-select"
                >
                    <Option value="yopmail">Yopmail</Option>
                    <Option value="powergate">Powergate</Option>
                </Select>
                <RangePicker className="tableForm__filter-date" />

                <Input
                    id="invoice-input"
                    placeholder="Invoice #"
                    className="tableForm__filter-input"
                    onChange={handleSearchInvoice}
                />

                <div className="tableForm__filter-cta">
                    <Button
                        type="primary"
                        className="filter-cta__apply"
                        onClick={handleApply}
                    >
                        Apply
                    </Button>
                    <Button className="filter-cta__clear" onClick={handleClear}>
                        Clear
                    </Button>

                    <AddNewProduct fetchData={fetchData}></AddNewProduct>
                </div>
            </div>

            <Skeleton loading={loading} active paragraph={{ rows: 20 }} />
            {!loading && (
                <div>
                    <h1>List Product</h1>
                    <Table dataSource={products}>
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={(status: string) => {
                                let color;
                                if (status === "PROCESSING") {
                                    color = "orange";
                                }
                                if (status === "FULFILLED") {
                                    color = "green";
                                }
                                if (status === "PENDING") {
                                    color = "grey";
                                }
                                if (status === "RECEIVED") {
                                    color = "blue";
                                }

                                return (
                                    <Tag color={color} key={status}>
                                        {status.toUpperCase()}
                                    </Tag>
                                );
                            }}
                        />

                        <Column
                            title="Date"
                            dataIndex="createdAt"
                            key="createdAt"
                        />
                        <Column
                            title="Client"
                            dataIndex="client"
                            key="client"
                        />
                        <Column
                            title="Currency"
                            dataIndex="currency"
                            key="currency"
                        />
                        <Column
                            title="Total"
                            dataIndex="total"
                            key="total"
                            render={(total: number) => (
                                <p>
                                    {Number(total).toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            )}
                            sortOrder="descend"
                        />
                        <Column
                            title="Invoice #"
                            dataIndex="invoice"
                            key="invoice"
                        />

                        <Column
                            title="Action"
                            key="action"
                            render={(record: IDataType) => (
                                <Space size="middle">
                                    <Button
                                        style={{
                                            backgroundColor: "#2196F3",
                                            color: "#fff",
                                        }}
                                        type="primary"
                                    >
                                        View Detail
                                    </Button>

                                    <EditProduct
                                        record={record as IKeyProduct}
                                        fetchData={fetchData as () => void}
                                    ></EditProduct>

                                    <Button
                                        style={{
                                            backgroundColor: "#F44336",
                                            color: "#fff",
                                        }}
                                        danger
                                        shape="round"
                                        onClick={() =>
                                            handleDeleteProduct(record.key)
                                        }
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            )}
        </>
    );
};

export default TableForm;

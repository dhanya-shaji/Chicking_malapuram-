import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios";
import {
    Table,
    Button, Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

import './Orders.css'
import { data } from 'jquery';
const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState([])
    const [loading, setloading] = useState(true)
    const [itemsModel, setModal] = useState(false);
    const [confirmModel, setConfirmModel] = useState(false);
    const [dataItem, setDataItem] = useState([])
    const toggleItems = (data) => {
        console.log("toggleItems -> data", data)
        setDataItem(data);
        setModal(!itemsModel);
    }

    const onClickConfirm = (data) => {
        setloading(true);
        const access = sessionStorage.getItem('access');
        // setConfirmModel(!confirmModel);
        let url = `http://api.chicking-malappuram.in/api/orders/${data.id}/`;
        axios({
            method: 'patch',
            url: url,
            data: { "status": "confirmed" },
            headers: { 'Authorization': `Bearer ${access}` }
        }).then(res => {
            console.log("onClickConfirm -> res", res)
            if (res.data === 'success') {
                getOrderList();
            }
            setloading(false);
        });

    }


    const getOrderList = () => {
        const access = sessionStorage.getItem('access');
        axios({
            method: 'get',
            url: 'http://api.chicking-malappuram.in/api/orders/',
            headers: { 'Authorization': `Bearer ${access}` }
        }).then((res) => {
            console.log("res", res)
            setOrderDetails(res.data);
            setloading(false)

        });
    }
    useEffect(() => {

        getOrderList();

    }, []);


    return (
        <Fragment>
            <div className="content">
                <Row>
                    <Col lg="12">
                        <div className="card chicking-card">

                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Customer NAME</th>
                                        <th>Contact No</th>
                                        <th>Address</th>
                                        <th>Outlet</th>
                                        <th>Order Type</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? 'Loading...' : ''}
                                    {orderDetails && orderDetails.length > 0 &&
                                        orderDetails.map((data, index) =>
                                            <tr>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.number}</td>
                                                <td>{data.address}</td>
                                                <td>{data.outlet}</td>
                                                <td>{data.order_type}</td>
                                                <td><p className="total">{`Rs. ${data.total}`}</p></td>
                                                <td>{data.status}</td>
                                                <td> {data.status==='pending'?<Button color="primary" onClick={() => onClickConfirm(data)}>Confirm</Button>:''}</td>
                                                <td><Button color="danger" onClick={() => toggleItems(data)}>View Items</Button></td>
                                            </tr>
                                        )}

                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* confirm modal */}
            {/* <Modal isOpen={confirmModel} toggle={toggleConfirm}>
                <ModalHeader toggle={toggleConfirm}>View Order Items</ModalHeader>
                <ModalBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataItem && dataItem.length > 0 &&
                                dataItem.map((data, index) =>
                                    <tr>
                                        <td>{data.item}</td>
                                        <td>{data.qty}</td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                </ModalBody>


            </Modal> */}


            {/* items Model */}
            <Modal isOpen={itemsModel} toggle={toggleItems}>
                <ModalHeader toggle={toggleItems}>View Order Items</ModalHeader>
                <ModalBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataItem.items && dataItem.items.length > 0 &&
                                dataItem.items.map((data, index) =>
                                    <tr>
                                        <td>{data.item}</td>
                                        <td>{data.qty}</td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                    <div className="address-box">
                    <h4>Customer Address:</h4>
                        <h6>{dataItem.address}</h6>
                    </div>
                </ModalBody>


            </Modal>
        </Fragment>
    )
}


export default OrderDetails

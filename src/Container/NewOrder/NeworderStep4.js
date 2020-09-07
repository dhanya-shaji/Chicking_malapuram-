import React, { useState } from 'react';
// reactstrap components
import {
    Card, CardHeader, CardBody, CardTitle, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Form,
    FormGroup, Label, Input, FormText
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const NeworderStep4 = (props) => {
    const { prevStep, onConfirm } = props;
    const back = (e) => {
        e.preventDefault();
        prevStep();
    }
    const confirmOrder = (e) => {
        e.preventDefault();
        onConfirm();

    }
    const total = props.cartItems.reduce((prevValue, currentValue) => prevValue + currentValue.total, 0);
    

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="demo-icons">
                            <CardHeader>
                                <Row>
                                    <Col lg="8">
                                        <CardTitle tag="h5">Step 4: Summary</CardTitle>
                                    </Col>
                                    <Col lg="4">
                                        <a className="btn pull-right btn-success" style={{ color: "white" }} onClick={confirmOrder}>CONFIRM</a>
                                        <a onClick={back} className="btn pull-left btn-warning" style={{ color: "white" }}>GO BACK</a>
                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                                <h6>Name: {props.name}</h6>
                                <br></br>
                                <h6>Contact Number: {props.number}</h6>
                                <br></br>
                                <h6>Address:</h6>
                                <p> {props.address}</p>
                                <br />
                                <h6>Order Details:</h6>
                                <table className="table-striped table">
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    {props.cartItems && props.cartItems.length > 0 &&
                                        props.cartItems.map((data, index) =>
                                            <tr>
                                                <td>{data.itemName}</td>
                                                <td>{data.qty}</td>
                                                <td>{`Rs. ${data.price}`}</td>
                                                <td>{`Rs. ${(data.qty * data.price)}`}</td>
                                            </tr>
                                        )}


                                    <tr>
                                        <th colSpan="2">Total</th>
                                        <th></th>
                                        
                                        <th>{`Rs. ${total}`}</th>
                                    </tr>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default NeworderStep4;

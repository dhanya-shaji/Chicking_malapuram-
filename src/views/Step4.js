/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from 'react';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

class Step2 extends React.Component {
    render() {

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
                                            <a className="btn pull-right btn-success" style={{color:"white"}}>CONFIRM</a>
                                            <a className="btn pull-left btn-warning" style={{color:"white"}}>GO BACK</a>
                                        </Col>
                                    </Row>

                                </CardHeader>
                                <CardBody>
                                    <h6>Name:  Arun Laxman</h6>
                                    <br></br>
                                    <h6>Contact Number:  97XXXXXX</h6>
                                    <br></br>
                                    <h6>Address:</h6>
                                    <p>Vadakkan House<br></br>
                                        Tirur Town<br></br>
                                        Opposite Maruti Showroom</p>
                                    <br></br>
                                    <h6>Order Details:</h6>
                                    <table className="table-striped table">
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        <tr>
                                            <td>Mexican delight burger</td>
                                            <td>2</td>
                                            <td>178</td>
                                        </tr>
                                        <tr>
                                            <td>Bucket Fried Chickenn</td>
                                            <td>2</td>
                                            <td>699</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="2">Total</th>
                                            <th>2500</th>
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
}

export default Step2;

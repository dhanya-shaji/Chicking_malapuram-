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


class Step2 extends React.Component {
    render() {

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card className="demo-icons">
                                <CardHeader>
                                    <CardTitle tag="h5">Step 2: Item Details</CardTitle>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <div style={{ maxWidth: 600, margin: "0 auto" }}>
                                        <Row>
                                            <Col lg="4">
                                                <FormControl style={{width: "100%"}}>
                                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    >
                                                        <MenuItem value={10}>BURGERS-Individual</MenuItem>
                                                        <MenuItem value={20}>BURGERS-Combo</MenuItem>
                                                        <MenuItem value={30}>VEGGIE ZONE</MenuItem>
                                                        <MenuItem value={30}>INDVIDUAL MEALS</MenuItem>
                                                        <MenuItem value={30}>FAMILY MEALS</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col lg="4">
                                            <FormControl style={{width: "100%"}}>
                                                    <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    >
                                                        <MenuItem value={10}>Delite Burger</MenuItem>
                                                        <MenuItem value={20}>Rapid Booster</MenuItem>
                                                        <MenuItem value={30}>ROYAL CRUNCHY</MenuItem>
                                                        <MenuItem value={30}>TANDOORI BURGER</MenuItem>
                                                        <MenuItem value={30}>Mexitta Supreme</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col lg="2">
                                             <span style={{marginTop:25, display: "block", fontWeight: "bold"}}> 79.00</span>  
                                            </Col>
                                            <Col lg="2">
                                                <i className="fa fa-trash" style={{marginTop:25, display: "block", fontWeight: "bold", color:"red"}}></i>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormControl style={{width: "100%"}}>
                                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    >
                                                        <MenuItem value={10}>BURGERS-Individual</MenuItem>
                                                        <MenuItem value={20}>BURGERS-Combo</MenuItem>
                                                        <MenuItem value={30}>VEGGIE ZONE</MenuItem>
                                                        <MenuItem value={30}>INDVIDUAL MEALS</MenuItem>
                                                        <MenuItem value={30}>FAMILY MEALS</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col lg="4">
                                            <FormControl style={{width: "100%"}}>
                                                    <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    >
                                                        <MenuItem value={10}>Delite Burger</MenuItem>
                                                        <MenuItem value={20}>Rapid Booster</MenuItem>
                                                        <MenuItem value={30}>ROYAL CRUNCHY</MenuItem>
                                                        <MenuItem value={30}>TANDOORI BURGER</MenuItem>
                                                        <MenuItem value={30}>Mexitta Supreme</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                            <Col lg="2">
                                             <span style={{marginTop:25, display: "block", fontWeight: "bold"}}> 129.00</span>  
                                            </Col>
                                            <Col lg="2">
                                                <i className="fa fa-trash" style={{marginTop:25, display: "block", fontWeight: "bold", color:"red"}}></i>
                                            </Col>
                                        </Row>
                                        <i style={{fontSize: 37, margin: "15px auto", display: "block", width: 50,textAlign: "center", color: "#272796"}} className="fas fa-plus-circle"></i>
                                        <a className="btn btn-chick">Next</a>
                                    </div>
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

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
                                    <CardTitle tag="h5">Step 3: Delivery Details</CardTitle>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <div style={{ maxWidth: 600, margin: "0 auto" }}>
                                        <Row>
                                            <Col lg="8">
                                                <FormControl style={{ width: "100%" }}>
                                                    <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                    >
                                                        <MenuItem value={10}>Delivery</MenuItem>
                                                        <MenuItem value={20}>Come and Collect</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Col>

                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col lg="8">
                                                    <TextField style={{width:"100%"}}
                                                        id="outlined-multiline-static"
                                                        label="Address"
                                                        multiline
                                                        rows={7}
                                                        variant="outlined"
                                                    />
                                            </Col>

                                        </Row>
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

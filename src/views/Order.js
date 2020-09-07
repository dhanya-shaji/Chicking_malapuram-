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
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Order extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card className="demo-icons">
                                <CardHeader>
                                    <CardTitle tag="h5">Step 1: Name and Contact Number</CardTitle>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <div style={{maxWidth: 600, margin: "0 auto"}}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Contact Number</Label>
                                        <Input type="text" name="number" id="exampleEmail" placeholder="Contact Number" />
                                        <br></br>
                                        <Label for="exampleEmail">Name</Label>
                                        <Input type="text" name="number" id="exampleEmail" placeholder="Name" />
                                        <a className="btn btn-chick">Next</a>
                                    </FormGroup>
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

export default Order;

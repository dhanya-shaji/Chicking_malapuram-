import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row, Col, Form, FormGroup, Button,
    Label, Input, FormText
} from "reactstrap";

const NewordeStep1 = (props) => {
    const { nextStep,changeText } = props;
    const next = (e) => {
        e.preventDefault();
        nextStep();
    }
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
                                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Contact Number</Label>
                                        <Input type="text"  value={props.number} name="customerNumber" onChange={changeText} id="exampleEmail" placeholder="Contact Number" />
                                        <br></br>
                                        <Label for="exampleEmail">Name</Label>
                                        <Input type="text" name="customerName" value={props.name} onChange={changeText} id="exampleEmail" placeholder="Name" />
                                        <Button className="btn btn-chick pull-right" onClick={next}>Next</Button>
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

export default NewordeStep1;

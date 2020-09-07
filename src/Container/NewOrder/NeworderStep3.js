import React, { useState, useCallback, useEffect, Fragment } from 'react';
// reactstrap components
import {
    Card, CardHeader, CardBody, CardTitle,
    Dropdown, DropdownToggle, DropdownMenu, Button,
    DropdownItem, Row, Col, Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import axios from "axios";


const NeworderStep3 = (props) => {
    const { nextStep, prevStep } = props;
    const [orderType, setOrderType] = useState({ value: "0", label: "Select Delivery Type" });
    const [outlet, setOutlet] = useState({ value: "0", label: "Select Outlet" });

    const [outletList, setOutletList] = useState([]);
    useEffect(() => {
        const access = sessionStorage.getItem('access');
        axios({
            method: 'get',
            url: 'http://api.chicking-malappuram.in/api/outlets/',
            headers: { 'Authorization': `Bearer ${access}` }
        }).then((res) => {
            console.log("res", res)
            setOutletList(res.data);

        });
    }, [])
    const next = (e) => {
        e.preventDefault();
        nextStep();
    }
    const back = (e) => {
        e.preventDefault();
        prevStep();
    }
    const handelChangeSelect = (e) => {
        localStorage.setItem("orderType", [e.value]);
        setOrderType({ value: e.value, label: e.label });


    }
    const handelChangeOutlet=(e)=>{
        localStorage.setItem("outlet", [e.value]);
        setOutlet({ value: e.value, label: e.label })
    }
    const optionOrderType = [
        { value: "0", label: "Select Delivery Type" },
        { value: "delivery", label: "Delivery" },
        { value: "self_collect", label: "Come and Collect" }
    ];
    let optionOutletList=[];
    outletList&&outletList.length>0&&
    outletList.map((data)=>{
        let newList={value:data.id,label:data.location};
        optionOutletList.push(newList);
    })



    return (
        <Fragment>
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
                                        <Col lg="12">
                                            <FormControl style={{ width: "100%" }}>
                                                <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                                                <Select

                                                    value={orderType}
                                                    onChange={e => handelChangeSelect(e)}
                                                    options={optionOrderType}
                                                />
                                                 <br></br>
                                                <Select

                                                    value={outlet}
                                                    onChange={e => handelChangeOutlet(e)}
                                                    options={optionOutletList}
                                                />
                                                {/* <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="orderType"
                                                    onChange={props.changeText}
                                                    value={props.orderType}
                                                >
                                                    <MenuItem value={0}>Select Delivery Type</MenuItem>
                                                    <MenuItem value="delivery">Delivery</MenuItem>
                                                    <MenuItem value="self_collect">Come and Collect</MenuItem>
                                                </Select> */}
                                            </FormControl>
                                        </Col>

                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col lg="12">
                                            <TextField style={{ width: "100%" }}
                                                id="outlined-multiline-static"
                                                label=""
                                                multiline
                                                rows={7}
                                                value={props.address}
                                                onChange={props.changeText}
                                                name="customerAddress"
                                                variant="outlined"
                                            />
                                        </Col>

                                    </Row>
                                    <div style={{ display: "inline", justifyContent: 'space-between', }}>
                                        <Button
                                            style={{ display: "inline", width: '120px', justifyContent: 'space-between' }}
                                            primary={false}
                                            onClick={back}
                                            className="btn btn-chick">Back</Button>
                                        <Button style={{ display: "inline", width: '120px', justifyContent: 'space-between' }}
                                            className="btn btn-chick pull-right"
                                            onClick={next}
                                            primary={true}>Next</Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}


export default NeworderStep3;

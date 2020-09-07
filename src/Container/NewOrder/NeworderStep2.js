import React, { useState, Fragment, useEffect } from 'react';
// reactstrap components
import {
    Card, CardHeader, CardBody,
    CardTitle, Row, Col, Button,
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { get } from 'js-cookie';

function NeworderStep2(props) {
    const { nextStep, prevStep, cartItems } = props;
    let defaultItems = [{
        category: '',
        item: "",
        itemName: '',
        price: '',
        qty: '',
        total: ''

    }];
    let defaultCartValue = cartItems && cartItems.length > 0 ? cartItems : defaultItems;
    console.log("defaultCartValue", defaultCartValue)

    const [count, setCount] = useState(0) // Name it however you wish
    const next = (e) => {
        e.preventDefault();
        console.log("vales", values);
        localStorage.setItem("cartItems", JSON.stringify(values));
        nextStep();
    }
    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    const [categories, setCategories] = useState([]);

    const [categoryStatus, setCategoryStatus] = useState('idle');
    const [items, setItems] = useState([]);
    const [itemsStatus, setItemsStatus] = useState('idle');
    const [filterItem, setFilterItem] = useState([])
    const [values, setValues] = useState(defaultCartValue)
    

    useEffect(() => {
        const access = sessionStorage.getItem('access');
        async function getCategory(token) {
            const res = await fetch("http://api.chicking-malappuram.in/api/category/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + ' ' + token,
                },
            });
            const data = await res.json();
            setCategories(data);
            setCategoryStatus('success');
        }

        async function getItems(token) {
            const res = await fetch("http://api.chicking-malappuram.in/api/items/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + ' ' + token,
                },
            });
            const data = await res.json();

            setItems(data);
            console.log("getItems -> data", data)
            setItemsStatus('success');
        }
        getCategory(access);
        getItems(access);
    }, [])

    const handelChangeItems = (e) => {
       
    }
    let optionItems = [];
    items && items.length > 0 &&
        items.map((data) => {
            let newList = { value: data.id, label: data.name };
            optionItems.push(newList);
        })

    return (
        <Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="demo-icons">
                            <CardHeader>
                                <CardTitle tag="h5">Step 2: Item Details</CardTitle>
                            </CardHeader>
                            <CardBody className="all-icons">
                                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                                    {values.map((value, index) => (<Row key={index + value.category}>
                                        <Col lg="4" >
                                            <FormControl style={{ width: "100%" }}>
                                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={value.category}
                                                    onChange={e => {
                                                        let newVal = { ...value, category: e.target.value };
                                                        let vals = [...values];
                                                        console.log("e.target.value", e.target.value)
                                                        vals[index] = newVal;
                                                        let itemFilter = items.filter(item => item.category.id === vals[index].category);
                                                        console.log("vals[index].category", vals[index].category)
                                                        console.log("itemFilter", itemFilter)
                                                        setFilterItem(itemFilter);
                                                        setValues(vals);

                                                        console.log('here', vals)
                                                    }}
                                                >
                                                    {categories.map(cat => {
                                                        return (<MenuItem value={cat.id}>{cat.name}</MenuItem>)
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Col>
                                        <Col lg="3">
                                            <FormControl style={{ width: "100%" }}>
                                                <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                               
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={value.item}
                                                    onChange={e => {
                                                        let price = items.find(item => item.id === e.target.value).price;
                                                        let itemName = items.find(item => item.id === e.target.value).name;


                                                        let newVal = { ...value, item: e.target.value, itemName, price };
                                                        let vals = [...values];
                                                        vals[index] = newVal;

                                                        setValues(vals);
                                                    }}
                                                >
                                                    {items.map(item => (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Col>

                                        <Col lg="2">
                                            <Input style={{ marginTop: 18 }} onChange={e => {
                                                let newVal = { ...value, qty: e.target.value, total: (e.target.value * value.price) };
                                                let vals = [...values];
                                                vals[index] = newVal;
                                                setValues(vals);

                                            }} placeholder="Qty" value={value.qty}></Input>
                                        </Col>
                                        <Col lg="2">
                                            <span style={{ marginTop: 25, display: "block", fontWeight: "bold" }}>{value.price}</span>
                                        </Col>
                                        <Col lg="1">
                                            <i onClick={() => { let vals = [...values]; vals.splice(index, 1); setValues(vals) }} className="fa fa-trash" style={{ marginTop: 25, display: "block", fontWeight: "bold", color: "red" }}></i>
                                        </Col>
                                    </Row>))}
                                    <i style={{
                                        fontSize: 37, margin: "15px auto",
                                        display: "block", width: 50, textAlign: "center", color: "#ac3627"
                                    }}
                                        onClick={() => setValues(values => [...values, { category: "", item: "", price: '' }])}
                                        className="fas fa-plus-circle"></i>


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


export default NeworderStep2;

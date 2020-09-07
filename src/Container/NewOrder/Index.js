import React, { Component } from 'react';
import NeworderStep1 from './NeworderStep1';
import NeworderStep2 from './NeworderStep2';
import NeworderStep3 from './NeworderStep3';
import NeworderStep4 from './NeworderStep4';
import axios from "axios";

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            customerNumber: '',
            customerName: '',
            customerAddress: '',
            orderType: 0,
            orderDetails: [],
            cartItems: []
        }
        this.onChangeText = this.onChangeText.bind(this);
    }



    onChangeText(e) {
        const target = e.target;
        const name = target.name;
        // console.log(name)
        this.setState({
            [name]: e.target.value
        })

        // console.log("this state",e.target.value)
    }
    // proceed to next step
    nextStep = () => {

        const { step } = this.state;
        let newStep = step + 1;
        if (newStep === 2) {
            localStorage.setItem("name", this.state.customerName)
            localStorage.setItem("number", this.state.customerNumber)
        } else if (newStep === 4) {
           
            localStorage.setItem("address", this.state.customerAddress)

        }
        this.setState({
            step: newStep
        }, () => {
            if (this.state.step === 4) {
                this.setState({
                    customerName: localStorage.getItem("name"),
                    customerNumber: localStorage.getItem("number"),
                    cartItems: JSON.parse(localStorage.getItem("cartItems")),
                    orderType: localStorage.getItem("orderType"),
                    customerAddress: localStorage.getItem("address")
                })
            }
        })
    }
    //go back to prev step
    prevStep = () => {

        const { step } = this.state;
        let newStep = step - 1;
        if (newStep === 1) {
            this.setState({
                customerName: localStorage.getItem("name"),
                customerNumber: localStorage.getItem("number")
            })
        } else if (newStep === 2) {
            this.setState({
                cartItems: JSON.parse(localStorage.getItem("cartItems"))
            })
        } else if (newStep === 3) {
            this.setState({
                orderType: localStorage.getItem("orderType"),
                customerAddress: localStorage.getItem("address")
            })
        }
        this.setState({
            step: newStep
        })
    }
    
    confirmOrder = () => {
        console.log("confirm")
        let cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const total = cartItems.reduce((prevValue, currentValue) => prevValue + currentValue.total, 0);

        let items = [];
        cartItems.map((itm, index) => {
            console.log("Index -> confirmOrder -> itm", itm)
            let newItem = { "itemId": itm.item, qty: itm.qty };
            items.push(newItem)

        });

        let reqData = {
            "name": localStorage.getItem("name"),
            "number": localStorage.getItem("number"),
            "address": localStorage.getItem("address"),
            "orderType": localStorage.getItem("orderType"),
            "outlet": localStorage.getItem("outlet"),
            "total": total,
            "items": items
        };
        console.log("Index -> confirmOrder -> axios data", reqData)
        const access = sessionStorage.getItem('access');
        axios({
            method: 'post',
            url: 'http://api.chicking-malappuram.in/api/orders/',
            data:reqData,
            headers: { 'Authorization': `Bearer ${access}` }

        }).then((res) => {
            if(res.data==="success"){
                this.props.history.push({ pathname: '/portal/order-details' });
            }else{
                alert("some error occured pls try again later ")
            }
            console.log("Index -> confirmOrder -> data", res)

        });
    }
    render() {
        const { step } = this.state;
        switch (step) {
            case 1:
                return (
                    <NeworderStep1
                        nextStep={this.nextStep}
                        changeText={this.onChangeText}
                        number={this.state.customerNumber}
                        name={this.state.customerName}
                    //handleChange={this.handleChange}
                    //={value}
                    />
                )
            case 2:
                return (
                    <NeworderStep2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        cartItems={this.state.cartItems}
                    //handleChange={this.handleChange}
                    //={value}
                    />
                )
            case 3:
                return (
                    <NeworderStep3
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        changeText={this.onChangeText}
                        orderType={this.state.orderType}
                        address={this.state.customerAddress}
                    //handleChange={this.handleChange}
                    //={value}
                    />
                )
            case 4:
                return (
                    <NeworderStep4
                        prevStep={this.prevStep}
                        number={this.state.customerNumber}
                        name={this.state.customerName}
                        orderType={this.state.orderType}
                        address={this.state.customerAddress}
                        cartItems={this.state.cartItems}
                        onConfirm={this.confirmOrder}
                    //handleChange={this.handleChange}
                    //={value}
                    />
                )
            default:
                return (
                    <div></div>
                )
        }
    }
}
export default Index;
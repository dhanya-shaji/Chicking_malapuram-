import React, { useState, useEffect, Fragment } from 'react';
import style from './Menu.module.css';
import {
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Row, Col
} from "reactstrap";
const Menu = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [AddCategoryData, setAddCategoryData] = useState();
  const [AddChangedCategoryData, setAddChangedCategoryData] = useState({ id: '', name: '' });

  //To fetch menu data from api 
  const [data, setdata] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  async function fetchData() {
    const access = sessionStorage.getItem('access');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
    }
    console.log(requestOptions);
    const res = await fetch("http://api.chicking-malappuram.in/api/items/", requestOptions);
    res
      .json()
      .then(res => setdata(res),
        setIsLoading(false),
        console.log("data",data)
      )

  }
  useEffect(() => {
    fetchData();
    fetchcategoryData();
  }, []);

  //To delete menu
  function MenuDelete(id) {
    console.log("id value", id);
    const Id = id;
    const access = sessionStorage.getItem('access');
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
    }
    //console.log(requestOptions);
    fetch("http://api.chicking-malappuram.in/api/items/" + Id + '/', requestOptions)
      .then(result => {
        console.log(result)
        //alert("Delete Successfully");
        fetchData();
      }
      )
  }
  //To fetch categogry data from api 
  const [categorydata, setcategorydata] = useState([]);
  async function fetchcategoryData() {
    const access = sessionStorage.getItem('access');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
    }
    console.log(requestOptions);
    const res = await fetch("http://api.chicking-malappuram.in/api/category/", requestOptions);
    res
      .json()
      .then(res => setcategorydata(res),
        console.log("categorydata",categorydata)
      )

  }
  //To add menu
  const [state, setState] = useState({
    name: '',
    price: ''
  })
  //To asign value to usestate  
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  //To add category -api post
  const AddMenu = (e) => {
    e.preventDefault();
    const access = sessionStorage.getItem('access');
    const payload = {
      'name': state.name,
      'category': { "id": AddCategoryData },
      'price': state.price
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
      body: JSON.stringify(payload)
    }
    //console.log(requestOptions);
    fetch("http://api.chicking-malappuram.in/api/items/", requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log("result",result)
        setState({
          name: '',
          price: ''
        })
        setAddCategoryData('')
        fetchData();

      })

  }

  //To update input value
  const handleChanged = (e) => {
    const { id, value } = e.target
    setDataForUpdate(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  //To edit Menu
  function MenuEdit(data) {
    console.log(data);
    ToggleForUpdates(data);
  }
  const [modalForUpdate, setModalForUpdate] = useState(false);
  const [DataForUpdate, setDataForUpdate] = useState({
    id: '',
    name: '',
    category_name: '',
    category_id: '',
    price: ''

  });
  function ToggleForUpdates(data) {
    setModalForUpdate(!modalForUpdate);
    setDataForUpdate(
      {
        id: data.id,
        name: data.name,
        category_name: data.category_name,
        category_id: data.category_id,
        price: data.price
      }
    );
    setAddChangedCategoryData({ id: data.category_id, name: data.category_name })
  }
  //To click update button 
  function UpdateMenu(id) {
    const access = sessionStorage.getItem('access');
    console.log("id value", id);
    const Id = id;
    const payload = {
      'name': DataForUpdate.name,
      'category': { "id": AddChangedCategoryData.id },
      'price': DataForUpdate.price
    }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
      body: JSON.stringify(payload)
    }
    console.log(requestOptions);
    fetch("http://api.chicking-malappuram.in/api/items/" + Id + '/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setDataForUpdate(
          {
            id: '',
            name: '',
            price: '',
            category_name: '',
            category_id: '',
          }
        );
        ToggleForUpdate();
        fetchData();
      })
  }
  function ToggleForUpdate() {
    setModalForUpdate(!modalForUpdate);
  }

  return (
    <Fragment>
      <div className="content">
        <Row>
          <Col lg="12">
            <div className="card chicking-card">
              <div className="pull-right">
              <Button color="danger" onClick={toggle} style={{ float: 'right' }}>New Item</Button>
              </div>
              
              {/*Model box for add new outlets */}
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Item</ModalHeader>
                <ModalBody>
                  <form>
                    <div>
                      <label>Name*:</label>
                      <input
                        className={style.inputbox}
                        type="text"
                        id="name"
                        onChange={handleChange}
                        value={state.name}
                        name="name"
                        required />
                    </div>
                    <div>
                      <label>Category*:</label>
                      <select
                        className={style.inputbox}
                        onChange={e => setAddCategoryData(e.currentTarget.value)}
                      >
                        {categorydata.map(item => (
                          <option
                            id="category"
                            value={item.id}
                            name="category" >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>Price*:</label>
                      <input
                        className={style.inputbox}
                        type="number"
                        id="price"
                        onChange={handleChange}
                        value={state.price}
                        name="price"
                        required />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={AddMenu}>Create</Button>{' '}
                  <Button color="danger" onClick={toggle}>Close</Button>
                </ModalFooter>
              </Modal>
              {IsLoading && <p>loading....</p>}
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CATAGORY</th>
                    <th>PRICE</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map(item => (
                      <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.category.name}</td>
                        <td>{item.price}</td>
                        <td><Button color="primary"
                          onClick={() => MenuEdit({
                            id: item.id,
                            name: item.name,
                            category_name: item.category.name,
                            category_id: item.category.id,
                            price: item.price
                          })}
                        >
                          EDIT</Button></td>
                        <td><Button color="danger"
                          onClick={() => MenuDelete(item.id)}
                        >
                          DELETE
              </Button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>


      </div>
      {/*Model box for Update new category */}
      <Modal isOpen={modalForUpdate} toggle={ToggleForUpdates}>
        <ModalHeader toggle={ToggleForUpdates}>Edit Outlet</ModalHeader>
        <ModalBody>
          <form>
            <div>
              <label>Name*:</label>
              <input
                className={style.inputbox}
                type="text"
                id="name"
                onChange={handleChanged}
                value={DataForUpdate.name}
                defaultValue={DataForUpdate.name}
                name="name"
                required />
            </div>
            <div>
              <label>Category*:</label>
              <select
                className={style.inputbox}
                onChange={e => setAddChangedCategoryData({ id: e.currentTarget.value })}
                defaultValue={AddChangedCategoryData.id}
              >
                {categorydata.map(item => (
                  <option
                    id="category"
                    value={item.id}
                    name="category" >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Price*:</label>
              <input
                className={style.inputbox}
                type="number"
                id="price"
                onChange={handleChanged}
                value={DataForUpdate.price}
                defaultValue={DataForUpdate.price}
                name="price"
                required />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
            onClick={() => UpdateMenu(DataForUpdate.id)}
          >
            Update
            </Button>
          <Button color="danger" onClick={ToggleForUpdates}>Close</Button>
        </ModalFooter>
      </Modal>

    </Fragment>
  )
}
export default Menu;
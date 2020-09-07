import React, { useState, useEffect, Fragment } from 'react';
import style from './Category.module.css'
import {
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
const Category = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //To fetch data from api 
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
    const res = await fetch("http://api.chicking-malappuram.in/api/category/", requestOptions);
    res
      .json()
      .then(res => setdata(res),
        setIsLoading(false))
  }
  useEffect(() => {
    fetchData();
  }, []);
  //To delete Category
  function CategoryDelete(id) {
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
    console.log(requestOptions);
    fetch("http://api.chicking-malappuram.in/api/category/" + Id + '/', requestOptions)
      .then(result => {
        console.log(result)
        fetchData();
      }
      )
  }
  //To add category
  const [state, setState] = useState({
    name: '',
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
  const AddCatagory = (e) => {
    e.preventDefault();
    const access = sessionStorage.getItem('access');
    const payload = {
      'name': state.name,
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access,
      },
      body: JSON.stringify(payload)
    }
    console.log(requestOptions);
    fetch("http://api.chicking-malappuram.in/api/category/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        alert("added successfully");
        setState({
          name: '',
        })
        fetchData()
      })
  }
  //To edit Category
  function CategoryEdit(data) {
    console.log(data);
    ToggleForUpdates(data);


  }
  const [modalForUpdate, setModalForUpdate] = useState(false);
  const [DataForUpdate, setDataForUpdate] = useState({
    id: '',
    name: '',
  });
  function ToggleForUpdates(data) {
    setModalForUpdate(!modalForUpdate);
    setDataForUpdate(
      {
        id: data.id,
        name: data.name,
      }
    );
  }
  //To update input value
  const handleChanged = (e) => {
    const { id, value } = e.target
    setDataForUpdate(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  //To click update button 
  function Updatecategory(id) {
    const access = sessionStorage.getItem('access');
    console.log("id value", id);
    const Id = id;
    const payload = {
      'name': DataForUpdate.name,
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
    fetch("http://api.chicking-malappuram.in/api/category/" + Id + '/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        alert("Updated successfully");
        setDataForUpdate(
          {
            id: '',
            name: '',
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
        <div className="card chicking-card">
          <div className="pull-right">
            <Button color="danger" onClick={toggle} style={{ float: 'right' }}>NEW CATEGORY</Button>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create New Catagory</ModalHeader>
            <ModalBody>
              <form>
                <div>
                  <label>Catagory Name:</label>
                  <input
                    className={style.inputbox}
                    type="text"
                    id="name"
                    onChange={handleChange}
                    value={state.name}
                    name="Catagory_name" />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={AddCatagory}>Create</Button>{' '}
              <Button color="danger" onClick={toggle}>Close</Button>
            </ModalFooter>
          </Modal>
          {IsLoading && <p>loading....</p>}

          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORY</th>
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
                    <td><Button color="primary"
                      onClick={() => CategoryEdit({ id: item.id, name: item.name, })}
                    >
                      EDIT</Button></td>
                    <td><Button color="danger"
                      onClick={() => CategoryDelete(item.id)}
                    >
                      DELETE
      </Button></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>



      </div>
      {/*Model box for Update new category */}
      <Modal isOpen={modalForUpdate} toggle={ToggleForUpdates}>
        <ModalHeader toggle={ToggleForUpdates}>Edit Outlet</ModalHeader>
        <ModalBody>
          <form>
            <div>
              <label>Catagory Name:</label>
              <input
                className={style.inputbox}
                type="text"
                id="name"
                onChange={handleChanged}
                value={DataForUpdate.name}
                defaultValue={DataForUpdate.name}
                name="Catagory_name" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => Updatecategory(DataForUpdate.id)}>Update</Button>
          <Button color="danger" onClick={ToggleForUpdates}>Close</Button>
        </ModalFooter>
      </Modal>

    </Fragment>
  )
}
export default Category;
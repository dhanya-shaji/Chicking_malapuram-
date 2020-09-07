import React, {useState,useEffect,Fragment} from 'react';
import style from './Staff.module.css'
import {
    Table ,
    Button,Row,Col,
    Modal, ModalHeader, ModalBody, ModalFooter
  } from "reactstrap";
 const Staff =()=>{
      //To model open
      const [modal, setModal] = useState(false);
      const toggle = () => setModal(!modal);

      const [AddOutletData, setAddOutletData] = useState("");
      const [StaffTypeData, setStaffTypeData] = useState("supervisor");

       //To fetch data from api 
       const [data, setdata] = useState([]);
       const [status, setStatus] = useState('idle');

       async function fetchData() {
         setStatus('loading');
        const access=sessionStorage.getItem('access');
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer'+' '+access,
         },
        }
        const res = await fetch("http://api.chicking-malappuram.in/api/staffs/",requestOptions);
        setStatus('success')
        const data = await res.json();
        if(data.length > 0){
          setdata(data);
        }
    }
    useEffect(() => {
        fetchData();
        fetchOutletData();
      },[]);


//To fetch data from api 
const [Outletdata, setOutletdata] = useState([]);

async function fetchOutletData() {
  const access=sessionStorage.getItem('access');
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer'+' '+access,
   },
  }
  //console.log(requestOptions);
  const res = await fetch("http://api.chicking-malappuram.in/api/outlets/",requestOptions);
  const data = await res.json();
  if(data.length > 0){
    setOutletdata(data);
    setAddOutletData(data[0].id)
  }
} 
//To add staff
const [state, setState] = useState({
  name: '',
  email: '',
  username:'',
  password:'', 
})
//To asign value to usestate  
const handleChange = (e) => {
  const { id, value } = e.target
  setState(prevState => ({
    ...prevState,
    [id]: value
  }))
}
//click create button 
const AddStaff = (e) => {
  e.preventDefault();
  const access = sessionStorage.getItem('access');
  const payload = {
    'name': state.name,
    'email':state.email,
    'username':state.username,
    'password':state.password,
    'staff_type':{StaffTypeData},
    'outlet':{"id": AddOutletData },
    
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
  fetch("http://api.chicking-malappuram.in/api/staffs/",requestOptions)
  .then(response => response.json())
.then(result => {
console.log(result)
//alert("added successfully");
setState({
  name: '',
  email: '',
  username:'',
  password:'', 
})
fetchData();
})
}
//To delete outlets
function StaffDelete(id){
  console.log("id value", id);
  const Id=id;
  const access=sessionStorage.getItem('access');
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer'+' '+access,
   },
  }
  console.log(requestOptions);
  fetch("http://api.chicking-malappuram.in/api/staffs/"+Id+'/',requestOptions)
.then(result => {
  console.log(result)
  fetchData();
  alert("Delete Successfully");
} 
)
}
return(
    <Fragment>  
    <div className="content"> 
    <Row>
      <Col lg="12">
      <div className="card chicking-card">
          <div className="pull-right">
          <Button color="danger" onClick={toggle} style={{float:'right'}}>NEW STAFF</Button>
          </div>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Staff</ModalHeader>
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
                      <label>Email*:</label>
                      <input
                        className={style.inputbox}
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={state.email}
                        name="email"
                        required />
                    </div>
                    <div>
                      <label>Username*:</label>
                      <input
                        className={style.inputbox}
                        type="text"
                        id="username"
                        onChange={handleChange}
                        value={state.username}
                        name="username"
                        required />
                    </div>
                    <div>
                      <label>Password*:</label>
                      <input
                        className={style.inputbox}
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={state.password}
                        name="name"
                        required />
                    </div>
                    <div>
                      <label>Staff Type*:</label>
                      <select
                        className={style.inputbox}
                        onChange={e => setStaffTypeData(e.currentTarget.value)}
                      >
                        <option id="stafftype" value="supervisor">Supervisor</option>
                        <option id="stafftype" value="customer call staff">Customer call staff</option>
                        <option id="stafftype" value="outlet staff">Outlet staff</option>
                      </select>
                    </div>
                    <div>
                      <label>Outlet*:</label>
                      <select
                        className={style.inputbox}
                        onChange={e => setAddOutletData(e.currentTarget.value)}
                      >
                        {Outletdata.map(item => (
                          <option
                            id="outlet"
                            value={item.id}
                            name="outlet" >
                            {item.location}
                          </option>
                        ))}
                      </select>
                    </div>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                  <Button color="primary" onClick={AddStaff}>Create</Button>{' '}
                  <Button color="danger" onClick={toggle}>Close</Button>
                </ModalFooter>
        </Modal>
        {status === 'loading' &&<p>loading....</p>} 
        <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>STAFF TYPE</th>
          <th>OUTLET</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
      {
            data.map(item=>(
            <tr>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.staff_type}</td>
            <td>{item.outlet}</td>
            <td><Button color="primary" 
            //onClick={()=>StaffEdit({id:item.id,location:item.location,number:item.number})}
            >
                                    EDIT</Button></td>
            <td><Button color="danger" 
                  onClick={()=>StaffDelete(item.id)}
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
            </Fragment>
)
 }
 export default Staff;
import React ,{ useState,useEffect,Fragment}from 'react';
import style from './Outlet.module.css'
import {
    Table ,
    Button,Row,Col,
    Modal, ModalHeader, ModalBody, ModalFooter
  } from "reactstrap";
  const Outlets=(props)=>{
    const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        const [data, setdata] = useState([]);
        const [IsLoading, setIsLoading] = useState(true);
        const [state , setState] = useState({
          location : '',
          number : ''
      })
     
    //To asign value to usestate  
      const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    //To fetch data from api 
        async function fetchData() {
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
          res
            .json()
            .then(res => setdata(res),
            setIsLoading(false))
} 
        useEffect(() => {
          fetchData();
        },[]);


  // To add outlets
      const handleSubmitClick = (e) => {
        e.preventDefault();
        const access=sessionStorage.getItem('access');
        const payload={
          'location':state.location,
          'number':state.number,
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer'+' '+access,
       },
        body:JSON.stringify(payload)
      }
      //console.log(requestOptions);
     fetch("http://api.chicking-malappuram.in/api/outlets/",requestOptions)
     .then(response => response.json())
.then(result => {
  //console.log(result)
  //alert("added successfully");
  setState({
    location : '',
    number : ''
  })
  fetchData();
})
}   
//To delete outlets
function OutletDelete(id){
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
  fetch("http://api.chicking-malappuram.in/api/outlets/"+Id+'/',requestOptions)
.then(result => {
  //console.log(result)
  fetchData();
  //alert("Delete Successfully");
} 
)
}
//To Update outlets
function OutletEdit(data){
  console.log(data);
  ToggleForUpdates(data);
 
  
}
const [modalForUpdate, setModalForUpdate] = useState(false);
const [DataForUpdate,setDataForUpdate]=useState({
  id:'',
  location:'',
  number:''
});
function ToggleForUpdates(data){
  setModalForUpdate(!modalForUpdate);
  setDataForUpdate(
    {
      id:data.id,
      location:data.location,
      number:data.number
    }
  );
}
//To click update button 
function UpdateOutlet(id){
   const access=sessionStorage.getItem('access');
   console.log("id value", id);
  const Id=id;
        const payload={
          'location':DataForUpdate.location,
          'number':DataForUpdate.number,
      }
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer'+' '+access,
       },
        body:JSON.stringify(payload)
      }
      console.log(requestOptions);
      fetch("http://api.chicking-malappuram.in/api/outlets/"+Id+'/',requestOptions)
      .then(response => response.json())
 .then(result => {
   //console.log(result)
   //alert("Updated successfully");
   setDataForUpdate(
    {
      id:'',
      location:'',
      number:''
    }
  );
  fetchData();
 })
}
//To update input value
const handleChanged=(e)=> {
  const {id , value} = e.target   
  setDataForUpdate(prevState => ({
            ...prevState,
            [id] : value
        }))
}
    return( 
    <Fragment>  
    <div className="content"> 
    <Row>
      <Col lg="12">
        <div className="card chicking-card">
          <div className="pull-right">
          <Button color="danger" onClick={toggle} style={{float:'right'}}>NEW OUTLET</Button>
          </div>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Outlet</ModalHeader>
        <ModalBody>
          <form>
            <div>
            <label>Outlet Location</label>
            <input 
            className={style.inputbox}
             type="text"
             id="location"
             onChange={handleChange}
             value={state.location}
              name="outlet_name"/>
            </div>
            <div>
            <label>Contact Number</label>
            <input
             className={style.inputbox}
              type="text" 
              id="number"
              onChange={handleChange}
              value={state.number}
              name="contact_number"/>
            </div>
            </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary"  onClick={handleSubmitClick}>Create</Button>{' '}
          <Button color="danger"onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
      {/*Table view of outlets */}
      {IsLoading&&<p>loading....</p>} 
      {data.length > 0 && (    
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>LOCATION</th>
          <th>NUMBER</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
          {
            data.map(item=>(
            <tr>
             <th scope="row">{item.id}</th>
            <td>{item.location}</td>
            <td>{item.number}</td>
            <td><Button color="primary" onClick={()=>OutletEdit(
                                  {id:item.id,location:item.location,number:item.number})}>
                                    EDIT</Button></td>
            <td><Button color="danger" 
                  onClick={()=>OutletDelete(
                                  item.id)}>
                                  DELETE
              </Button></td>
            </tr>
            ))
          }
      </tbody>
    </Table>)}           
        </div>
      </Col>
    </Row>        
      
        {/*Model box for add new outlets */}
       
</div>
  {/*Model box for Update new outlets */}
  <Modal isOpen={modalForUpdate} toggle={ToggleForUpdates}>
        <ModalHeader toggle={ToggleForUpdates}>Edit Outlet</ModalHeader>
        <ModalBody>
          <form>
            <div>
            <label>Outlet Location</label>
            <input 
            className={style.inputbox}
             type="text"
             id="location"
             onChange={handleChanged}
             value={DataForUpdate.location}
             defaultValue={DataForUpdate.location}
              name="outlet_name"/>
            </div>
            <div>
            <label>Contact Number</label>
            <input
             className={style.inputbox}
              type="text" 
              id="number"
              defaultValue={DataForUpdate.number}
              onChange={handleChanged}
              value={DataForUpdate.number}
              name="contact_number"/>
            </div>
            </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary"  onClick={()=>UpdateOutlet(DataForUpdate.id)}>Update</Button>
          <Button color="danger"onClick={ToggleForUpdates}>Close</Button>
        </ModalFooter>
      </Modal>
</Fragment> 
        )
    }

export default Outlets;
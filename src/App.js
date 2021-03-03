import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Customer from './components/Customer.js';
import Table from 'react-bootstrap/Table'
import 'tachyons';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      customers:[],
      offset:0,
      count:0,
    }
  }
  componentDidMount(){
    fetch(`http://localhost:3001/getCountCustomers`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({count:data[0].count})
      this.getCustomers()
    })
    .catch(err => {
      console.log(err);
    })
  
  }

  getCustomers = (next=0) =>{
    this.setState({offset:next})
    fetch(`http://localhost:3001/getall?offset=${next}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({customers:data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchCustomer = (e) =>{
  const query = e.target.value
  fetch(`http://localhost:3001/search?q=${query}`)
  .then(res => res.json())
  .then(data => {
    this.setState({customers:data})
  })
  .catch(err => {
    console.log(err);
  })
}


  render(){
    const {customers,offset,count,} = this.state;
    const nextOffset = offset+15;
    const prevOffset = offset-15;
    const prevDisable = (offset<=0) ? 'disabled':'';
    const nextDisable = (offset>=count-15) ? 'disabled':'';
  return (
    <>
    <Form>
        <Form.Control 
            type="search" 
            placeholder="Search Customer by Country..." 
            style = {{width:'350px',marginTop:'5px',marginBottom:'5px'}}
            onChange = {this.searchCustomer}
        />
      </Form>
      <div style={{margin:'10px'}}>
      <Button variant="primary" disabled={prevDisable} onClick={()=>this.getCustomers(prevOffset)}>Prev</Button>{' '}
       <Button variant="primary" disabled={nextDisable} onClick={()=>this.getCustomers(nextOffset)}>Next</Button>{' '}
       </div>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Address</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
  {
    customers.map( (item,i) => {
      return <Customer custdata={item} key={i}/>
    })
    
  }
    
  </tbody>
  
</Table>
</>
  )
  }
}

export default App;

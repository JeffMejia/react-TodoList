import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class createTodo extends Component {
  state = {
    title: '',
    description: '',
    operation: 'Create'
  
  }

  getAllTodo = async () => {
    const res = await axios.get(
      "http://apitest.smbssolutions.com/public/api/v1/tasks",
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } }
    );
    this.setState({ tasks: res.data.message });
    console.log('Refresh Todolist Complete!')
  };

  editOne = async() => {
    const id = this.props.match.params.id
    const res = await axios.get(
      `http://apitest.smbssolutions.com/public/api/v1/tasks/${id}`,
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } }
    );
    this.setState({
      title: res.data.message.name,
      description: res.data.message.description
    })
    //console.log(res.data.message)
  }
  
  createTask = async (e) =>{
    e.preventDefault()
    const id = this.props.match.params.id
    const newTodo = {
      name: this.state.title,
      description: this.state.description
    }
    
    if(id){
      const res = await axios.put(
        `http://apitest.smbssolutions.com/public/api/v1/tasks/${id}`, 
        newTodo,
        { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } });
        console.log(res.data.message)
    }
    else
    {
      const res = await axios.post( 
        "http://apitest.smbssolutions.com/public/api/v1/tasks", 
        newTodo, 
        { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } });
        console.log('Booom Nena! ' + res)
      }    
      window.location.href="/"
  }

  getTitle = (e) => {
    console.log(e.target.value)
    this.setState({title: e.target.value});
  }
  
  getDescription = (e) => {
    console.log(e.target.value)
    this.setState({description: e.target.value});
  }
  
  componentDidMount(){
    const id = this.props.match.params.id
    if(id){
      console.log("editar: " + id);
      this.setState({operation: "Edit", edit: true});
      this.editOne()
    } 
  }
  
  render() {
    return (
      <div className="container"> 
      <h2 className="container bg bg-primary p-3 my-3 text-white">{this.state.operation} To do:</h2>
        <hr/>
        <div className="container bg bg-secondary"> 
          <h4 className="text-white">Title:</h4>
          <input type="text" className="form-control" value={this.state.title} onChange={this.getTitle} placeholder="title"></input>
          <h4 className="text-white"> Description: </h4>
          <input type="text" className="form-control" value={this.state.description} onChange={this.getDescription} placeholder="description"></input>
          <Link className="btn btn-primary my-3" onClick={this.createTask} to="/">
          <h4>Save</h4>
          </Link>
        </div>
      </div>
    );
  }
}

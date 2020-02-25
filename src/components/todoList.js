import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default class conection extends Component {
  state = {
    todos: []
  };

  getAllTodo = async () => {
    const res = await axios.get(
      "http://apitest.smbssolutions.com/public/api/v1/tasks",
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } }
    );
    this.setState({ todos: res.data.message });
    console.log('GetAll list Complete!')
  };
  
  componentDidMount(){
    console.log('Getting List!') 
    this.getAllTodo();
  }

  deleteTodo = async (id) => {
    await axios.delete(
      `http://apitest.smbssolutions.com/public/api/v1/tasks/${id}`,
      { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}` } }
    );
    console.log("todo Delete!!")
    this.getAllTodo();
  }

  render() {
    return (
      <div className="row">
        <h2 className="container bg bg-primary p-3 my-3 text-white">Todo List</h2>

        {this.state.todos.map(todo => (

          <div className="col-md-12 p-2" key={todo.id}>
            <div className="card">
              <div className="card-header mx-auto justify-content=between">
                <h5 className="card-title col">{todo.name}</h5>
                <Link className="btn btn-secondary" to={'/edit/'+todo.id}>Edit</Link>
              </div>
              <div className="card-body">
                <p className="card-text col p-2">{todo.description}</p>
              </div>
              <button
                  className="btn btn-danger"
                  onClick={() => this.deleteTodo(todo.id)}
                  >
                  Delete
                </button>
            </div>
            <hr/>
            

          </div>
        ))}
                
        <Link to="/create" className="btn btn-primary">Create To do</Link>
      </div>
    );
  }
}

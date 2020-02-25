import React from "react";
import 'dotenv'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./components/todoList";
import CreateTodo from "./components/createTodo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createTodo from "./components/createTodo";

function App() {
  return (
    <div className="App">
      <div className="container">
      <Router>
            <Route exact path="/" component={Main}></Route>
            <Route path="/create"component={createTodo}></Route>
            <Route path="/edit/:id" component={CreateTodo}></Route>
      </Router>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
import FileTester from './FileTester';
import Dashboard from './Dashboard';
import Login from './Login';
import Header from './Header';
console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);

function App(props) {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/filetester" component={FileTester} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;

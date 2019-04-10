import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";

import ReactDOM from 'react-dom';
import axios from 'axios';
import Users from "../Users";
import Teams from "../Teams";
import Roles from "../Roles";
import Help from "../Help";


export default class Header extends Component {

  constructor(props) {

    super(props);

    this.state = {
       users:[],
       teams:[]
     }
   }

  componentDidMount(){
    this.getUsers();
    this.getTeams();
  }

getUsers = _ => {
 axios.get('http://localhost:3001/userList').then((data) => {
    this.setState({users: data.data.users});
  })
  .catch(function (response) {
    console.log("Error: " + response);
  });
  }

getTeams = _ => {
 axios.get('http://localhost:3001/teamList').then((data) => {
  this.setState({teams: data.data.teams});
  })
  .catch(function (response) {
    console.log("Error: " + response);
    });
  }


render() {
    return (
        <div>
          <h1 >GEA User Maintenance - Forum Data Warehouse </h1>
            <ul className="header">
              <li><NavLink exact to="/users">Users</NavLink></li>
              <li><NavLink exact to="/teams">Teams</NavLink></li>
              <li><NavLink exact to="/roles">Roles</NavLink></li>
              <li><NavLink exact to="/help">Help</NavLink></li>
             </ul>
           <div className="content">
            <Route exact path="/" component={Users}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/teams" component={Teams}/>
            <Route exact path="/roles" component={Roles}/>
            <Route exact path="/help" component={Help}/>
           </div>
        </div>
    );
  }
}

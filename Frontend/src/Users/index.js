import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './Users.css';
//import { Redirect } from 'react-router';
var axios = require('axios');
//import Validation from 'react-validation';
//import "./validation.js";
//const Userdata = (props) => {
export default class Users extends Component {

  constructor(props) {

    super(props);
    this.state = {
      ssoidinput: '',
      nameinput:'' ,
      usersso: '',
      username: '',
      userteam:'',
      userrole:'',
      userAgentID:'',
      userstatus:'active' ,
      submitmessage: '',
      redirect: false
    };
     this.handleClick = this.handleClick.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    this.setState= {
      ssoidinput: '',
      nameinput:'' ,
      usersso: '',
      username: '',
      userteam:'',
      userrole:'',
      userAgentID:'',
      userstatus:'active',
      redirect: false
      };
    };

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    alert('Out of this text box');
    const target = event.target;
    const name = target.name;
    const value = event.target.value;
    let parseString = require('xml2js').parseString;
    let config = {
      headers: {
          'Content-Type': 'application/json',
          'API_KEY': "asdas578SFG-fwmvobsknaiv60"
      }
     };
     let url = 'https://sso-name.ext.geappl.io/IPAL/webapi/user/';
     var res = url.concat (this.state.usersso);
     var userName;
     let getUsers =
      axios.get( res,config ).then(function (response) {
        console.log('Success: '+ response.data);
        parseString(response.data, function (err, result) {
        console.log(JSON.stringify(result));
       // var jsonParsed = JSON.parse(result);
        console.log(result.users.user[0].givenname);
        userName = result.users.user[0].givenname;
        console.log('UserName: '+ userName)
      })
      }).then(data => this.setState({"username" : userName }) )
      .catch(function (error) {
       console.log('Error: '+ error);
      });
  }

handleSubmit(event) {
  event.preventDefault();
  var self = this;

  var body = {
    ssoidinput: self.state.ssoidinput,
    nameinput: self.state.nameinput,
    usersso: self.state.usersso,
    username: self.state.username,
    userteam: self.state.userteam,
    userrole: self.state.userrole,
    userAgentID: self.state.userAgentID,
    userstatus: self.state.userstatus,
  }

  axios({
    method: 'post',
    url: 'http://localhost:3001/addNewUser',
    data: body
  })
  .then(function (response) {
    debugger;
    self.setState({ redirect: true });
  })
  .catch(function (error) {
    console.log(error);
});
}


  render() {
    if (this.state.redirect ) {
      return( <div> Record Updated Successfully ! </div> );
    } else
    return (
        <div className="backgroundaction-style container text-align-center-userdata">
          <div className="text-align-center-userdata ui huge userdata-header"> User Data Maintenance</div>
          <form style={{ paddingTop: "22px" }}>
            <div>
              <label htmlFor="ssoidinput">SSOID: </label>
              <input type="text" name="ssoidinput" value={this.state.ssoid} onChange={this.handleChange}></input>
              <span>  (or) </span>
              <label htmlFor="nameinput">Name: </label>
              <input type="text" name="nameinput" value={this.state.nameinput} onChange={this.handleChange}></input>
              <button>Search</button>
            </div>
            <br/>
            <table>
              <tbody>
                <tr>
                 <td>SSO ID: </td>
                  <td> <input type="text" style={{ width:"80%" }} name="usersso" value={this.state.usersso} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                  <td>Name: </td>
                  <td>
                    <input type="text" style={{ width:"80%" }} name="username" value={this.state.username} onChange={this.handleChange} onClick={ this.handleClick } id="username"/>
                  </td>
                </tr>
                <tr>
                  <td>Team ID: </td>
                  <td><input type="text" style={{ width:"80%" }} name="userteam" value={this.state.userteam} onChange={this.handleChange}  /> </td>
                </tr>
                <tr>
                  <td>Role ID: </td>
                  <td> <input type="text" style={{ width:"80%" }} name="userrole" value={this.state.userrole}  onChange={this.handleChange}  /> </td>
                </tr>
                <tr>
                  <td>Agent ID: </td>
                  <td> <input type="text" style={{ width:"80%" }} name="userAgentID" value={this.state.userAgentID} onChange={this.handleChange} />  </td>
                </tr>
                <tr>
                  <td>User Status: </td>
                  <td>
                    <select
                      id="userstatus"
                      name="userstatus"
                      onChange={this.handleChange}
                      style={{ width:"80%" }}
                    >
                        <option value="active">Active</option>
                        <option value="inActive">Inactive</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Message: </td>
                  <td> <input type="text" style={{ width:"80%" }} name="submitmessage" value={this.state.submitmessage} onChange={this.handleChange} /> </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <br/>
            <div>
              <input type="button" onClick={this.handleSubmit.bind(this)} defaultValue="Submit" />
            </div>
          </form>
          <br/>
          <br/>
        </div>
        );
    }
};

//export default Userdata;

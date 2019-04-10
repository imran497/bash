import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import './Teamsdata.css';
var axios = require('axios');

export default class Teams extends Component {

  constructor(props) {

    super(props);

    this.state = {
      teamName: '',
      teamId: '',
      teamLeadersso:'',
    };
  //this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

getInitialState(){
  this.setState= {
    teamName: '',
    teamId: '',
    teamLeadersso:'' ,
  };
};

handleChange(event) {
  const target = event.target;
  const name = target.name;
  const value = event.target.value;
  this.setState({ [name]: value });
}

// handleSubmit(event) {
//   alert('Submiteed with: ' + this.state.teamId);
//   event.preventDefault();
//    var   data= {
//     teamId: this.state.teamId,
//     teamLeadersso: this.state.teamLeadersso,
//     redirect: false
//   }
//   console.log("This data :" +data);
// const options = {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   },
//      body: JSON.stringify(data)
// }
// fetch('http://localhost:3001/addteam',{
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(data)
//    })
//    .then((response) => {
//     this.setState({redirect: true});
//   })
//   .catch((e) =>
//   {
//     console.error(e);
//   });
// }

handleSubmit(event) {
  event.preventDefault();
  var self = this;

  var body = {
    teamId: this.state.teamId,
    teamLeadersso: this.state.teamLeadersso,
  }

  axios({
    method: 'post',
    url: 'http://localhost:3001/addteam',
    data: body
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
});
}


  render() {
   return (
    <div className="backgroundaction-style container text-align-center-teamdata">
      <div className="text-align-center-teamdata ui huge teamdata-header"> Teams Data Maintenance</div>
      <form onSubmit={this.handleSubmit} method="POST">
       <div style={{ padding:"20px"}} >
         <label htmlFor="teamName">Team Name: </label>
         <input type="text" name="teamName" value={this.state.teamName} onChange={this.handleChange}></input>
         <button>Search</button>
       </div>
       <table>
          <tbody>
          <tr>
            <td>Team Name: </td>
            <td>
              <input type="text" name="teamId" value={this.state.teamId} onChange={this.handleChange}></input>
            </td>
          </tr>
          <tr>
            <td>Team Leader SSO: </td>
            <td>
              <input type="text" name="teamLeadersso" value={this.state.teamLeadersso} onChange={this.handleChange}></input>
            </td>
          </tr>
          </tbody>
       </table>
       <br/>
       <br/>
       <button>Submit</button>
      </form>
      <br/>
      <br/>
    </div>
        );
   }

};

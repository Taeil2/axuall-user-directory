import React from 'react';
import './app.css';

import User from './user';
import Pagination from './pagination';

class App extends React.Component {
  state = {
    users: [],
    numUsers: 50,
    resultsPerPage: 10,
    pages: 1,
    page: 1,
    results: []
  }

  // fetches users from the random user generator
  getUsers = (num) => {
    fetch(`https://randomuser.me/api/?results=${num}`)
      .then(response => response.json())
      .then(data => {
        let pages = Math.ceil(data.results.length / this.state.resultsPerPage);
        this.setState({
          users: data.results,
          pages: pages,
          page: 1
        });
        this.getResults();
      });
  }

  // gets a set of users from pagination
  getResults = () => {
    let begin = (this.state.page - 1) * this.state.resultsPerPage;
    let usersCopy = Array.from(this.state.users);
    let results = usersCopy.splice(begin, this.state.resultsPerPage);

    this.setState({
      results: results
    });
  }

  // sets a new page
  setPage = (page) => {
    this.setState({
      page: page
    }, () => {
      this.getResults();
    });
  }

  // handle the input for number of users
  handleNumUsers = (e) => {
    this.setState({numUsers: e.target.value});
  }

  // select all for an input on click
  handleFocus = (event) => event.target.select();

  // set the number of users
  handleSubmit = (e) => {
    e.preventDefault();
    this.getUsers(this.state.numUsers);
  }

  // export the current users to csv
  exportCSV = () => {
    let csvResults = [];
    this.state.results.forEach((user) => {
      csvResults.push({
        first: user.name.first,
        last: user.name.last,
        email: user.email,
        phone: user.phone,
        age: user.dob.age,
        gender: user.gender
      });
    });

    let csv = '';

    // Loop the array of objects
    for(let row = 0; row < csvResults.length; row++){
      let keysAmount = Object.keys(csvResults[row]).length;
      let keysCounter = 0;

      // If this is the first row, generate the headings
      if(row === 0){

        // Loop each property of the object
        for(let key in csvResults[row]){
          // This is to not add a comma at the last cell
          // The '\r\n' adds a new line
          csv += key + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
          keysCounter++;
        }

        // then generate the first person
        keysCounter = 0;
        for(let key in csvResults[row]){
          csv += csvResults[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
          keysCounter++;
        }
      } else{ // generate all others
        for(let key in csvResults[row]){
          csv += csvResults[row][key] + (keysCounter+1 < keysAmount ? ',' : '\r\n' );
          keysCounter++;
        }
      }

      keysCounter = 0
    }

    // Once we are done looping, download the .csv by creating a link
    let link = document.createElement('a');
    link.id = 'download-csv';
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'axuall-users.csv');
    document.body.appendChild(link);
    document.querySelector('#download-csv').click();
  }

  componentDidMount() {
    this.getUsers(this.state.numUsers);
  }

  render() {
    // console.log(this.state);

    let users = [];
    this.state.results.forEach((user) => {
      users.push(<User user={user} key={user.login.uuid} />);
    });

    return (
      <div className="wrapper">
        <h1>Axuall User Directory</h1>
        <div className="form-row">
          <form onSubmit={this.handleSubmit}>
            <label>How many users?</label>
            <input type="text" value={this.state.numUsers} onChange={this.handleNumUsers} onClick={this.handleFocus}></input>
            <button type="submit">Set</button>
          </form>
          <button onClick={this.exportCSV}>Export to CSV</button>
        </div>
        <div className="users">{users}</div>
        <Pagination pages={this.state.pages} page={this.state.page} setPage={this.setPage} />
      </div>
    );
  }
}

export default App;

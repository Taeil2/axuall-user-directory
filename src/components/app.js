import React from 'react';
import './app.css';

import User from './user';

class App extends React.Component {
  state = {
    users: [],
    numUsers: 20,
    page: 1,
    results: []
  }

  getUsers = (num) => {
    fetch(`https://randomuser.me/api/?results=${num}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.results,
          page: 1
        });
      });
  }

  getResults = () => {
    let resultsPerPage = 10;

    let begin = (this.state.page - 1) * resultsPerPage;
    let end = begin + resultsPerPage;

    this.setState({
      results: this.state.users.splice(begin, end)
    });
  }

  handleNumUsers = (e) => {
    this.setState({numUsers: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getUsers(this.state.numUsers);
  }

  componentDidMount() {
    this.getUsers(this.state.numUsers);
    this.getResults();
  }

  render() {
    let users = [];
    this.state.results.forEach((user) => {
      users.push(<User user={user} key={user.login.uuid} />);
    });

    return (
      <div>
        <h1>Axuall User Directory</h1>
        <form onSubmit={this.handleSubmit}>
          <label>How many users?</label>
          <input type="text" value={this.state.numUsers} onChange={this.handleNumUsers}></input>
          <button type="submit">Set</button>
        </form>
        {users}
      </div>
    );
  }
}

export default App;

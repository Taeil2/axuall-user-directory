
import React from 'react';
import './user.css';

class User extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <img src={this.props.user.picture.large} alt={this.props.user.name.first + ' ' + this.props.user.name.last} />
        {this.props.user.name.first}
        {this.props.user.name.last}
        {this.props.user.email}
        {this.props.user.phone}
        {this.props.user.dob.age}
        {this.props.user.gender}
      </div>
    );
  }
}

export default User;

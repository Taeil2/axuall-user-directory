
import React from 'react';
import './user.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faAddressCard, faVenusMars } from '@fortawesome/free-solid-svg-icons';

class User extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="user">
        <div className="image-container">
          <img src={this.props.user.picture.large} alt={this.props.user.name.first + ' ' + this.props.user.name.last} />
        </div>
        <div className="information">
          <h2>{this.props.user.name.first} {this.props.user.name.last}</h2>
          <p>
            <a href={'mailto:' + this.props.user.email}><FontAwesomeIcon icon={faEnvelope} /> {this.props.user.email}</a><br />
            <a href={'tel:' + this.props.user.phone}><FontAwesomeIcon icon={faPhone} /> {this.props.user.phone}</a><br />
            <FontAwesomeIcon icon={faAddressCard} /> {this.props.user.dob.age}<br />
            <FontAwesomeIcon icon={faVenusMars} /> {this.props.user.gender}
          </p>
        </div>
      </div>
    );
  }
}

export default User;

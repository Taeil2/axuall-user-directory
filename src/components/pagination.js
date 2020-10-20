
import React from 'react';
import './pagination.css';

class Pagination extends React.Component {
  state = {

  }

  handlePrev = () => {
    if (this.props.page === 1) {
      // do nothing
    } else {
      this.props.setPage(this.props.page - 1);
    }
  }

  handleNext = () => {
    if (this.props.page === this.props.pages) {
      // do nothing
    } else {
      this.props.setPage(this.props.page + 1);
    }
  }

  handlePage = (page) => {
    this.props.setPage(page);
  }

  render() {
    let pagination = [];

    pagination.push(<button onClick={this.handlePrev} key='page-prev'>Prev</button>)
    for (let i = 1; i < this.props.pages + 1; i++) {
      if (i  === this.props.page) {
        pagination.push(<button className="active" key={'page-' + i}>{i}</button>);
      } else {
        pagination.push(<button onClick={(e) => this.handlePage(i)} key={'page-' + i}>{i}</button>);
      }
    }
    pagination.push(<button onClick={this.handleNext} key='page-next'>Next</button>)

    return (
      <div className="pagination">
        {pagination}
      </div>
    );
  }
}

export default Pagination;

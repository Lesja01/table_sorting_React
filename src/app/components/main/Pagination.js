import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRange, getPageInfo } from './utils';

class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0
    };
  }

  componentWillMount() {
    if (this.props.currentPage) {
      this.setState({
        currentPage: parseInt(this.props.currentPage, 10)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({
        currentPage: parseInt(nextProps.currentPage, 10)
      });
    }
  }

   _getPageItemProps (props)  {
    const { pageValue, onPageChange: handlePageChange } = props;

    const onPageChange = () => {
      if (typeof handlePageChange === 'function') {
        handlePageChange(pageValue);
      }
      this.setState({
        currentPage: pageValue
      });
    };

    return {
      onClick: onPageChange
    };
  };

  render() {
    console.log(this.props);
    const { total, limit, pageCount } = this.props;

    const { currentPage } = this.state;

    const pageInfo = getPageInfo({
      limit,
      pageCount,
      total,
      page: currentPage
    });

    const {
      firstPage,
      lastPage,
      hasNextPage,
      hasPreviousPage,
      previousPage,
      nextPage,
      totalPages
    } = pageInfo;

    const pages = total ? getRange(firstPage, lastPage) : [];
console.log(this.props);
    return (
      <div>
        <table>
        <tr>
          <td>5</td>
          <td>10</td>
          <td>20</td>

        </tr>
        </table>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageValue: PropTypes.number,
  children: PropTypes.func.isRequired,
  onPageChange: PropTypes.func
};

Pagination.defaultProps = {
  limit: 10,
  pageCount: 5,
  currentPage: 0,
  pageValue: 0
};

export default Pagination;
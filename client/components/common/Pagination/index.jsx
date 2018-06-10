import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './styles.scss';

const Pagination = props => (
  props.pageCount > 1 ?
    <div id="pagination">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={props.onPageChange}
        containerClassName="react-paginate"
        activeClassName="active"
      />
    </div> : null
);

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

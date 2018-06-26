import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import CenterCards from '../../common/CenterCards';
import { LoadingBox } from '../../common/LoadingAnimation';
import { AuthTopNavigation } from '../../common/TopNavigation';
import { CenterDetailsModal } from '../../common/Modals';
import Pagination from '../../common/Pagination';

const View = (props) => {
  const renderAlternateBody = () => {
    if (props.centers.length === 0 && props.fetchingCenterStarted) {
      return <LoadingBox iconSize={4} />;
    } else if (props.centers.length === 0 && !props.fetchingCenterStarted) {
      return (
        <div className="page-content text-center">
          <h1 className="display-3">The centers list is empty</h1>
          {
            props.isAdmin ?
              <h3 className="font-weight-normal">Click <Link to="/addCenter">here</Link> to create a center.</h3> :
              null
          }
        </div>
      );
    } return null;
  };
  return (
    <div id="auth-centers-container">
      <AuthTopNavigation
        name={props.userName}
        title={props.isTransactionsPage ? 'Transactions' : 'Centers'}
        isAdmin={props.isAdmin}
        isSuperAdmin={props.isSuperAdmin}
        dispatch={props.dispatch}
      />
      <div className="container-fluid">
        <div className="row">
          <SideNavigation
            name={props.userName}
            isAdmin={props.isAdmin}
            isSuperAdmin={props.isSuperAdmin}
            dispatch={props.dispatch}
          />
          <div className="col-lg-10 offset-lg-2 mt-lg-0">
            <Header text={props.isTransactionsPage ? 'Transactions' : 'Centers'} />
            {
              renderAlternateBody() ||
              <div className="page-content">
                <div className="container">
                  {
                    props.isTransactionsPage ?
                      null : <h1 className="caption-text">A special center for a special event</h1>
                  }
                  <div>
                    <div className="row">
                      <CenterCards
                        centers={props.centers}
                        isAdmin={props.isAdmin || props.isSuperAdmin}
                        onBook={props.onBook}
                        onEdit={props.onEdit}
                        onViewTransactions={props.onViewTransactions}
                        createModalContent={props.createModalContent}
                        isTransactionsPage={props.isTransactionsPage}
                      />
                    </div>
                  </div>
                </div>
                <Pagination
                  pageCount={Math.ceil(props.pagination.totalCount / props.pagination.limit)}
                  onPageChange={props.updatePagination}
                />
                <CenterDetailsModal {...props.modalContent} />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

View.defaultProps = {
  modalContent: {},
  isTransactionsPage: false,
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  isTransactionsPage: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  centers: PropTypes.array.isRequired,
  fetchingCenterStarted: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onBook: PropTypes.func.isRequired,
  onViewTransactions: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  createModalContent: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  updatePagination: PropTypes.func.isRequired,
};

export default View;

import React from 'react';
import { Link } from 'react-router-dom';
import FakeDiv from '../../hoc/FakeDiv';

const AdminLinks = (props) => {
  let component;
  if (props.isAdmin || props.isSuperAdmin) {
    component = (
      <FakeDiv>
        <Link to="/addCenter" className="list-group-item">
          <i className="fa fa-plus fa-fw" aria-hidden="true" />&nbsp; Add Center
        </Link>
        {
          props.isSuperAdmin ?
            <Link to="/addAdmin" className="list-group-item">
              <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp; Add Admin
            </Link> : null
        }
        <Link to="/transactions" className="list-group-item">
          <i className="fa fa-tasks fa-fw" aria-hidden="true" />&nbsp; Transactions
        </Link>
      </FakeDiv>
    );
  } else {
    component = null;
  }
  return component;
};

export default AdminLinks;

import React from 'react';
import { Link } from 'react-router-dom';
import FakeDiv from '../../hoc/Aux';

const AdminLinks = (props) => {
  let component;
  if (props.isAdmin || props.isSuperAdmin) {
    component = (
      <FakeDiv>
        <li className="nav-item">
          <Link to="/addCenter" className="nav-link">Add Center</Link>
        </li>
        {
          props.isSuperAdmin ?
            <li className="nav-item">
              <Link to="/addAdmin" className="nav-link">Add Admin</Link>
            </li> : null
        }
        <li className="nav-item">
          <Link to="/transactions" className="nav-link">Transactions</Link>
        </li>
      </FakeDiv>
    );
  } else {
    component = null;
  }
  return component;
};

export default AdminLinks;

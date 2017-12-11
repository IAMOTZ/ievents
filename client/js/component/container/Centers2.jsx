import React from 'react';
import { connect } from 'react-redux';
import { Rediret } from 'react-router-dom';
import getAllCenters from '../../actions/centerActions';
import { showCenterModal } from '../../actions/centerActions';

import styles from '../../../sass/centers2.scss';
import { UserTopNav } from '../common/TopNavigation.jsx';
import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import CenterCards from '../common/CenterCards.jsx';
import { CenterModal } from '../common/Modal';


@connect((store) => {
  return {
    authenticated: store.user.status.fetched,
    user: store.user.user,
    centers: store.centers.centers,
    modalContent: store.centers.modalContent ? store.centers.modalContent : {
      name: null,
      images: [],
      details: null,
      capacity: null,
      price: null,
      bookedOn: [],
      type: null,
    },
    isAdmin: (store.user.user.role === 'admin') ? true : false,
  }
})

export default class Centers2 extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  showModal = (e) => {
    this.props.dispatch(showCenterModal(e.target.id));
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />);
    } else {
      return (
        <div>
          {/* Top Navigarion on Small screen */}
          <UserTopNav name={this.props.user.name} title="Centers" />

          <div className="container-fluid">
            <div className="row">

              {/* Side Navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />

              {/* Main content */}
              <div class="col-lg-10 offset-lg-2" id="centers-section">
                {/* Content Headers */}
                <Header text="Centers" />

                <section id="centers-section">
                  <div className="container">
                    {/* Search Box */}
                    <div id="center-section-content" class="d-flex flex-column align-items-center">
                      <div class="input-group w-50 mt-lg-5 search-box">
                        <input type="text" class="form-control" placeholder="Search for a center" />
                        <div class="input-group-btn d-none d-sm-block">
                          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                            Search with
                          </button>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">Location</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Name</a>
                          </div>
                        </div>
                      </div>
                      <div class="search-box mt-3 d-block d-sm-none">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                          Search with
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">Location</a>
                          <div role="separator" class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">Name</a>
                        </div>
                      </div>
                    </div>

                    {/* Centers  Grid*/}
                    <div className="mt-5">
                      <div className="row">
                        <CenterCards centers={this.props.centers} btnAction={this.showModal} isAdmin={this.props.isAdmin} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Modal */}
                <CenterModal modalContent={this.props.modalContent} />

                {/* Footer on large screen */}
                <footer class="d-none d-lg-block mt-5">
                  <div class="container text-white text-center py-5">
                    <h1>Ievents</h1>
                    <p>Copyright &copy; 2017</p>
                  </div>
                </footer>
              </div>
            </div>
          </div>

          {/* Footer on small screen */}
          <footer class="d-block d-lg-none mt-5">
            <div class="container text-white text-center py-5">
              <h1>Ievents</h1>
              <p>Copyright &copy; 2017</p>
            </div>
          </footer>
        </div>

      )
    }

  }
}
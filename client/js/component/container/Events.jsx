import React from 'react';
import { connect } from 'react-redux';

import eventStyles from '../../../sass/userEvents.scss';
import { UserSideNav } from '../common/SideNavigation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import Header from '../common/Header.jsx';
import EventCards from '../common/EventCards.jsx';

import { getAllEvents } from '../../actions/eventActions';

@connect((store) => {
  return {
    user: store.user.user,
    events: store.events.events,
  }
})

export default class Events extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
  }

  render() {
    return (
      <div>
        <UserTopNav name={this.props.user.name} title='My Events' />

        <div className="container-fluid">
          <div className="row">

            <UserSideNav userName={this.props.user.name} />

            {/* Main content */}
            <div class="col-lg-10 offset-md-2 mt-lg-0" id="main-content">

              {/* Content Header(navigation) on large screen */}
              <Header text='Add Event' />

              {/* Event Grid */}
              <div className="mt-5">
                <div className="card-columns mx-auto">
                  <EventCards events={this.props.events} />
                </div>
              </div>

              <footer class="d-none d-md-block mt-5">
                <div class="container text-white text-center py-5">
                  <h1>Ievents</h1>
                  <p>Copyright &copy; 2017</p>
                </div>
              </footer>

            </div>
          </div>
        </div>

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
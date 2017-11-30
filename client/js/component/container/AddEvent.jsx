import React from 'react';
import { connect } from 'react-redux';

import addEventStyles from '../../../sass/addEvent.scss';
import { UserSideNav } from '../layout/SideNavigation.jsx';
import { UserTopNav } from '../layout/TopNavigation.jsx';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';

@connect((store) => {
  return {
    user: store.user,
  }
})

export default class AddEvent extends React.Component {
  render() {
    return (
      <div>
        <UserTopNav />
        <div class="container-fluid">
          <div class="row">

            {/*  Side navigation on large screen */}
            <UserSideNav userName='Tunmise' />

            {/* Main content */}
            <div class="col-lg-10 offset-md-2" id="add-event-section">

              {/* Content Header(navigation) on large screen */}
              <Header text='Add Event'/>

              {/* Input form */}
              <form class="mt-sm-5 w-50">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="email" class="form-control" id="title" placeholder="A short description of your event" />
                  <small id="emailHelp" class="form-text text-muted">Less than 20 characters</small>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description" rows="6" placeholder="More details about the event"></textarea>
                  <small id="emailHelp" class="form-text text-muted">Less than 200 characters</small>                
                </div>
              </form>
              <form class="my-3 form-inline">
                <div class="form-group">
                  <label for="date">Date</label>
                  <input type="date" id="date" class="form-control mx-sm-3" />
                </div>
                <div class="form-group">
                  <label for="centers">Choose a Center</label>
                  <select id="centers" class="form-control ml-md-3">
                    <option value="1">Ottawa Event center</option>
                    <option value="2">Havilla hall</option>
                    <option value="3">The five</option>
                    <option value="4">Experience events</option>
                  </select>
                </div>
              </form>
              <a class="btn btn-outline-dark">Add</a>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

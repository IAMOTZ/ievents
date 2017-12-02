import React from 'react';
import { connect } from 'react-redux';
import getAllCenters from '../../actions/centerActions';

import addEventStyles from '../../../sass/addEvent.scss';
import { UserSideNav } from '../common/SideNavigation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import CenterOptions from '../common/CenterDropDown.jsx';
import Header from '../common/Header.jsx';
import Alert from '../common/Alert.jsx';
import { addEvent } from '../../actions/eventActions';

@connect((store) => {
  return {
    user: store.user.user,
    error: store.events.status.addingError.message,    
    centers: store.centers.centers,
  }
})

export default class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      description: null,
      date: null,
      centerId: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllCenters());
  }

  // This method uses user input to update the state
  getInput = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  // This method fires the action to create an event
  add = () => {
    const {
     title,
      description,
      centerId
    } = this.state;
    let date = this.state.date ? this.state.date.replace(/-/g, '/') : null;
    const eventDetails = { title, description, date, centerId };
    this.props.dispatch(addEvent(eventDetails, this.props.user.token));
  }

  render() {
    return (
      <div>
        {/* Top navigation on small screen */}
        <UserTopNav name={this.props.user.name} title='Add Event' />

        <div class="container-fluid">
          <div class="row">

            {/*  Side navigation on large screen */}
            <UserSideNav userName={this.props.user.name} />

            {/* Main content */}
            <div class="col-lg-10 offset-md-2" id="add-event-section">

              {/* Content Header(navigation) on large screen */}
              <Header text='Add Event' />

              {/* Input form */}
              <form class="mt-lg-5 w-lg-50">
                <Alert message={this.props.error}/>
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control"
                    id="title" placeholder="A short description of your event"
                    name="title" onChange={this.getInput} />
                  <small id="emailHelp"
                    class="form-text text-muted">Less than 30 characters</small>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description"
                    rows="6" placeholder="More details about the event"
                    name="description" onChange={this.getInput}></textarea>
                  <small id="emailHelp"
                    class="form-text text-muted">Less than 200 characters</small>
                </div>
              </form>
              <form class="my-3 form-inline">
                <div class="form-group">
                  <label for="date">Date</label>
                  <input type="date" id="date"
                    class="form-control mx-sm-3"
                    name="date" onChange={this.getInput} />
                </div>
                <div class="form-group">
                  <label for="centers">Choose a Center</label>
                  <select id="centers" class="form-control ml-md-3" name="centerId" onChange={this.getInput}>
                    <option>choose a center</option>
                    <CenterOptions centers={this.props.centers} />
                  </select>
                </div>
              </form>

              <a class="btn btn-outline-dark" onClick={this.add}>Add</a>
            </div>
          </div>
        </div>

        <footer class="d-block d-sm-none mt-5">
          <div class="container text-white text-center py-5">
            <h1>Ievents</h1>
            <p>Copyright &copy; 2017</p>
          </div>
        </footer>
      </div>
    )
  }
}

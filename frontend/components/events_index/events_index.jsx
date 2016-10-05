import React from 'react';
import EventIndexItemContainer from './events_index_item_container';

class EventsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      pageStart: props.allFilters.offset / 10
    };

    this._changePage = this._changePage.bind(this);
  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.requestUser(this.props.currentUser.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.allFilters);
    let pageStart = nextProps.allFilters.offset / 10;
    this.setState({pageStart});
  }

  _changePage(newPage) {
    this.setState({activePage: newPage});
  }

  _stepPagination(direction) {
    let pageStart = this.state.pageStart;
    if (direction === "prev") {
      pageStart -= 5;
    } else if (direction === "next") {
      pageStart += 5;
    }
    let filters = Object.assign({}, this.props.allFilters);
    filters.offset = pageStart * 10;
    this.props.updateFilters(filters);
  }

  render() {
    console.log(this.state);
    /* eventsList holds 50 events at at time.  Each page will show 10 before
    querying the database for more. shownEvents is a single page */
    let sliceIdx = (this.state.activePage) * 10;
    let totalEvents = this.props.eventsList.length;
    let shownEvents = this.props.eventsList.slice(sliceIdx, sliceIdx + 10);

    let eventListItems = shownEvents.map( singleEvent => {
      let currentUser = this.props.currentUser;
      let isBookmarked = (currentUser && currentUser.bookmarked_event_ids[singleEvent.id]) ? true : false;
      let userTickets = (currentUser && currentUser.ticket_counts[singleEvent.id]) ?
        currentUser.ticket_counts[singleEvent.id] : 0;
      return(
        <EventIndexItemContainer
          key= {`event-index-item-${singleEvent.id}`}
          eventItem={singleEvent}
          isBookmarked={isBookmarked}
          userTickets={userTickets}
          displayType={"browse"}
        />
      );
    });

    let paginationButtons = [];
    paginationButtons.push(
      <div className={`pagination-button
          ${(this.state.pageStart === 0) ? " disabled-button" : ""}`}
        key={"pagination-prev"}
        onClick={() => this._stepPagination("prev")}>
        Prev
      </div>
    );
    for (let i = 0; i < 5; i++) {
      paginationButtons.push(
        <div className={`pagination-button
            ${(totalEvents > 10 * i) ? "" : " disabled-button"}`}
          key={`pagination-${i}`}
          onClick={() => this._changePage(i)}>
          {this.state.pageStart + i + 1}
        </div>
      );
    }
    paginationButtons.push(
      <div className={`pagination-button
          ${(totalEvents >= 50) ? "" : " disabled-button"}`}
          key={"pagination-next"}
          onClick={() => this._stepPagination("next")}>
        Next
      </div>
      );

    return (
      <section className="event-index-container">
        <div className="event-index">
          <ul>
            {eventListItems}
          </ul>
        </div>
        <div className="pagination-controls">
          {paginationButtons}
        </div>
      </section>
    );
  }
}

export default EventsIndex;

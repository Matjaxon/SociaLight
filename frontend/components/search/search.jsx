import React from 'react';
import EventsIndexContainer from '../events_index/events_index_container';
import CategoriesFilter from './categories_filter';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  componentWillUnmount() {
    this.props.clearFilters();
  }

  render () {
    return(
      <section className="search-page">
        <h2>Discover a new experience</h2>
        <div className="search-main-container">
          <section className="search-sidebar">
            <div className="map-search-container">MAP SEARCH AREA</div>
            <CategoriesFilter categories={this.props.categories}
              filteredCategories={this.props.filteredCategories}
              toggleCategoryFilter={this.props.toggleCategoryFilter}/>
          </section>
          <section className="search-events-container">
            <EventsIndexContainer />
          </section>
        </div>
      </section>
    );
  }
}

export default Search;

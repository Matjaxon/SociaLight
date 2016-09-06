import React from 'react';

class CategoryFilterItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.props.fetchFilteredEvents(nextProps.allFilters);
  }

  render() {
    const category = this.props.category;
    return(
      <div className={`category-filter-item` +
          ((this.props.isFiltered) ? " active-filter" : "")}
          onClick={() => this.props.toggleCategoryFilter(category.name)} >
          {category.name}
      </div>
    );
  }
}


export default CategoryFilterItem;

import React from 'react';
import CategoryFilterItemContainer from './category_filter_item_container';

const CategoriesFilter = ({ categories, filteredCategories,
  toggleCategoryFilter, clearFilters }) => {

  const categoryFilterItems = categories.map( category => {
    let isFiltered = filteredCategories.includes(category.name);
    return <CategoryFilterItemContainer key={category.name}
      category={category} isFiltered={isFiltered}
      toggleCategoryFilter={toggleCategoryFilter} />;
  });

  let resetText = "";
  if (filteredCategories.length > 0) {
    resetText = <span className="search-reset" onClick={clearFilters}> - reset</span>;
  }

  return (
    <div className="category-filter-container">
      <h4>Filter By Categories <i className="fa fa-filter" aria-hidden="true"></i>{resetText}</h4>
      <ul>
        { categoryFilterItems }
      </ul>
    </div>

  );
};

export default CategoriesFilter;

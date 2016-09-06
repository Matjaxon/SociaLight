import React from 'react';
import CategoryFilterItemContainer from './category_filter_item_container';

const CategoriesFilter = ({ categories, filteredCategories,
  toggleCategoryFilter }) => {
  const categoryFilterItems = categories.map( category => {
    let isFiltered = filteredCategories.includes(category.name);
    return <CategoryFilterItemContainer key={category.name}
      category={category} isFiltered={isFiltered}
      toggleCategoryFilter={toggleCategoryFilter} />;
  });

  return (
    <div className="category-filter-container">
      <h4>Categories</h4>
      <ul>
        { categoryFilterItems }
      </ul>
    </div>

  );
};

export default CategoriesFilter;

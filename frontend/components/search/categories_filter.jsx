import React from 'react';
import CategoryFilterItem from './category_filter_item';

const CategoriesFilter = ({ categories, filteredCategories,
  toggleCategoryFilter }) => {
  const filteredCategoryNames = filteredCategories.map( category => category.name);
  const categoryFilterItems = categories.map( category => {
    let isFiltered = filteredCategoryNames.includes(category.name);
    return <CategoryFilterItem key={category.name}
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

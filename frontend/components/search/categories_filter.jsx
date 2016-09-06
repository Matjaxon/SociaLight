import React from 'react';
import CategoryFilterItem from './category_filter_item';

const CategoriesFilter = ({ categories, filteredCategories }) => {
  const categoryFilterItems = categories.map( category => {
    let isFiltered = filteredCategories.includes(category.name);
    return <CategoryFilterItem category={category} isFiltered={isFiltered} />;
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

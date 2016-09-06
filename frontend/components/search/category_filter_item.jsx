import React from 'react';

const CategoryFilterItem = ({ category, isFiltered, toggleCategoryFilter}) => {
  // const _handleCategoryClick = (clickedCategory) => {
  //   toggleCategoryFilter(clickedCategory);
  // };
  return(
    <div className={`category-filter-item` +
      ((isFiltered) ? " active-filter" : "")}
      onClick={() => toggleCategoryFilter(category)} >
      {category.name}
    </div>
  );
};

export default CategoryFilterItem;

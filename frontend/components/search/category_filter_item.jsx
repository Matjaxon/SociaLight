import React from 'react';

const CategoryFilterItem = ({ category, isFiltered }) => {
  return(
    <div className={`category-filter-item` +
      ((isFiltered) ? " active-filter" : "")}>
      {category.name}
    </div>
  );
};

export default CategoryFilterItem;

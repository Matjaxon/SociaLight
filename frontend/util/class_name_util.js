// const addClassName = (element, newClass) => {
//   let currentClassName = element.className;
//   element;
// };
export const ClassUtil = {
  addClassName(element, newClassName) {
    if (element.className === "") {
      element.className = newClassName;
    } else {
      element.className += ` ${newClassName}`;
    }
  }
//   removeClassName(element, className) {
//     if (eleme)
//   }
};

export default ClassUtil;

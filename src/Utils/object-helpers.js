export const updateObjectInArray = (item, itemId, objPropName, newObjProp) => {
  return item.map(el => {
    if (el[objPropName] === itemId) {
      return {...el, ...newObjProp}
    }
    return el
  })
}
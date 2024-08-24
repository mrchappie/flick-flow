export function handleFilterLists(listArray) {
  return listArray.filter((list) => {
    // if (list.listName === 'favorites') {
    //   return false;
    // }
    if (list.listName === 'history') {
      return false;
    }
    return true;
  });
}

export function handleWhatListToShow(listsItemIsIn, currentListName) {
  return listsItemIsIn.some((list) => list.listName === currentListName);
}

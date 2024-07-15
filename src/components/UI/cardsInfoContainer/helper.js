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

export function handleWhatListToShow(filteredLists, listsItemIsIn) {
  for (let i = 0; i < listsItemIsIn.length; i++) {
    for (let j = 0; j < filteredLists.length; j++) {
      if (listsItemIsIn[i].listName === filteredLists[j].listName) {
        filteredLists[j].hasMovie = true;
      }
    }
  }

  return filteredLists;
}

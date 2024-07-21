import { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import useFetch from 'utils/hooks/useFetch';
import { useStateStore } from 'utils/services/state/State';
import { checkMediaType } from './helper';

export default function AddToFavorites({ details }) {
  const { itemsInList } = useStateStore();
  const { addItemInList, removeItemFromList } = useStateStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const { response, fetchData } = useFetch({
    body: {
      listName: 'favorites',
      data: details,
      itemType: checkMediaType(details),
    },
  });

  function addToFavorites() {
    console.log(details);
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_ADD_ITEM_TO_LIST,
      customMethod: 'POST',
    });
    setIsFavorite(true);
    addItemInList([{ movieID: details.id, listName: 'favorites' }]);
  }

  function removeFromFavorites() {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_RMV_ITEM_TO_LIST,
      customMethod: 'DELETE',
    });
    setIsFavorite(false);
    removeItemFromList(details, 'favorites');
  }

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  useEffect(() => {
    const itemInList = itemsInList.some((item) => {
      if (item.movieID === details.id && item.listName === 'favorites') {
        return true;
      }
      return false;
    });

    setIsFavorite(itemInList);
  }, [details.id, itemsInList]);

  return (
    <span className="hover:scale-125">
      {isFavorite && (
        <div onClick={removeFromFavorites}>
          <HiHeart className="text-[30px] text-red-500" />
        </div>
      )}

      {!isFavorite && (
        <div onClick={addToFavorites}>
          <HiOutlineHeart className="text-[30px] text-red-500" />
        </div>
      )}
    </span>
  );
}

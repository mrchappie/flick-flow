import { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import useFetch from 'utils/hooks/useFetch';
import { useStateStore } from 'utils/services/state/State';

export default function AddToFavorites({ details }) {
  const itemsInAList = useStateStore((state) => state.itemsInAList);
  const updateItemsInAList = useStateStore((state) => state.updateItemsInAList);
  const [isFavorite, setIsFavorite] = useState(false);

  const { response, fetchData } = useFetch({
    body: { listName: 'favorites', data: details },
  });

  function handleAddToFavorites() {
    fetchData(process.env.REACT_APP_FIREBASE_ADD_ITEM_TO_LIST, 'POST');
    setIsFavorite(true);
  }

  function removeFromFavorites() {
    fetchData(process.env.REACT_APP_FIREBASE_RMV_ITEM_TO_LIST, 'DELETE');
    setIsFavorite(false);
  }

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  // handle what type of icon to shoe for favorites
  function handleMovieAlreadyInFavorites(movieID) {
    const itemInFavorites = itemsInAList.some(
      (item) => item.movieID === movieID && item.listName === 'favorites'
    );
    console.log(itemInFavorites);
    setIsFavorite(itemInFavorites);
  }

  useEffect(() => {
    if (itemsInAList.length > 0) {
      handleMovieAlreadyInFavorites(details.id);
    }
  }, [itemsInAList]);

  return (
    <span>
      {isFavorite && (
        <div onClick={removeFromFavorites}>
          <HiHeart className="text-[30px] hover:scale-125 text-red-500" />
        </div>
      )}

      {!isFavorite && (
        <div onClick={handleAddToFavorites}>
          <HiOutlineHeart className="text-[30px] hover:scale-125 text-red-500" />
        </div>
      )}
    </span>
  );
}

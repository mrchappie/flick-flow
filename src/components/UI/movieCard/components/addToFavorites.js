import { useEffect, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import useFetch from 'utils/hooks/useFetch';
import { useStateStore } from 'utils/services/state/State';
import { checkMediaType } from './helper';
import { motion as m } from 'framer-motion';
import { toast } from 'react-toastify';

export default function AddToFavorites({ details }) {
  const { itemsInList } = useStateStore();
  const { addItemInList, removeItemFromList } = useStateStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const { fetchData } = useFetch({
    body: {
      listName: 'favorites',
      data: details,
      itemType: checkMediaType(details),
    },
  });

  function addToFavorites() {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_ADD_ITEM_TO_LIST,
      customMethod: 'POST',
    }).then((result) => {
      if (result && result.status === 200) {
        setIsFavorite(true);
        addItemInList([{ movieID: details.id, listName: 'favorites' }]);
        toast.success(result.message);
      }
    });
  }

  function removeFromFavorites() {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_RMV_ITEM_FROM_LIST,
      customMethod: 'DELETE',
    }).then((result) => {
      if (result && result.status === 200) {
        setIsFavorite(false);
        removeItemFromList(details, 'favorites');
        toast.success(result.message);
      }
    });
  }

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
    <m.span variants={buttonVariants} whileHover="hover" whileTap="tap">
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
    </m.span>
  );
}

const buttonVariants = {
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.15,
    },
  },
  tap: {
    scale: 0.95,
    rotate: -5,
    transition: {
      duration: 0.15,
      repeatType: 'mirror',
      repeat: 5,
    },
  },
};

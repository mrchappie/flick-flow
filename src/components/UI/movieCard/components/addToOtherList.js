import { useEffect, useState } from 'react';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';
import { motion as m } from 'framer-motion';

export default function AddToOtherList({ details, showModal }) {
  const { updateShowModal, itemsInList, updateDisableScroll } = useStateStore();
  const [isInList, setIsInList] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  // open more lists modal
  function openListsModal(itemDetails) {
    updateShowModal(true);
    updateDisableScroll(true);
    showModal(itemDetails, filteredList);
  }

  // handle which icon to show for more lists
  useEffect(() => {
    const items = itemsInList.filter((item) => {
      if (item.movieID === details.id && item.listName !== 'history') {
        return true;
      }
      return false;
    });

    items.length > 0 ? setIsInList(true) : setIsInList(false);
    setFilteredList(items);
  }, [details.id, itemsInList]);

  return (
    <m.span
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => {
        openListsModal(details);
      }}
      className="hover:scale-125"
    >
      {isInList && <HiBookmark className="text-[30px] text-yellow-500" />}
      {!isInList && (
        <HiOutlineBookmark className="text-[30px] text-yellow-500" />
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

import { useEffect, useState } from 'react';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';

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
    <span
      onClick={() => {
        openListsModal(details);
      }}
      className="hover:scale-125"
    >
      {isInList && <HiBookmark className="text-[30px] text-yellow-500" />}
      {!isInList && (
        <HiOutlineBookmark className="text-[30px] text-yellow-500" />
      )}
    </span>
  );
}

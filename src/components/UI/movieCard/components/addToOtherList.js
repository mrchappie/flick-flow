import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';

export default function AddToOtherList({ details, showModal }) {
  const itemsInAList = useStateStore((state) => state.itemsInAList);

  const updateShowModal = useStateStore((state) => state.updateShowModal);

  // open more lists modal
  function openListsModal(itemDetails) {
    updateShowModal(true);
    showModal(itemDetails, handleMovieAlreadyInAList(itemDetails.id));
  }

  // handle which icon to show for favorites list
  function handleMovieAlreadyInAList(movieID) {
    const itemToReturn = itemsInAList.filter(
      (item) => item.movieID === movieID
    );
    if (itemToReturn.length > 0) {
      return itemToReturn;
    }
    return false;
  }
  return (
    <span
      onClick={() => {
        openListsModal(details, () => {
          handleMovieAlreadyInAList(details.id);
        });
      }}
    >
      {handleMovieAlreadyInAList(details.id) ? (
        <HiBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
      ) : (
        <HiOutlineBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
      )}
    </span>
  );
}

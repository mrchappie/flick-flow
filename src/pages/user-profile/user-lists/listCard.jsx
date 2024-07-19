import { HiOutlineTrash } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import useFetch from 'utils/hooks/useFetch';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
const DB = new ConnectDB();

export function ListCardBlock({ list, removeList }) {
  const user = useStateStore((state) => state.user);

  async function handleListDeletion(list) {
    try {
      await DB.deleteList({ uid: user.uid, list });

      removeList(list);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li className="relative text-3xl font-bold border-2 rounded-lg bg-black/50">
      <div
        onClick={() => {
          handleListDeletion(list);
        }}
        className="absolute cursor-pointer top-3 right-1"
      >
        <HiOutlineTrash />
      </div>
      <Link
        to={`${list.listName}?list_id=${list.listID}`}
        key={list.listID}
        className="w-[200px] h-[200px] center"
      >
        {formatListName(list.listName)}
      </Link>
    </li>
  );
}

export function ListCardInline({ list, onAddToCustomList, isInList, details }) {
  const { fetchData } = useFetch({
    body: { listName: list.listName, data: details },
  });
  const { removeItemFromList } = useStateStore();

  function removeFromFavorites() {
    fetchData(process.env.REACT_APP_FIREBASE_RMV_ITEM_TO_LIST, 'DELETE');
    removeItemFromList(details, list.listName);
  }

  return (
    <li
      onClick={onAddToCustomList}
      key={list.listID}
      className="relative w-full py-2 text-xl font-bold text-white transition-transform bg-gray-500 border-2 rounded-lg cursor-pointer center hover:scale-95"
    >
      {formatListName(list.listName)}
      {isInList && (
        <div
          onClick={removeFromFavorites}
          className="p-2 text-black bg-white rounded-lg"
        >
          <HiXMark />
        </div>
      )}
    </li>
  );
}

function formatListName(listName) {
  const trimedName = listName.replaceAll('_', ' ');
  return trimedName.slice(0, 1).toUpperCase() + trimedName.slice(1);
}

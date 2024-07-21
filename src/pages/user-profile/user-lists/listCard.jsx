import { HiOutlineTrash } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
const DB = new ConnectDB();

export function ListCardBlock({ list, removeList }) {
  const { userData } = useStateStore();

  async function handleListDeletion(list) {
    try {
      await DB.deleteList({ uid: userData.uid, list });

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

export function ListCardInline({
  list,
  onAddToCustomList,
  onRmvFromCustomList,
  isInList,
}) {
  return (
    <li
      onClick={onAddToCustomList}
      key={list.listID}
      className={`relative w-full py-2 text-xl font-bold text-white transition-transform bg-gray-500 border-2 rounded-lg cursor-pointer center ${
        !isInList ? 'hover:scale-95' : ''
      }`}
      style={{ borderColor: isInList ? 'green' : '' }}
    >
      {formatListName(list.listName)}
      {isInList && (
        <div
          onClick={onRmvFromCustomList}
          className="p-2 text-black bg-white rounded-lg hover:scale-125"
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

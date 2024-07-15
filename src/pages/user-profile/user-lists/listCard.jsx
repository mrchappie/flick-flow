import { HiOutlineTrash } from 'react-icons/hi';
import { HiCheckCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
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
        {list.listName}
      </Link>
    </li>
  );
}

export function ListCardInline({ list, onAddToCustomList }) {
  return (
    <li
      onClick={onAddToCustomList}
      key={list.listID}
      className="relative w-full py-2 text-xl font-bold text-white bg-gray-500 border-2 rounded-lg cursor-pointer center"
    >
      {list.listName}
      {list.hasMovie && <HiCheckCircle />}
    </li>
  );
}

import { HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
const DB = new ConnectDB();

export function ListCardBlock({ list, removeList }) {
  const user = useStateStore((state) => state.user);

  async function handleListDeletion(list) {
    await DB.deleteFirestoreDocFromArray(['users', user.uid], list);
    removeList(list);
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
      <Link to={list.listID} className="w-[200px] h-[200px] center">
        {list.listName}
      </Link>
    </li>
  );
}

export function ListCardInline({ list, data }) {
  const user = useStateStore((state) => state.user);

  async function handleAddToList() {
    await DB.setFirestoreDoc(
      ['lists', user.uid, list.listID, data.movieID],
      data
    );
    // console.log(data);
  }

  return (
    <li
      onClick={handleAddToList}
      className="relative w-full py-2 text-xl font-bold text-black border-2 rounded-lg cursor-pointer center"
    >
      {list.listName}
    </li>
  );
}

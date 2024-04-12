import { HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function ListCard({ list, removeList }) {
  const DB = new ConnectDB();
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
      <Link to={list.listName} className="w-[200px] h-[200px] center">
        {list.listName}
      </Link>
    </li>
  );
}

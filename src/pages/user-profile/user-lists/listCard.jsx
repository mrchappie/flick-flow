import { HiOutlineTrash } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';
import { useStateStore } from 'utils/services/state/State';
import { capitalizeWords } from 'utils/utils';

export function ListCardBlock({ list, removeList }) {
  const { userData } = useStateStore();
  const { fetchData } = useFetch({});

  async function handleListDeletion(list) {
    try {
      fetchData({
        customURL: process.env.REACT_APP_FIREBASE_DELETE_LIST,
        customMethod: 'DELETE',
        customBody: { data: { uid: userData.uid, ...list } },
      }).then((result) => {
        if (result && result.status === 200) {
          removeList(list);
          toast.success('List deleted successfully!');
        }
      });
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
        className="w-[200px] h-[200px] text-center center p-4"
      >
        {capitalizeWords(list.listName)}
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
      {capitalizeWords(list.listName)}
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

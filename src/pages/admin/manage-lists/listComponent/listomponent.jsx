import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { useState } from 'react';
import { HiEllipsisHorizontal, HiOutlineSquare2Stack } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';
import { trimText } from 'utils/utils';

export default function ListComponent({ list }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { userData } = useStateStore();

  function handleToggleMoreOptions() {
    setShowMoreOptions(!showMoreOptions);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-sm max-w-[1400px]">
      {/* <div
        className={`absolute w-2 h-full ${getUserColor(list.role)} z-10`}
      ></div> */}
      <div className="grid w-full grid-cols-6 gap-4 px-4 text-black bg-gray-400">
        <span className="py-3 font-bold">
          {list.userID === userData.uid ? `${list.name} (yours)` : list.name}
        </span>
        <span className="py-3 italic">{formatDate(list.createdAt)}</span>
        <span className="py-3 italic">{formatDate(list.updatedAt)}</span>
        <span className="flex flex-row py-3">
          <div className="flex-1">{trimText(list.listID, 10)}...</div>
          <button className="flex-1 text-2xl origin-left hover:scale-90">
            <HiOutlineSquare2Stack />
          </button>
        </span>
        <span className="flex flex-row py-3">
          <div className="flex-1">{trimText(list.userID, 10)}...</div>
          <button className="flex-1 text-2xl origin-left hover:scale-90">
            <HiOutlineSquare2Stack />
          </button>
        </span>
        <div className="relative center">
          <button
            onClick={handleToggleMoreOptions}
            className="p-2 text-xl border border-black rounded-full hover:bg-black hover:text-white"
          >
            <HiEllipsisHorizontal />
          </button>
          {showMoreOptions && (
            <div
              className="absolute flex gap-2 bg-gray-400 shadow-xl"
              onMouseLeave={handleToggleMoreOptions}
            >
              <ButtonTextBg title="Edit" />
              <ButtonTextBg title="Disable" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getUserColor(role) {
  switch (role) {
    case 'admin':
      return 'bg-green-500';
    case 'disabled':
      return 'bg-red-500';
    default:
      return 'bg-yellow-500';
  }
}

function formatDate(date) {
  if (date) {
    const dateToSplit = new Date(date).toISOString();
    return dateToSplit.split('T')[0];
  } else {
    return 'N/A';
  }
}

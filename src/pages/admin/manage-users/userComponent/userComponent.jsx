import { useState } from 'react';
import { HiMiniPencilSquare, HiOutlineSquare2Stack } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';
import { trimText } from 'utils/utils';
import { useModal } from 'utils/modals/ModalContext';

export default function UserComponent({ user }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { userData } = useStateStore();
  const { openModal } = useModal();

  function handleToggleMoreOptions() {
    setShowMoreOptions(!showMoreOptions);
    openModal('EditUser', { user: user });
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm max-w-[1400px] ${
        user.disabled && 'opacity-50'
      }`}
    >
      <div
        className={`absolute w-2 h-full ${getUserColor(user.role)} z-10`}
      ></div>
      <div className="grid w-full grid-cols-5 gap-4 px-4 text-black bg-gray-400">
        <span className="py-3 font-bold">
          {user.name === userData.name ? `${user.name} (you)` : user.name}
        </span>
        <span className="py-3 italic">{user.role}</span>
        <span className="flex flex-row py-3">
          <div className="flex-1">{trimText(user.uid, 10)}...</div>
          <button className="flex-1 text-2xl origin-left hover:scale-90">
            <HiOutlineSquare2Stack />
          </button>
        </span>
        <span className="py-3 font-bold">{user.email}</span>
        <div className="relative center">
          <button
            onClick={handleToggleMoreOptions}
            className="p-2 text-xl rounded-full hover:bg-black hover:text-white"
          >
            <HiMiniPencilSquare />
          </button>
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

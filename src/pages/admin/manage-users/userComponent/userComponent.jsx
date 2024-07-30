import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { useEffect, useState } from 'react';
import { HiEllipsisHorizontal, HiOutlineSquare2Stack } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';
import { trimText } from 'utils/utils';
import DisableUser from './disableUser';
import { useModal } from 'utils/modals/ModalContext';
import useFetch from 'utils/hooks/useFetch';
import { toast } from 'react-toastify';

export default function UserComponent({ user }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { userData } = useStateStore();
  const { openModal } = useModal();

  function handleToggleMoreOptions() {
    setShowMoreOptions(!showMoreOptions);
  }

  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
      toast.success(response.message);
    }
  }, [response]);

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
            className="p-2 text-xl border border-black rounded-full hover:bg-black hover:text-white"
          >
            <HiEllipsisHorizontal />
          </button>
          {showMoreOptions && (
            <div
              className="absolute flex gap-2 bg-gray-400 shadow-xl"
              onMouseLeave={handleToggleMoreOptions}
            >
              <ButtonTextBg
                title="Edit"
                handleClick={() => {
                  openModal('EditUser', { user: user });
                }}
              />
              <DisableUser userToDisable={user} />
              <ButtonTextBg
                title={'Delete'}
                handleClick={() => {
                  fetchData({
                    customURL: process.env.REACT_APP_FIREBASE_DELETE_USER,
                    customMethod: 'DELETE',
                    customBody: { data: { uid: user.uid } },
                  });
                }}
              />
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

import { HiXMark } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';

export default function Modal({ children }) {
  const { updateShowModal, updateDisableScroll, showModal } = useStateStore();

  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      updateShowModal(false);
      updateDisableScroll(false);
    }
  }

  return (
    <>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className="fixed top-0 left-0 z-50 w-screen h-screen cursor-pointer bg-black/50 center"
        >
          <div className="relative p-4 rounded-md bg-white/75 w-max">
            <span
              onClick={handleCloseModal}
              className="absolute text-3xl top-[-10px] right-[-10px] p-2 bg-red-400 rounded-full"
            >
              <HiXMark />
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

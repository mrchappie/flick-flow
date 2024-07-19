import { HiXMark } from 'react-icons/hi2';
import { useStateStore } from 'utils/services/state/State';

export default function Modal({ children }) {
  const { showModal } = useStateStore();
  const { updateShowModal } = useStateStore();

  function handleCloseModal(e) {
    if (e.target === e.currentTarget) {
      updateShowModal(!showModal);
    }
  }

  return (
    <>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className="fixed top-0 left-0 z-50 w-screen h-screen cursor-pointer bg-black/50 center"
        >
          <div className="max-w-[400px] bg-white/75 p-4 rounded-md relative">
            <span
              onClick={handleCloseModal}
              className="absolute text-3xl top-[-10px] right-[-10px] p-2 bg-red-400 rounded-full"
            >
              <HiXMark />
            </span>
            <h1 className="text-3xl font-bold text-center text-black">
              Click the list you want to add this movie:
            </h1>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

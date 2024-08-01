import TestModal from 'components/UI/modals/testModal';
import { useModal } from './ModalContext';
import CreateUser from 'components/UI/modals/createUser/createUser';
import { HiXMark } from 'react-icons/hi2';
import EditUser from 'components/UI/modals/editUser/editUser';
import Confirmation from 'components/UI/modals/confirmation/confirmation';

const ModalLookup = {
  TestModal: TestModal,
  CreateUser: CreateUser,
  EditUser: EditUser,
  Confirmation: Confirmation,
};

export default function ModalManager() {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  const Modal = ModalLookup[modal.name];

  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/80 center"
    >
      <div className="relative p-4 rounded-md bg-white/75 w-max">
        <span
          onClick={closeModal}
          className="absolute text-3xl top-[-10px] cursor-pointer right-[-10px] p-2 bg-brand1 rounded-full"
        >
          <HiXMark />
        </span>
        <Modal closeModal={closeModal} {...modal.props} />
      </div>
    </div>
  );
}

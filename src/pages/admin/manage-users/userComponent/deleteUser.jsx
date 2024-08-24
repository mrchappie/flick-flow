import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';
import { useModal } from 'utils/modals/ModalContext';

export default function DeleteUser({ userToDelete }) {
  const { fetchData } = useFetch({});
  const { closeModal } = useModal();

  return (
    <ButtonTextBg
      handleClick={() => {
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_DELETE_USER,
          customMethod: 'DELETE',
          customBody: { data: { uid: userToDelete.uid } },
        }).then((result) => {
          if (result) {
            toast.success(result.message);
            closeModal('outside');
          }
        });
      }}
      title={`Delete`}
    />
  );
}

import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';
import { useModal } from 'utils/modals/ModalContext';

export default function DisableUser({ userToDisable }) {
  const { fetchData } = useFetch({});
  const { closeModal } = useModal();

  return (
    <ButtonTextBg
      handleClick={() => {
        console.log(userToDisable);
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
          customMethod: 'PUT',
          customBody: { data: { uid: userToDisable.uid, disabled: true } },
        }).then((result) => {
          if (result) {
            toast.success(result.message);
            closeModal('outside');
          }
        });
        userToDisable.disabled = !userToDisable.disabled;
      }}
      title={`${!userToDisable.disabled ? 'Disable' : 'Enable'}`}
    />
  );
}

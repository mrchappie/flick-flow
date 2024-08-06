import { ButtonTextBg } from 'components/UI/buttons/buttons';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';
import { useModal } from 'utils/modals/ModalContext';

export default function DeleteUser({ userToDelete }) {
  const { response, fetchData } = useFetch({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (response) {
      console.log(response);
      toast.success(response.message);
      closeModal('outside');
    }
  }, [response]);

  return (
    <ButtonTextBg
      handleClick={() => {
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_DELETE_USER,
          customMethod: 'DELETE',
          customBody: { data: { uid: userToDelete.uid } },
        });
      }}
      title={`Delete`}
    />
  );
}

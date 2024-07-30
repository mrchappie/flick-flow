import { ButtonTextBg } from 'components/UI/buttons/buttons';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';

export default function DisableUser({ userToDisable }) {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
      toast.success(response.message);
    }
  }, [response]);

  return (
    <ButtonTextBg
      handleClick={() => {
        console.log(userToDisable);
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
          customMethod: 'PUT',
          customBody: { data: { uid: userToDisable.uid, disabled: true } },
        });
        userToDisable.disabled = !userToDisable.disabled;
      }}
      title={`${!userToDisable.disabled ? 'Disable' : 'Enable'}`}
    />
  );
}

import { ButtonTextBg } from 'components/UI/buttons/buttons';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';

export default function DisableUser({ userData }) {
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
        console.log(userData);
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
          customMethod: 'PUT',
          customBody: { data: { uid: userData.uid, disabled: true } },
        });
        userData.disabled = !userData.disabled;
      }}
      title={`${!userData.disabled ? 'Disable' : 'Enable'}`}
    />
  );
}

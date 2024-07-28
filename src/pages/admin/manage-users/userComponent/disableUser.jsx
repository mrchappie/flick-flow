import { ButtonTextBg } from 'components/UI/buttons/buttons';
import React, { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';

export default function DisableUser({ userData }) {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
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
      }}
      title="Disable"
    />
  );
}

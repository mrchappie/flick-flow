import { ButtonTextBg } from 'components/UI/buttons/buttons';
<<<<<<< Updated upstream
import React, { useEffect } from 'react';
=======
import { useEffect } from 'react';
import { toast } from 'react-toastify';
>>>>>>> Stashed changes
import useFetch from 'utils/hooks/useFetch';

export default function DisableUser({ userData }) {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
<<<<<<< Updated upstream
=======
      toast.success(response.message, { closeButton: true });
>>>>>>> Stashed changes
    }
  }, [response]);

  function handleDisableUser() {
    console.log(userData);
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
      customMethod: 'PUT',
      customBody: {
        data: { uid: userData.uid, disabled: !userData.disabled },
      },
    });

    userData.disabled = !userData.disabled;
  }

  return (
    <ButtonTextBg
<<<<<<< Updated upstream
      handleClick={() => {
        console.log(userData);
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
          customMethod: 'PUT',
          customBody: { data: { uid: userData.uid, disabled: true } },
        });
      }}
      title="Disable"
=======
      handleClick={handleDisableUser}
      title={`${!userData.disabled ? 'Disable' : 'Enable'}`}
>>>>>>> Stashed changes
    />
  );
}

import { ButtonTextBg } from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';

export default function Dashboard() {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <div>
      <Heading title={'dashboard'} />
      <ButtonTextBg
        handleClick={() => {
          fetchData({
            customMethod: 'PATCH',
            customBody: {
              userIDToGiveRole: '',
              userRole: 'user',
            },
            customURL: process.env.REACT_APP_FIREBASE_SET_USER_ROLE,
          });
        }}
      >
        Click
      </ButtonTextBg>
    </div>
  );
}

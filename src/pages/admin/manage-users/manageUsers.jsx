import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';
import UserComponent from './userComponent/userComponent';

export default function ManageUsers() {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <div>
      Manage Users
      <br />
      <ButtonTextNoBgWithBorder
        handleClick={() => {
          fetchData({
            customURL: process.env.REACT_APP_FIREBASE_EXPORT_USER_DATA,
          });
        }}
      >
        Load Users
      </ButtonTextNoBgWithBorder>
      <div className="gap-4 center-col">
        <div className="grid w-full grid-cols-6 gap-4">
          <span>Name</span>
          <span>Role</span>
          <span>UID</span>
          <span>Email</span>
        </div>
        {response &&
          response.data.map((user) => {
            return <UserComponent user={user} />;
          })}
      </div>
    </div>
  );
}

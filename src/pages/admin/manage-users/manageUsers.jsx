import {
  ButtonTextBg,
  ButtonTextNoBgWithBorder,
} from 'components/UI/buttons/buttons';
import { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';
import UserComponent from './userComponent/userComponent';
import { Heading } from 'components/UI/heading/heading';
import { toast } from 'react-toastify';
import { useStateStore } from 'utils/services/state/State';
import CreateUser from './userComponent/createUser';

export default function ManageUsers() {
  const { response, fetchData } = useFetch({});
  const { updateShowModal } = useStateStore();

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <>
      <div className="center">
        <Heading title="Manage Users" />
        <div className="gap-4 center grow">
          <ButtonTextNoBgWithBorder
            handleClick={() => {
              fetchData({
                customURL: process.env.REACT_APP_FIREBASE_EXPORT_USERS_DATA,
              });
            }}
            title="Load Users"
          />
          <ButtonTextBg
            title="Add User"
            handleClick={() => {
              updateShowModal(true);
            }}
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="gap-4 center-col">
        <div className="grid w-full grid-cols-5 gap-4 px-4 mt-2 font-bold max-w-[1400px]">
          <span>Name</span>
          <span>Role</span>
          <span>UID</span>
          <span>Email</span>
        </div>
        {response &&
          response.data.map((user) => {
            return <UserComponent user={user} key={user.uid} />;
          })}
      </div>
      <CreateUser />
    </>
  );
}

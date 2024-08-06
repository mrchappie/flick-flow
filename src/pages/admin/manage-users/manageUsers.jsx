import {
  ButtonTextBg,
  ButtonTextNoBgWithBorder,
} from 'components/UI/buttons/buttons';
import useFetch from 'utils/hooks/useFetch';
import UserComponent from './userComponent/userComponent';
import { Heading } from 'components/UI/heading/heading';
import { useModal } from 'utils/modals/ModalContext';
import AdminSearchBar from '../components/adminSearchBar/adminSearchBar';

export default function ManageUsers() {
  const { response, fetchData } = useFetch({});
  const { openModal } = useModal();

  return (
    <>
      <div className="center">
        <Heading title="Manage Users" />
        <div className="gap-4 center">
          <AdminSearchBar />
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
              openModal('CreateUser');
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
    </>
  );
}

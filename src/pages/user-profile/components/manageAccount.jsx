import { ButtonTextBg } from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import { TagWithBorder } from 'components/UI/tags/tags';

export default function ManageAccount({ userData }) {
  return (
    <div className="col-start-4 col-end-7 row-start-1 row-end-4 p-4 bg-black/50 rounded-2xl">
      <Heading title={'Manage your account'} />
      <hr />
      <div className="p-4 center-col">
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Role</span>
          <TagWithBorder>{userData && userData.role}</TagWithBorder>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Delete account</span>
          <ButtonTextBg customStyle={'min-w-[100px]'}>Delete</ButtonTextBg>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Change email</span>
          <ButtonTextBg customStyle={'min-w-[100px]'}>Change</ButtonTextBg>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Change password</span>
          <ButtonTextBg customStyle={'min-w-[100px]'}>Change</ButtonTextBg>
        </div>
      </div>
    </div>
  );
}

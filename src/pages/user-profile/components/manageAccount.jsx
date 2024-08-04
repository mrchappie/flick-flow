import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading } from 'components/UI/heading/heading';
import { TagWithBorder } from 'components/UI/tags/tags';
import { toast } from 'react-toastify';
import { useModal } from 'utils/modals/ModalContext';

export default function ManageAccount({ loggedUserData }) {
  const { openModal, closeModal } = useModal();

  function handleDeleteAccount() {
    toast.success('Account deleted!');
    closeModal('outside');
    openModal('TestModal');
  }
  function handleChangeEmail() {
    toast.success('Email changed!');
    closeModal('outside');
    openModal('ChangeCredentials', {
      title: 'Are you sure you want to change your email?',
      subTitle: `Please enter current credentials and your new email`,
      credType: 'email',
    });
  }
  function handleChangePassword() {
    toast.success('Password changed!');
    closeModal('outside');
    openModal('ChangeCredentials', {
      title: 'Are you sure you want to change your password?',
      subTitle: `Please enter current credentials and your new password`,
      credType: 'password',
    });
  }

  return (
    <div className="col-start-4 col-end-7 row-start-1 row-end-4 p-4 bg-black/50 rounded-2xl">
      <Heading title={'Manage your account'} />
      <hr />
      <div className="p-4 center-col">
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Role</span>
          <TagWithBorder>{loggedUserData && loggedUserData.role}</TagWithBorder>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Delete account</span>
          <ButtonTextBg
            handleClick={() => {
              openModal('Confirmation', {
                title: `Are you sure you want to delete your account?`,
                subTitle: `This action is irreversible!`,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                onConfirm: () => {
                  handleDeleteAccount();
                },
              });
            }}
            customStyle={'min-w-[100px]'}
          >
            Delete
          </ButtonTextBg>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Change email</span>
          <ButtonTextBg
            handleClick={() => {
              openModal('Confirmation', {
                title: `Are you sure you want to change your email?`,
                subTitle: `This action is irreversible!`,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                onConfirm: () => {
                  handleChangeEmail();
                },
              });
            }}
            customStyle={'min-w-[100px] bg-brand4 border-brand4'}
          >
            Change
          </ButtonTextBg>
        </div>
        <div className="justify-between w-full center">
          <span className="flex-grow text-xl">Change password</span>
          <ButtonTextBg
            handleClick={() => {
              openModal('Confirmation', {
                title: `Are you sure you want to change your password?`,
                subTitle: `This action is irreversible!`,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                onConfirm: () => {
                  handleChangePassword();
                },
              });
            }}
            customStyle={'min-w-[100px] bg-brand4 border-brand4'}
          >
            Change
          </ButtonTextBg>
        </div>
      </div>
    </div>
  );
}

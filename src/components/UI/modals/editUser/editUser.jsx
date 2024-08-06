import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';
import P from 'components/UI/typography/p/P';
import DeleteUser from 'pages/admin/manage-users/userComponent/deleteUser';
import DisableUser from 'pages/admin/manage-users/userComponent/disableUser';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';

export default function EditUser({ user, closeModal }) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: user.email ?? '',
      displayName: user.name ?? '',
      phoneNumber: user.phoneNumber ?? '',
      photoURL: user.photoURL ?? '',
      disabled: user.disabled ?? '',
    },
  });
  const { response, fetchData } = useFetch({});

  console.log(user);

  async function handleUpdateProfile(formData) {
    try {
      // write this logic in the cloud
      const validFormData = Object.fromEntries(
        Object.entries(formData).filter((item) => item[1] !== '')
      );

      fetchData({
        customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
        customMethod: 'PUT',
        customBody: { data: { ...validFormData, uid: user.uid } },
      });
    } catch (error) {
      console.log(error);
    } finally {
      // closeModal();
    }
  }

  useEffect(() => {
    if (response) {
      toast(response.message);
    }
  }, [response]);

  return (
    <>
      <div>
        <Heading2 title={'Update user data'} />
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="items-stretch h-full center-col gap-4"
        >
          {formData.map((input) => {
            return (
              <label
                key={input.name}
                className="center text-black w-[400px] h-10"
              >
                <input
                  {...register(input.name, { required: input.required })}
                  type={input.type}
                  placeholder={input.placeholder}
                  className="w-full h-full text-black"
                />
              </label>
            );
          })}
          <ButtonTextBg
            type="submit"
            disabled={!isDirty || !isValid}
            customStyle={'w-full'}
          >
            Update
          </ButtonTextBg>
        </form>
      </div>
      <hr className="my-4 border-black w-full" />
      <div className="center-col gap-4 w-full text-black">
        <div className="center justify-between w-full">
          <p>
            Disable user <span className="font-bold italic">{user.name}</span>
          </p>
          <DisableUser userToDisable={user} />
        </div>
        <div className="center justify-between w-full">
          <p>
            Delete user <span className="font-bold italic">{user.name}</span>
          </p>
          <DeleteUser userToDelete={user} />
        </div>
      </div>
    </>
  );
}

const formData = [
  { type: 'input', name: 'email', required: true, placeholder: 'Email' },
  // {
  //   type: 'checkbox',
  //   name: 'emailVerified',
  //   required: false,
  //   placeholder: 'Email Verified',
  // },
  {
    type: 'input',
    name: 'phoneNumber',
    required: false,
    placeholder: 'Phone Number',
  },
  { type: 'input', name: 'password', required: true, placeholder: 'Password' },
  {
    type: 'input',
    name: 'displayName',
    required: true,
    placeholder: 'Display Name',
  },
  {
    type: 'input',
    name: 'photoURL',
    required: false,
    placeholder: 'Photo URL',
  },
  // {
  //   type: 'checkbox',
  //   name: 'disabled',
  //   required: false,
  //   placeholder: 'Disable user',
  // },
];

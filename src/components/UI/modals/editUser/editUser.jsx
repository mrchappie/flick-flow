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
  const {
    handleSubmit: handleSubmitUserRole,
    register: registerUserRole,
    formState: { isDirty: isDirtyUserRole, isValid: isValidUserRole },
  } = useForm({
    mode: 'onChange',
  });
  const { fetchData } = useFetch({});

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
      }).then((result) => {
        if (result) {
          toast.info(result.message);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      // closeModal();
    }
  }
  async function handleSetUserRole(formData) {
    try {
      fetchData({
        customURL: process.env.REACT_APP_FIREBASE_SET_USER_ROLE,
        customMethod: 'PATCH',
        customBody: {
          data: { userRole: formData.userRole, userIDToGiveRole: user.uid },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      // closeModal();
    }
  }

  return (
    <>
      <div>
        <Heading2 title={'Update user data'} />
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="items-stretch h-full gap-4 center-col"
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
      <hr className="w-full my-4 border-black" />
      <div className="w-full gap-4 text-black center-col">
        <div className="justify-between w-full center">
          <p>
            Disable user <span className="italic font-bold">{user.name}</span>
          </p>
          <DisableUser userToDisable={user} />
        </div>
        <div className="justify-between w-full center">
          <p>
            Delete user <span className="italic font-bold">{user.name}</span>
          </p>
          <DeleteUser userToDelete={user} />
        </div>
        <hr className="w-full my-4 border-black" />
        <form
          onSubmit={handleSubmitUserRole(handleSetUserRole)}
          className="w-full"
        >
          <label className="justify-between w-full h-10 text-black center">
            <span className="w-[100px]">Set user Role</span>
            <select
              {...registerUserRole('userRole', { required: true })}
              type="text"
              className="h-full text-black"
              defaultValue={user.role}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <ButtonTextBg
              type="submit"
              disabled={!isDirtyUserRole || !isValidUserRole}
              customStyle={'bg-brand4 border-brand4'}
            >
              Update
            </ButtonTextBg>
          </label>
        </form>
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

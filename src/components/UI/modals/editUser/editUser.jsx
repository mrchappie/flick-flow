import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';

export default function EditUser({ user }) {
  const { handleSubmit, register } = useForm({
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
      fetchData({
        customURL: process.env.REACT_APP_FIREBASE_UPDATE_USER_DATA,
        customMethod: 'PUT',
        customBody: { data: formData },
      });
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (response) {
      toast(response.message);
    }
  }, [response]);

  return (
    <>
      <Heading2 title={'Update user data'} />
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="items-stretch h-full center-col"
      >
        {formData.map((input) => {
          return (
            <label key={input.name} className="flex text-black w-[400px] h-10">
              {input.type === 'checkbox' && (
                <span className="w-fit">{input.placeholder}</span>
              )}
              <input
                {...register(input.name, { required: input.required })}
                type={input.type}
                placeholder={input.placeholder}
                className="w-full h-full text-black"
              />
            </label>
          );
        })}
        <ButtonTextBg type="submit">Update</ButtonTextBg>
      </form>
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
  {
    type: 'checkbox',
    name: 'disabled',
    required: false,
    placeholder: 'Disable user',
  },
];

import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useFetch from 'utils/hooks/useFetch';

export default function CreateUser() {
  const { handleSubmit, register } = useForm();
  const { response, fetchData } = useFetch({});

  async function handleCreateProfile(formData) {
    try {
      fetchData({
        customURL: process.env.REACT_APP_FIREBASE_CREATE_USER,
        customMethod: 'POST',
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
      <Heading2 title={'New User Data'} />
      <form
        onSubmit={handleSubmit(handleCreateProfile)}
        className="items-stretch h-full center-col"
      >
        {formData.map((input) => {
          return (
            <input
              {...register(input.name, { required: input.required })}
              type={input.type}
              placeholder={input.placeholder}
              key={input.name}
              className="text-black w-[400px] h-10"
            />
          );
        })}
        <ButtonTextBg type="submit">Save</ButtonTextBg>
      </form>
    </>
  );
}

const formData = [
  { type: 'input', name: 'email', required: true, placeholder: 'Email' },
  //   {
  //     type: 'checkbox',
  //     name: 'emailVerified',
  //     required: false,
  //     placeholder: 'Email Verified',
  //   },
  //   {
  //     type: 'input',
  //     name: 'phoneNumber',
  //     required: false,
  //     placeholder: 'Phone Number',
  //   },
  { type: 'input', name: 'password', required: true, placeholder: 'Password' },
  {
    type: 'input',
    name: 'displayName',
    required: true,
    placeholder: 'Display Name',
  },
  //   {
  //     type: 'input',
  //     name: 'photoURL',
  //     required: false,
  //     placeholder: 'Photo URL',
  //   },
  //   {
  //     type: 'checkbox',
  //     name: 'disabled',
  //     required: false,
  //     placeholder: 'Disabled',
  //   },
];

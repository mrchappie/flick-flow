import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';
import P from 'components/UI/typography/p/P';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ChangeCredentials({
  closeModal,
  title,
  subTitle,
  credType,
}) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({});

  async function handleCreateProfile(formData) {
    if (credType === 'email') {
      console.log(formData);
    } else {
      console.log(formData);
    }
  }

  const formData =
    credType === 'email' ? formDataForEmail : formDataForPassword;

  return (
    <>
      <Heading2 title={title} />
      <P>{subTitle}</P>
      <form
        onSubmit={handleSubmit(handleCreateProfile)}
        className="items-stretch h-full center-col"
      >
        {formData.map((input) => {
          return (
            <label className="relative flex flex-col py-2">
              <input
                {...register(input.name, {
                  required: 'This field is required!',
                  validate: (value) => {
                    if (input.name === 'conf_password') {
                      if (watch('password') !== value) {
                        return 'Passwords do not match';
                      }
                    }
                  },
                })}
                type={input.type}
                placeholder={input.placeholder}
                key={input.name}
                className="text-black w-[400px] h-10"
              />

              <span className="absolute bottom-[-10px] left-0 text-red-600">
                {errors[input.name] && errors[input.name].message}
              </span>
            </label>
          );
        })}
        <ButtonTextBg type="submit">Save</ButtonTextBg>
      </form>
    </>
  );
}

const formDataForEmail = [
  {
    type: 'text',
    name: 'email',
    required: true,
    placeholder: 'Email',
  },
  {
    type: 'text',
    name: 'password',
    required: true,
    placeholder: 'Password',
  },
  {
    type: 'text',
    name: 'conf_password',
    required: true,
    placeholder: 'Confirm Password',
  },
  {
    type: 'text',
    name: 'new_email',
    required: true,
    placeholder: 'New Email',
  },
];

const formDataForPassword = [
  {
    type: 'text',
    name: 'email',
    required: true,
    placeholder: 'Email',
  },
  {
    type: 'text',
    name: 'password',
    required: true,
    placeholder: 'Password',
  },
  {
    type: 'text',
    name: 'conf_password',
    required: true,
    placeholder: 'Confirm Password',
  },
  {
    type: 'text',
    name: 'new_password',
    required: true,
    placeholder: 'New Password',
  },
];

import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';
import P from 'components/UI/typography/p/P';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCamera } from 'react-icons/hi2';

export default function AddBanner({ title, subTitle, addCustomBanner }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm({});
  const [imgURL, setImageURL] = useState('');

  async function handleSubmitBanner(formData) {
    addCustomBanner(formData['new-banner'][0]);
  }

  const MAX_FILE_SIZE = 2048; // in KB

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].size < MAX_FILE_SIZE * 1024) {
        setImageURL(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  // function validateFile(value) {
  //   console.log(value[0].size > MAX_FILE_SIZE * 1024);
  //   if (value[0].size > MAX_FILE_SIZE * 1024) {
  //     return `Image size exceeds the maximum size, please choose another image`;
  //   }
  // }

  return (
    <>
      <Heading2 title={title} />
      <P>{subTitle}</P>
      <form
        onSubmit={handleSubmit(handleSubmitBanner)}
        className="items-stretch h-full center"
      >
        <label className="relative flex flex-col py-2">
          <input
            {...register('new-banner', {
              required: 'This field is required!',
              onChange: (e) => {
                handleFileChange(e);
              },
              validate: (value) => {
                if (value[0].size > MAX_FILE_SIZE * 1024) {
                  return `Image size exceeds the maximum size of ${MAX_FILE_SIZE} KB.`;
                }
                return true;
              },
            })}
            type="file"
            key="new-banner"
            className="h-10 text-black"
          />

          <span className="absolute bottom-[-10px] left-0 text-red-600">
            {errors['new-banner'] && errors['new-banner'].message}
          </span>
        </label>

        <ButtonTextBg type="submit" disabled={!isDirty || !isValid}>
          Upload New Banner
        </ButtonTextBg>
      </form>

      <div className="w-[400px] aspect-video shadow-md center text-[40px] bg-gray-500">
        {imgURL ? (
          <img src={imgURL} alt="" className="object-cover w-full h-full" />
        ) : (
          <HiOutlineCamera />
        )}
      </div>
    </>
  );
}

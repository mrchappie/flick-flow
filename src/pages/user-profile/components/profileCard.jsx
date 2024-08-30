import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { useForm } from 'react-hook-form';
import ConnectDB from 'utils/services/crud/crud';
import ProfilePicture from './profilePicture';
import { useStateStore } from 'utils/services/state/State';
import { twMerge } from 'tailwind-merge';

const DB = new ConnectDB();

export default function ProfileCard({ loggedUserData, customStyle }) {
  const { handleSubmit, register, setValue } = useForm();
  const { updateUserData } = useStateStore();

  if (loggedUserData) {
    setValue('name', loggedUserData.name);
    setValue('username', loggedUserData.username);
  }

  async function handleUpdateProfile(formData) {
    try {
      // attempt to login the user
      const response = await DB.updateFirestoreDoc(
        ['users', loggedUserData.uid],
        formData
      );
      updateUserData({
        ...loggedUserData,
        name: formData.name,
        username: formData.username,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={twMerge(
        `p-4 bg-black/50 rounded-2xl center-col ${customStyle}`
      )}
    >
      <ProfilePicture loggedUserData={loggedUserData} />
      <div>
        <h1 className="text-2xl font-semibold">
          {loggedUserData && loggedUserData.name}
        </h1>
      </div>
      <div className="mt-[50px]">
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="h-full center-col"
        >
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className="text-black w-[300px] max-sm:w-[200px] h-10"
          />
          <input
            {...register('username')}
            placeholder="Username"
            className="text-black w-[300px] max-sm:w-[200px] h-10"
          />
          <ButtonTextBg type="submit" customStyle={'w-full'}>
            Save
          </ButtonTextBg>
        </form>
      </div>
    </div>
  );
}

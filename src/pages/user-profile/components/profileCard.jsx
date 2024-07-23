import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { useForm } from 'react-hook-form';
import ConnectDB from 'utils/services/crud/crud';
import ProfilePicture from './profilePicture';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function ProfileCard({ userData }) {
  const { handleSubmit, register, setValue } = useForm();
  const { updateUserData } = useStateStore();

  if (userData) {
    setValue('name', userData.name);
    setValue('username', userData.username);
  }

  async function handleUpdateProfile(formData) {
    try {
      // attempt to login the user
      const response = await DB.updateFirestoreDoc(
        ['users', userData.userID],
        formData
      );
      updateUserData({
        ...userData,
        name: formData.name,
        username: formData.username,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-start-1 col-end-4 p-4 bg-black/50 rounded-2xl row-span-full center-col ">
      <ProfilePicture userData={userData} />
      <div>
        <h1 className="text-2xl font-semibold">{userData && userData.name}</h1>
      </div>
      <div className="mt-[100px]">
        <form
          className="items-stretch h-full center-col"
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <input
            {...register('name', { required: true })}
            placeholder="Name"
            className="text-black w-[400px] h-10"
          />
          <input
            {...register('username')}
            placeholder="Username"
            className="text-black w-[400px] h-10"
          />
          <ButtonTextBg type="submit">Save</ButtonTextBg>
        </form>
      </div>
    </div>
  );
}

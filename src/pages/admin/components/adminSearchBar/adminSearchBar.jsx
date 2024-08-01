import { useForm } from 'react-hook-form';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function AdminSearchBar() {
  const { handleSubmit, register } = useForm();
  const { updateUsers } = useStateStore();

  async function handleSearchUser(formData) {
    const user = await DB.getFirestoreDocsByEqualQuery(
      ['users'],
      ['name', formData.userNameQuery]
    );
    updateUsers(user);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSearchUser)} className="gap-0 center">
        <input
          type="text"
          {...register('userNameQuery', { required: true })}
          className="px-2 py-1 text-black outline-none"
          placeholder="Search for user"
        />
        <button
          type="submit"
          className="p-2 text-white cursor-pointer rounded-e-sm bg-brand1"
        >
          <HiMagnifyingGlass className="pointer-events-none" />
        </button>
      </form>
    </div>
  );
}

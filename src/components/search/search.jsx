import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function Search() {
  return (
    <div>
      <label className="bg-white rounded-sm center">
        <input
          type="text"
          name="navSearchForm"
          id="navSearchForm"
          className="px-2 py-1 text-black bg-transparent outline-none"
          placeholder="Search.."
        />
        <div className="p-2 text-white cursor-pointer rounded-e-sm bg-brand1">
          <HiMagnifyingGlass />
        </div>
      </label>
    </div>
  );
}

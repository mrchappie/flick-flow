import { HiMiniCamera } from 'react-icons/hi2';

export default function ProfilePicture() {
  return (
    <div className="w-[300px] h-[300px] shadow-2xl relative rounded-lg overflow-hidden">
      <div className="absolute w-full h-full text-3xl transition-opacity opacity-0 cursor-pointer center hover:opacity-70 bg-black/50">
        <HiMiniCamera />
      </div>
      <img src="https://picsum.photos/300" alt="profile" />
    </div>
  );
}

import { useStateStore } from 'utils/services/state/State';

const defaultBanner =
  'https://firebasestorage.googleapis.com/v0/b/flick-flow.appspot.com/o/banners%2Fbanner1.webp?alt=media&token=fb046748-d2ec-4537-9abc-d24f12b8db95';

export default function Banner() {
  const { banner } = useStateStore();
  return (
    <div className="absolute top-0 left-0 z-[-1] h-[70vh] overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-full h-full bg-custom-bg-both-fade"></div>
      <img
        src={banner.url === '' ? defaultBanner : banner.url}
        alt={banner.name}
        className="object-cover w-full h-full"
      ></img>
    </div>
  );
}

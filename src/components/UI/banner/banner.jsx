const defaultBgImage = 'https://wallpaperaccess.com/full/752715.jpg';

export default function Banner({ bgImage = defaultBgImage }) {
  return (
    <div className="absolute top-0 left-0 z-[-1] h-[70vh] overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-full h-full bg-custom-bg-both-fade"></div>
      <img
        src={bgImage}
        alt="hero background"
        className="object-cover w-full h-full"
      ></img>
    </div>
  );
}

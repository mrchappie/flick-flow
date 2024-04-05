const bgImage = 'https://wallpaperaccess.com/full/752715.jpg';

export default function Banner() {
  return (
    <div className="absolute top-0 left-0 z-[-1] h-[70vh] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-custom-bg-both-fade"></div>
      <img
        src={bgImage}
        alt="hero background"
        width={2000}
        height={800}
        className="object-cover"
      ></img>
    </div>
  );
}

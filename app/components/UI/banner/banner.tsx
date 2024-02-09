import Image from 'next/image';

const bgImage: string = 'https://wallpaperaccess.com/full/752715.jpg';

export default function Banner() {
  return (
    <div className="absolute top-0 left-0 z-[-1] h-[70vh] overflow-hidden">
      <div className="bg-custom-bg-both-fade w-full h-full absolute top-0 left-0"></div>
      <Image
        src={bgImage}
        alt="hero background"
        width={2000}
        height={800}
        className="object-cover"
      ></Image>
    </div>
  );
}

import Image from 'next/image';
import { SlideDetailsI } from './carousel';

export default function Slide(props: SlideDetailsI) {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <Image src={props.poster} fill={true} alt="Picture of the author" />
    </div>
  );
}

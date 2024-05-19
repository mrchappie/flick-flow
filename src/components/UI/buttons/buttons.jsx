import { HiChevronLeft } from 'react-icons/hi2';
import { HiChevronRight } from 'react-icons/hi2';

export function ButtonTextBg(props) {
  return (
    <button
      onClick={props.handleClick}
      className="p-3 text-white rounded-sm bg-brand1"
    >
      {props.children ? props.children : props.title}
    </button>
  );
}

export function ButtonTextNoBg(props) {
  return (
    <button
      onClick={props.handleClick}
      className="p-3 bg-transparent rounded-sm text-brand1"
    >
      {props.children ? props.children : props.title}
    </button>
  );
}

export function ButtonWithTextAndIcon(props) {
  return (
    <button
      onClick={props.handleClick}
      className="p-3 bg-transparent rounded-sm center-col hover:text-brand4"
    >
      {props.children ? props.children : props.title}
    </button>
  );
}

export function CarouselArrowNext(props) {
  return (
    <button
      onClick={props.handleClick}
      className="bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-s-[100px]"
    >
      <HiChevronRight />
    </button>
  );
}

export function CarouselArrowPrev(props) {
  return (
    <button
      onClick={props.handleClick}
      className="bg-white text-brand1 w-9 h-[72px] text-3xl center font-extrabold rounded-e-[100px]"
    >
      <HiChevronLeft />
    </button>
  );
}

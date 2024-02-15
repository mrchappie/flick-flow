export default function ButtonMain(props: any) {
  return (
    <button
      onClick={props.handleClick}
      className="p-4 bg-white text-black rounded-md"
    >
      {props.title}
    </button>
  );
}

interface ButtonProps {
  title: string;
}

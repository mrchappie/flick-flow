export default function ButtonMain(props) {
  return (
    <button
      onClick={props.handleClick}
      className="p-4 text-black bg-white rounded-md"
    >
      {props.title}
    </button>
  );
}

export default function Slide(props) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={props.poster}
        alt="author"
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default function Slide(props) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img src={props.poster} fill={true} alt="author" />
    </div>
  );
}

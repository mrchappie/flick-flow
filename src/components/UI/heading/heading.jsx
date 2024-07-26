export default function Heading({ title, toggleGen, customStyle }) {
  return (
    <div
      className={`justify-between w-full mb-4 center ${
        customStyle ? customStyle : ''
      }`}
      onClick={toggleGen}
    >
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

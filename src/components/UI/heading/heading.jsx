export function Heading({ title, toggleGen, customStyle }) {
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

export function Heading2({ title, customStyle, children }) {
  return (
    <div
      className={`justify-between w-full py-2 center ${
        customStyle ? customStyle : ''
      }`}
    >
      <h2 className="text-2xl font-bold text-center text-black">
        {title ? title : children}
      </h2>
    </div>
  );
}

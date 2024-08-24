import { twMerge } from 'tailwind-merge';

export function Heading({ title, toggleGen, customStyle, children }) {
  return (
    <div
      className={twMerge(
        `justify-between w-full mb-4 center ${customStyle ? customStyle : ''}`
      )}
      onClick={toggleGen}
    >
      <h1 className="text-3xl font-bold">{title ? title : children}</h1>
    </div>
  );
}

export function Heading2({ title, customStyle, children }) {
  return (
    <div className={`justify-between w-full py-2 center`}>
      <h2
        className={twMerge(
          `text-2xl font-bold text-center text-black ${
            customStyle ? customStyle : ''
          }`
        )}
      >
        {title ? title : children}
      </h2>
    </div>
  );
}

export default function P({ children, customStyle }) {
  return (
    <p
      className={`w-full py-2 text-lg font-semibold text-center text-black ${customStyle}`}
    >
      {children}
    </p>
  );
}

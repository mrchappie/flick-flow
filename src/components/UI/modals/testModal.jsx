export default function TestModal({ closeModal, title }) {
  return (
    <div
      onClick={closeModal}
      className="absolute z-50 w-screen h-screen center bg-black/50"
    >
      {title}
    </div>
  );
}

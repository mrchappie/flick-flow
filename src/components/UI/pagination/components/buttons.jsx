export function Numbers({ activePage, size, handleClickedPage }) {
  return new Array(size).fill(0).map((_, index) => (
    <span
      key={index}
      onClick={() => {
        if (activePage !== index + 1) {
          handleClickedPage(index + 1);
        }
      }}
      className={`w-8 text-black rounded-sm aspect-square center font-semibold text-xl ${
        activePage === index + 1
          ? 'bg-black/80 border-2 border-brand1 text-brand1 scale-110 cursor-not-allowed'
          : 'bg-white/50 cursor-pointer hover:scale-105'
      }`}
    >
      {index + 1}
    </span>
  ));
}

export function Numbers({
  activePage,
  displaySize,
  totalPages,
  handleClickedPage,
}) {
  console.log(totalPages);
  if (totalPages) {
    const pages = new Array(
      totalPages.total_pages > 500 ? 500 : totalPages.total_pages
    ).fill(0);
    return pages.map((_, index) => (
      <span
        key={index}
        onClick={() => {
          if (activePage !== index + 1) {
            handleClickedPage(index + 1);
          }
        }}
        className={`w-8 text-black rounded-sm aspect-square center font-semibold text-xl ${
          activePage === index + 1
            ? 'bg-black/80 border-2 border-brand1 text-brand1 w-10 cursor-not-allowed'
            : 'bg-white/70 cursor-pointer hover:scale-105'
        } ${setDisplayOnPage(
          index,
          displaySize,
          activePage,
          totalPages.total_pages
        )}`}
      >
        {index + 1}
      </span>
    ));
  }
}

function setDisplayOnPage(index, displaySize, activePage, totalPages) {
  if (totalPages <= displaySize) {
    return 'flex';
  }

  switch (index) {
    case activePage - 1:
      return 'flex';
    case activePage:
      return 'flex';
    case activePage + 1:
      return 'flex';
    case activePage - 2:
      return 'flex';
    case activePage - 3:
      return 'flex';
    default:
      return 'hidden';
  }
}

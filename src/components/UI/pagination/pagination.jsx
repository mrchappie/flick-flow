import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import { PaginationButtons } from './components/paginationButtons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Pagination({ paginationData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageFromParams = searchParams.get('page');
    if (pageFromParams) {
      setPage(parseInt(pageFromParams));
    }
  }, [searchParams]);

  function handleSetClickedPage(clickedPage) {
    setPage(clickedPage);
    modifySearchParams(clickedPage);
  }

  function incrementPage() {
    if (paginationData.total_pages > 500) {
      paginationData.total_pages = 500;
    }
    if (page < paginationData.total_pages) {
      setPage((prev) => prev + 1);
      modifySearchParams(page + 1);
    }
  }

  function decrementPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      modifySearchParams(page - 1);
    }
  }

  function setFirstPage() {
    setPage(1);
    modifySearchParams(1);
  }

  function setLastPage() {
    if (paginationData.total_pages > 500) {
      paginationData.total_pages = 500;
    }
    setPage(paginationData.total_pages);
    modifySearchParams(paginationData.total_pages);
  }

  function modifySearchParams(page) {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: page,
    });
  }

  return (
    <div className="select-none center">
      <div className="center">
        <button
          onClick={setFirstPage}
          className="w-10 text-xl font-semibold text-black rounded-sm cursor-pointer aspect-square center bg-white/70 hover:scale-105"
        >
          <HiChevronDoubleLeft />
        </button>
        <button
          onClick={decrementPage}
          className="w-10 text-xl font-semibold text-black rounded-sm cursor-pointer aspect-square center bg-white/70 hover:scale-105"
        >
          <HiChevronLeft />
        </button>
      </div>
      <div className="center">
        <PaginationButtons
          activePage={page}
          displaySize={5}
          totalPages={paginationData}
          handleClickedPage={handleSetClickedPage}
        />
      </div>
      <div className="center">
        <button
          onClick={incrementPage}
          className="w-10 text-xl font-semibold text-black rounded-sm cursor-pointer aspect-square center bg-white/70 hover:scale-105"
        >
          <HiChevronRight />
        </button>
        <button
          onClick={setLastPage}
          className="w-10 text-xl font-semibold text-black rounded-sm cursor-pointer aspect-square center bg-white/70 hover:scale-105"
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}

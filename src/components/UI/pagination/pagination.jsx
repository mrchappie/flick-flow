import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import { Numbers } from './components/buttons';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Pagination() {
  const [page, setPage] = useState(1);
  const [, setSearchParams] = useSearchParams();

  function handleSetClickedPage(clickedPage) {
    setPage(clickedPage);
    setSearchParams({ page: clickedPage });
  }

  function incrementPage() {
    if (page < mockData.totalPages) {
      setPage((prev) => prev + 1);
      setSearchParams({ page: page + 1 });
    }
  }

  function decrementPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
      setSearchParams({ page: page - 1 });
    }
  }

  return (
    <div className="center">
      <div className="center">
        <button className="text-2xl font-semibold">
          <HiChevronDoubleLeft />
        </button>
        <button onClick={decrementPage} className="text-2xl font-semibold">
          <HiChevronLeft />
        </button>
      </div>
      <div className="center">
        <Numbers
          activePage={page}
          size={10}
          handleClickedPage={handleSetClickedPage}
        />
      </div>
      <div className="center">
        <button onClick={incrementPage} className="text-2xl font-semibold">
          <HiChevronRight />
        </button>
        <button className="text-2xl font-semibold">
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}

const mockData = { page: 1, totalPages: 10 };

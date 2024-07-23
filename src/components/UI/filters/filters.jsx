import { genreFilters } from './categories/genre';
// import { typeFilters } from './categories/type';
import { yearFilters } from './categories/year';
import Filter from './filter';

export default function Filters() {
  return (
    <section className="w-full center-col gap-[30px]">
      {/* <Filter {...typeFilters} /> */}
      <Filter {...yearFilters} />
      <Filter {...genreFilters} />
    </section>
  );
}

import Heading from '../heading/heading';
import MovieCard from '../movieCard/movieCard';

export default function CardsInfoContainer({ title, data = [], style }) {
  console.log(data);
  return (
    <section className="w-full col-span-full center-col">
      {title && (
        <div className="justify-between w-full center mt-[50px]">
          <Heading title={title} />
        </div>
      )}

      <div className={`flex-wrap w-full h-full center my-[50px] ${style}`}>
        {data.map((movie) => {
          return <MovieCard details={movie} key={movie.id} />;
        })}
      </div>
    </section>
  );
}

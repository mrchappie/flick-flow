import ForYou from 'components/forYou/forYou';
import MovieCard from 'components/UI/movieCard/movieCard';
import { useSearchParams } from 'react-router-dom';

export default function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieID = searchParams.get('movie_id');
  console.log(movieID);
  const movieDetails = {
    title: 'Greenland',
    year: '2020',
    poster: '/images/movie_poster.jpg',
    movieID: '121213412qsadnd7asda',
  };

  const myStyles = {
    width: '180px',
    aspectRatio: '9/16',
  };

  return (
    <section className="col-span-full custom-grid">
      <section className="w-full h-full col-span-9 bg-black/50 center-col">
        <div className="w-full h-[70%] relative">
          <img src={'/images/movie_poster_l.jpg'} alt="" />
        </div>
        <header className="h-[30%] center-col justify-start gap-4">
          <div className="items-start w-full center-col">
            <div className="justify-between w-full center">
              <h1 className="text-2xl">Movie Name</h1>
              <div className="justify-start center">
                <button>Watchlist</button>
                <button>Share</button>
                <button>Download</button>
              </div>
            </div>
            <div>
              <div className="center">
                <span>2018</span>
                <span>2h:35min</span>
              </div>
              <div className="center">
                <span>action</span>
                <span>comedy</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-2xl">Description</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
              reprehenderit fugiat eveniet aut vitae aspernatur. Sit facere
              reprehenderit fugiat dolorum exercitationem consequatur quam
              laborum error quod. Temporibus accusamus repudiandae error.
            </p>
          </div>
        </header>
      </section>
      <section className="h-full col-span-3 px-4 bg-black/50 center-col ">
        <div className="w-full text-2xl font-bold">Movies for you</div>
        <div className="grid grid-cols-2 gap-4">
          <MovieCard details={movieDetails} customStyle={myStyles} />
          <MovieCard details={movieDetails} customStyle={myStyles} />
          <MovieCard details={movieDetails} customStyle={myStyles} />
          <MovieCard details={movieDetails} customStyle={myStyles} />
          <MovieCard details={movieDetails} customStyle={myStyles} />
          <MovieCard details={movieDetails} customStyle={myStyles} />
        </div>
      </section>
      <ForYou />
    </section>
  );
}

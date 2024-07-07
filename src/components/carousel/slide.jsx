export default function Slide(props) {
  const tmdbImagesOrigin = process.env.REACT_APP_TMDB_IMAGE_API_ORIGIN;
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={tmdbImagesOrigin + '/original' + props.backdrop_path}
        alt="author"
        className="object-cover w-full"
      />
    </div>
  );
}

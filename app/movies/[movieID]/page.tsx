export default function Movie({ params }: { params: { movieID: string } }) {
  return <div>Movie: {params.movieID}</div>;
}

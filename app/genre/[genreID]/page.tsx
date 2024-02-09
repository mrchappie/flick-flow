export default function Genre({ params }: { params: { genreID: string } }) {
  return <div>Genre: {params.genreID}</div>;
}

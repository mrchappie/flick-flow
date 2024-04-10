import { useParams } from 'react-router-dom';

export default function List() {
  const { listID } = useParams();

  return <h1>{listID}</h1>;
}

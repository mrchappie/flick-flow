import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function List() {
  const user = useStateStore((state) => state.user);
  const { listID } = useParams();

  const [componentData, setComponentData] = useState({
    title: 'Your Favorite Movies',
    data: [],
  });

  useEffect(() => {
    async function fetchData() {
      const DB = new ConnectDB();
      try {
        const fetchedData = await DB.getFirestoreDocs([
          'lists',
          user.uid,
          listID,
        ]);
        setComponentData({
          ...componentData,
          data: fetchedData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }

    // because user auth check is async, I check the user to not be null
    if (user) {
      fetchData();
    }
  }, [user]);

  return <MovieCardsContainer {...componentData} />;
}

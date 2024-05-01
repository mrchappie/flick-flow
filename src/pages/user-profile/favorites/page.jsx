import MovieCardsContainer from 'components/UI/movieCardsContainer/movieCardsContainer';
import { useEffect, useState } from 'react';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function Favorites() {
  const user = useStateStore((state) => state.user);

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
          '554a2068-020f-40dd-b598-5133998c00d7',
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

  return (
    <div className="w-full">
      <div>
        <MovieCardsContainer {...componentData} />
      </div>
    </div>
  );
}

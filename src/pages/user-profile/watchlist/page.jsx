import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function WatchList() {
  const user = useStateStore((state) => state.user);

  const [componentData, setComponentData] = useState({
    title: 'What movie are you watching next?',
    data: [],
  });

  useEffect(() => {
    async function fetchData() {
      const DB = new ConnectDB();
      try {
        const fetchedData = await DB.getFirestoreDocs([user.uid, 'watchlist']);
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

  return <CardsInfoContainer {...componentData} />;
}

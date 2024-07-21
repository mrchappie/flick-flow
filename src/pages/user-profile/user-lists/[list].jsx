import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function List() {
  const { userData } = useStateStore();

  const [searchParams] = useSearchParams();
  const [listID, setListID] = useState(searchParams.get('list_id'));
  const [listFetchedData, setListFetchedData] = useState([]);

  const componentData = {
    title: 'Your Favorite Movies',
    data: listFetchedData,
  };

  useEffect(() => {
    if (searchParams) {
      setListID(searchParams.get('list_id'));
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await DB.getFirestoreDoc(['lists', listID]);
        setListFetchedData(fetchedData.content);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }

    // because user auth check is async, I check the user to not be null
    if (userData) {
      fetchData();
    }
  }, [listID, userData]);

  return <CardsInfoContainer {...componentData} />;
}

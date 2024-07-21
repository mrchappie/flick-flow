import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function List() {
  const { userData } = useStateStore();
  const [chooseItemsToSee, setChooseItemsToSee] = useState('movie');

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
        const fetchedData = await DB.getFirestoreDocs([
          'lists',
          listID,
          chooseItemsToSee,
        ]);

        setListFetchedData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // because user auth check is async, I check the user to not be null
    if (userData) {
      fetchData();
    }
  }, [listID, userData, chooseItemsToSee]);

  return (
    <>
      <div className="w-full center col-span-full">
        <ButtonTextNoBgWithBorder
          handleClick={() => {
            setChooseItemsToSee('movie');
          }}
        >
          Movies
        </ButtonTextNoBgWithBorder>
        <ButtonTextNoBgWithBorder
          handleClick={() => {
            setChooseItemsToSee('tv');
          }}
        >
          TV-shows
        </ButtonTextNoBgWithBorder>
      </div>
      <CardsInfoContainer {...componentData} />
    </>
  );
}

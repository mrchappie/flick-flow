import { ButtonTextNoBgWithBorder } from 'components/UI/buttons/buttons';
import CardsInfoContainer from 'components/UI/cardsInfoContainer/CardsInfoContainer';
import Filters from 'components/UI/filters/filters';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
import { capitalizeWord } from 'utils/utils';

const DB = new ConnectDB();

export default function List() {
  const { userData } = useStateStore();
  const [chooseItemsToSee, setChooseItemsToSee] = useState('movie');

  const [searchParams] = useSearchParams();
  const [listID, setListID] = useState(searchParams.get('list_id'));
  const [listFetchedData, setListFetchedData] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const [showFilters, setShowFilters] = useState(false);

  const componentData = {
    title: `${capitalizeWord(pathname.split('/').reverse()[0])} Collection`,
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

  function handleClick() {
    setShowFilters(!showFilters);
  }

  return (
    <>
      <div className="justify-between center">
        <div className="flex gap-4 col-span-full">
          <ButtonTextNoBgWithBorder
            handleClick={() => {
              setChooseItemsToSee('movie');
            }}
            customStyle={`min-w-[100px] ${
              chooseItemsToSee !== 'movie' && 'grayscale'
            }`}
          >
            Movies
          </ButtonTextNoBgWithBorder>
          <ButtonTextNoBgWithBorder
            handleClick={() => {
              setChooseItemsToSee('tv');
            }}
            customStyle={`min-w-[100px] ${
              chooseItemsToSee !== 'tv' && 'grayscale'
            }`}
          >
            TV-shows
          </ButtonTextNoBgWithBorder>
        </div>
        <ButtonTextNoBgWithBorder title="Filters" handleClick={handleClick} />
      </div>
      {showFilters && (
        <div className="py-10">
          <Filters />
        </div>
      )}
      <CardsInfoContainer {...componentData} />
    </>
  );
}

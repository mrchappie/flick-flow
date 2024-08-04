import { Heading } from 'components/UI/heading/heading';
import { TagWithBg, TagWithBorder } from 'components/UI/tags/tags';
import { useEffect, useState } from 'react';
import useFetch from 'utils/hooks/useFetch';
import { capitalizeWords } from 'utils/utils';

export default function ListsStatistics({ userData }) {
  const { response, fetchData } = useFetch({});
  const [listsStats, setListsStats] = useState(null);

  useEffect(() => {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_COUNT_ITEMS_IN_LISTS,
    });
  }, [fetchData]);

  useEffect(() => {
    if (response) {
      setListsStats(Object.entries(response.data));
    }
  }, [response]);

  return (
    <div className="col-start-4 col-end-7 row-start-4 row-end-7 p-4 bg-black/50 rounded-2xl">
      <Heading
        title={`${
          listsStats &&
          listsStats
            .map((arr) => arr[1].movie)
            .reduce((acc, next) => acc + next, 0)
        } movies & ${
          listsStats &&
          listsStats
            .map((arr) => arr[1].tv)
            .reduce((acc, next) => acc + next, 0)
        } tv-shows waiting for you`}
      />
      <hr />
      <div className="p-4 center-col">
        {listsStats &&
          listsStats.map((list) => {
            return (
              <div className="justify-between w-full center" key={list[0]}>
                <TagWithBg>{capitalizeWords(list[0])}</TagWithBg>
                <div className="center">
                  <TagWithBorder>{list[1].movie} movies</TagWithBorder> &
                  <TagWithBorder>{list[1].tv} tv-shows</TagWithBorder>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

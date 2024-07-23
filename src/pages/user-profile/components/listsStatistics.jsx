import Heading from 'components/UI/heading/heading';
import { TagWithBg, TagWithBorder } from 'components/UI/tags/tags';
import { capitalizeWord } from 'utils/utils';

export default function ListsStatistics({ userData }) {
  return (
    <div className="col-start-4 col-end-7 row-start-4 row-end-7 p-4 bg-black/50 rounded-2xl">
      <Heading title={'400 movies & 200 tv-shows waiting for you'} />
      <hr />
      <div className="p-4 center-col">
        {userData &&
          userData.lists.map((list) => {
            return (
              <div className="justify-between w-full center" key={list.listID}>
                <TagWithBg>{capitalizeWord(list.listName)}</TagWithBg>
                <div className="center">
                  <TagWithBorder>420 movies</TagWithBorder> &
                  <TagWithBorder>200 tv-shows</TagWithBorder>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

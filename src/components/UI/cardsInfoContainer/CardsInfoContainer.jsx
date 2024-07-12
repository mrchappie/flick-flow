import { useStateStore } from 'utils/services/state/State';
import Heading from '../heading/heading';
import Modal from '../modal/modal';
import MovieCard from '../movieCard/movieCard';
import { ListCardInline } from 'pages/user-profile/user-lists/listCard';
import ConnectDB from 'utils/services/crud/crud';
import { useState } from 'react';

const DB = new ConnectDB();

export default function CardsInfoContainer({ title, data = [], style }) {
  const user = useStateStore((state) => state.user);
  const [itemToAddToList, setItemToAddToList] = useState(null);
  const showModalState = useStateStore((state) => state.showModal);

  function handleShowModal(itemDetails) {
    setItemToAddToList(itemDetails);
  }

  function handleAddToList(itemDetails, defaultListName = 'favorites') {
    const favListID = user.lists.filter(
      (list) => list.listName === defaultListName
    );
    DB.updateFirestoreDocInArray(['lists', favListID[0].listID], itemDetails);
  }

  return (
    <section className="w-full col-span-full center-col">
      {title && (
        <div className="justify-between w-full center mt-[50px]">
          <Heading title={title} />
        </div>
      )}

      <div className={`flex-wrap w-full h-full center my-[50px] ${style}`}>
        {data.map((movie) => {
          return (
            <MovieCard
              details={movie}
              key={movie.id}
              onHandleShowModal={handleShowModal}
            />
          );
        })}
      </div>

      {showModalState && (
        <Modal>
          <ul className="gap-4 p-4 center-col">
            {user.lists.map((list) => {
              return (
                <ListCardInline
                  list={list}
                  key={list.listID}
                  onAddToCustomList={() => {
                    handleAddToList(itemToAddToList, list.listName);
                  }}
                />
              );
            })}
          </ul>
        </Modal>
      )}
    </section>
  );
}

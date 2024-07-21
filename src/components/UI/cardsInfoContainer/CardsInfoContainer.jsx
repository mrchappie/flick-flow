import { useStateStore } from 'utils/services/state/State';
import Heading from '../heading/heading';
import Modal from '../modal/modal';
import MovieCard from '../movieCard/movieCard';
import { ListCardInline } from 'pages/user-profile/user-lists/listCard';
import ConnectDB from 'utils/services/crud/crud';
import { useState } from 'react';
import { handleFilterLists, handleWhatListToShow } from './helper';

const DB = new ConnectDB();

export default function CardsInfoContainer({ title, data = [], style }) {
  const { userData } = useStateStore();
  const { showModal } = useStateStore();
  const { updateShowModal } = useStateStore();
  const { addItemInList } = useStateStore();
  const [listsItemIsIn, setListsItemIsIn] = useState(null);
  const [itemDetails, setItemDetails] = useState({});

  function handleShowModal(itemDetails, itemLists) {
    setListsItemIsIn(itemLists);
    setItemDetails(itemDetails);
  }

  async function handleAddToList(itemDetails, listName = 'favorites') {
    const favListID = userData.lists.filter(
      (list) => list.listName === listName
    );
    const response = await DB.updateFirestoreDocInArray(
      ['lists', favListID[0].listID],
      itemDetails
    );

    if (response.status === 200) {
      addItemInList([{ movieID: itemDetails.id, listName: listName }]);
      updateShowModal(false);
    }
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

      {showModal && (
        <Modal>
          <ul className="gap-4 p-4 center-col">
            {handleFilterLists(userData.lists).map((list) => {
              return (
                <ListCardInline
                  list={list}
                  key={list.listID}
                  details={itemDetails}
                  isInList={handleWhatListToShow(listsItemIsIn, list.listName)}
                  onAddToCustomList={() => {
                    handleAddToList(itemDetails, list.listName);
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

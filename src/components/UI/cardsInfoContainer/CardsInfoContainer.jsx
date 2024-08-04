import { useStateStore } from 'utils/services/state/State';
import { Heading, Heading2 } from '../heading/heading';
import Modal from '../modal/modal';
import MovieCard from '../movieCard/movieCard';
import { ListCardInline } from 'pages/user-profile/user-lists/listCard';
import { useEffect, useState } from 'react';
import { handleFilterLists, handleWhatListToShow } from './helper';
import useFetch from 'utils/hooks/useFetch';
import { checkMediaType } from '../movieCard/components/helper';
import { Link } from 'react-router-dom';
// import CreateNewList from 'pages/user-profile/user-lists/createNewList';

export default function CardsInfoContainer({
  title,
  data = [],
  path,
  style,
  customStyle,
}) {
  const { userData } = useStateStore();
  const { showModal } = useStateStore();
  const { updateShowModal } = useStateStore();
  const { addItemInList, removeItemFromList } = useStateStore();
  const [listsItemIsIn, setListsItemIsIn] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  // const [showCreateNewListModal, setShowCreateNewListModal] = useState(false);

  const { response, fetchData } = useFetch({});

  function addToList(listName) {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_ADD_ITEM_TO_LIST,
      customMethod: 'POST',
      customBody: {
        listName: listName,
        data: itemDetails,
        itemType: checkMediaType(itemDetails),
      },
    });
    // if (response.status === 200) {
    addItemInList([{ movieID: itemDetails.id, listName: listName }]);
    updateShowModal(false);
    // }
  }

  function removeFromList(listName) {
    fetchData({
      customURL: process.env.REACT_APP_FIREBASE_RMV_ITEM_FROM_LIST,
      customMethod: 'DELETE',
      customBody: {
        listName: listName,
        data: itemDetails,
        itemType: checkMediaType(itemDetails),
      },
    });
    // if (response.status === 200) {
    removeItemFromList(itemDetails, listName);
    updateShowModal(false);
    // }
  }

  function handleShowModal(itemDetails, itemLists) {
    setListsItemIsIn(itemLists);
    setItemDetails(itemDetails);
  }

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <section className="w-full col-span-full center-col">
      <div className="justify-between w-full center mt-[50px] px-4">
        {title && (
          <div>
            <Heading title={title} />
          </div>
        )}
        {path && (
          <div>
            <Link to={`/movies${path}`} className="underline hover:text-brand4">
              See More
            </Link>
          </div>
        )}
      </div>

      <div
        className={
          customStyle ??
          `flex-wrap w-full h-full center my-[50px] ${style ?? ''}`
        }
      >
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
          <Heading2 title={'Click the list you want to add this movie:'} />
          <ul className="gap-4 p-4 center-col max-w-[400px]">
            {handleFilterLists(userData.lists).map((list) => {
              return (
                <ListCardInline
                  list={list}
                  key={list.listID}
                  isInList={handleWhatListToShow(listsItemIsIn, list.listName)}
                  onAddToCustomList={() => {
                    addToList(list.listName);
                  }}
                  onRmvFromCustomList={(event) => {
                    event.stopPropagation();
                    removeFromList(list.listName);
                  }}
                />
              );
            })}
            {/* <li>
              <button
                onClick={() => {
                  setShowCreateNewListModal(!showCreateNewListModal);
                }}
              >
                Create new list
              </button>
              {showCreateNewListModal && <CreateNewList onCloseModal={handleShowModal}/>}
            </li> */}
          </ul>
        </Modal>
      )}
    </section>
  );
}

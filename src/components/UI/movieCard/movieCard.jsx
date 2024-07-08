import { Link } from 'react-router-dom';
import {
  HiBookmark,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineHeart,
} from 'react-icons/hi';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { ListCardInline } from 'pages/user-profile/user-lists/listCard';
import { extractReleaseYear } from './helpers';
import { tmdbImagesOrigin } from 'utils/utils';

export default function MovieCard({ details, customStyle }) {
  const DB = new ConnectDB();
  const user = useStateStore((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // get user object from db
        const userData = await DB.getFirestoreDoc(['users', user.uid]);
        setLists(Object.values(userData.lists));
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching data:', error);
      }
    }

    // check for the user to not be null
    if (user) {
      fetchData();
    }
  }, []);

  function handleAddToFavorites(movieID) {
    const favListID = lists.filter((list) => list.listName === 'favorites');
    DB.setFirestoreDoc(['lists', user.uid, favListID[0].listID, movieID], {
      type: 'movie',
      addedByUser: true,
    });
  }

  function openListsModal(itemDetails) {
    // db.setFirestoreDoc(['lists', user.uid, 'watchlist', movieID]);
    setModalIsOpen(!modalIsOpen);
    setSelectedItem(itemDetails);
  }

  const customStyles = {
    overlay: {
      position: 'fixed',
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div className="relative">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <h1 className="text-black">
          Click the list you want to add this movie:
        </h1>
        <ul className="gap-4 p-4 center-col">
          {lists.map((list) => {
            return (
              <ListCardInline
                list={list}
                data={selectedItem}
                key={list.listID}
              />
            );
          })}
        </ul>
      </ReactModal>
      <div className="absolute z-10 w-full h-full opacity-0 hover:bg-black/40 hover:opacity-100">
        <div className="relative z-10 flex justify-between p-2 cursor-pointer">
          <span
            onClick={() => {
              handleAddToFavorites(details.id);
            }}
          >
            {details.addedByUser === true ? (
              <HiOutlineHeart className="text-[30px] hover:scale-125 text-red-500" />
            ) : (
              <HiHeart className="text-[30px] hover:scale-125 text-red-500" />
            )}
          </span>
          <span
            onClick={() => {
              openListsModal(details);
            }}
          >
            {details.addedByUser === true ? (
              <HiOutlineBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
            ) : (
              <HiBookmark className="text-[30px] hover:scale-125 text-yellow-500" />
            )}
          </span>
        </div>
        <Link
          to={`/details?movie_id=${details.id}`}
          className="absolute top-0 left-0 z-0 block w-full h-full"
        ></Link>
      </div>
      <div
        className="w-[214px] h-[290px] overflow-hidden relative cursor-pointer bg-black"
        style={customStyle}
      >
        <div className="absolute w-full h-full rotate-180 z-1 bg-custom-bg-fade"></div>
        <div className="absolute font-semibold text-md z-1 bottom-2 left-4">
          <h2 className="flex flex-wrap">
            <span>{details.title ? details.title : details.name}</span> -
            <span>{extractReleaseYear(details)}</span>
          </h2>
        </div>
        <img
          src={tmdbImagesOrigin + '/w342' + details.poster_path}
          alt="author"
          className="z-0"
        />
      </div>
    </div>
  );
}

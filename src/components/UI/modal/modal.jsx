import { ListCardInline } from 'pages/user-profile/user-lists/listCard';
import { useEffect } from 'react';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function Modal() {
  const DB = new ConnectDB();

  const showModalState = useStateStore((state) => state.showModal);
  const updateShowModal = useStateStore((state) => state.updateShowModal);

  const itemToAddInDB = useStateStore((state) => state.itemToAddInDB);

  const user = useStateStore((state) => state.user);

  useEffect(() => {
    document.body.style.overflow = showModalState ? 'hidden' : null;
    console.log('test');
  }, [showModalState]);

  function handleCloseModal() {
    updateShowModal(!showModalState);
  }

  function handleAddToList(itemDetails, defaultListName = 'favorites') {
    const favListID = user.lists.filter(
      (list) => list.listName === defaultListName
    );
    DB.updateFirestoreDocInArray(['lists', favListID[0].listID], itemDetails);
  }

  return (
    <>
      {showModalState && (
        <div
          onClick={handleCloseModal}
          className="fixed top-0 left-0 z-50 w-screen h-screen cursor-pointer bg-black/50 center"
        >
          <div className="max-w-[400px]">
            <h1 className="text-3xl text-center text-white">
              Click the list you want to add this movie:
            </h1>
            <ul className="gap-4 p-4 center-col">
              {user.lists.map((list) => {
                return (
                  <ListCardInline
                    list={list}
                    key={list.listID}
                    onAddToCustomList={() => {
                      handleAddToList(itemToAddInDB, list.listName);
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

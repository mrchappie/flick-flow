import { Heading } from 'components/UI/heading/heading';
import { useEffect, useState } from 'react';
import { useStateStore } from 'utils/services/state/State';
import { ListCardBlock } from './listCard';
import CreateNewList from './createNewList';

export default function UserLists() {
  const { userData } = useStateStore();
  const [lists, setLists] = useState([]);

  const { showModal, updateShowModal } = useStateStore();

  useEffect(() => {
    async function fetchData() {
      try {
        setLists(Object.values(userData.lists));
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching data:', error);
      }
    }

    // because user auth check is async, I check for the user to not be null
    if (userData) {
      fetchData();
    }
  }, [userData]);

  function handleShowModal() {
    updateShowModal(!showModal);
  }

  return (
    <section className="w-full col-span-full center-col">
      <Heading title="Your Custom Lists" />

      <ul className="flex-wrap w-full gap-4 center">
        <li
          onClick={handleShowModal}
          className="w-[200px] h-[200px] rounded-lg font-bold border-2 center text-3xl cursor-pointer bg-black/50"
        >
          +
        </li>
        {lists.map((list) => {
          return (
            <ListCardBlock
              list={list}
              removeList={(listToDelete) => {
                const newLists = lists.filter(
                  (list) => list.listID !== listToDelete.listID
                );
                setLists(newLists);
              }}
              key={list.listID}
            />
          );
        })}
      </ul>

      {showModal && (
        <CreateNewList
          lists={lists}
          onAddNewListToState={(newList) => {
            setLists([
              ...lists,
              { listName: newList.listName, listID: newList.listID },
            ]);
          }}
          onCloseModal={handleShowModal}
        />
      )}
    </section>
  );
}

import Heading from 'components/UI/heading/heading';
import { Field, Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
import { ListCardBlock } from './listCard';

export default function UserLists() {
  const user = useStateStore((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const DB = new ConnectDB();

  // append modal to root
  ReactModal.setAppElement(document.getElementById('root'));

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

    // because user auth check is async, I check for the user to not be null
    if (user) {
      fetchData();
    }
  });

  function toggleAddNewListModal() {
    setModalIsOpen(!modalIsOpen);
  }

  // add new list to DB
  async function handleSubmit(formValues) {
    const list = await DB.createNewList({
      uid: user.uid,
      listName: formValues.listName,
    });

    setLists([
      ...lists,
      { listName: formValues.listName, listID: list.listID },
    ]);

    toggleAddNewListModal();
  }

  const customStyles = {
    overlay: {
      position: 'fixed',
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
    <section className="w-full col-span-full center-col">
      <Heading title="Your Custom Lists" />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={toggleAddNewListModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <Formik
          initialValues={{ listName: '' }}
          onSubmit={(formValues) => {
            handleSubmit(formValues);
          }}
        >
          <Form className="center-col">
            <Field
              name="listName"
              type="text"
              placeholder="List name"
              className="px-4 py-2 text-black border-2 shadow-lg"
            />
            <button type="submit" className="text-black">
              Add your list
            </button>
          </Form>
        </Formik>
      </ReactModal>
      <ul className="flex-wrap w-full gap-4 center">
        <li
          onClick={toggleAddNewListModal}
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
    </section>
  );
}

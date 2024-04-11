import Heading from 'components/UI/heading/heading';
import { Field, Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';
import { v4 as uuid } from 'uuid';

export default function UserLists() {
  const user = useStateStore((state) => state.user);
  const [modalIsOpen, setIsOpen] = useState(false);

  // add list modal append to root
  ReactModal.setAppElement(document.getElementById('root'));

  const [componentData, setComponentData] = useState({
    title: 'Your Custom Lists',
    data: [],
  });

  const [lists, setLists] = useState([]);

  const DB = new ConnectDB();

  useEffect(() => {
    async function fetchData() {
      try {
        // get user object from db
        const userData = await DB.getFirestoreDoc(['users', user.uid]);
        setLists(Object.values(userData.lists));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }

    // because user auth check is async, I check for the user to not be null
    if (user) {
      fetchData();
    }
  }, [user]);

  function handleAddNewList() {
    setIsOpen(!modalIsOpen);
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
    <div className="w-full">
      <Heading title={componentData.title} />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleAddNewList}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <Formik
          initialValues={{ listName: '' }}
          onSubmit={async (values) => {
            console.log(values);
            setLists([...lists, { listName: values.listName }]);
            const listID = uuid();
            await DB.updateFirestoreDoc(['users', user.uid], {
              listName: values.listName,
              listID: listID,
            });
            await DB.setFirestoreDoc(['lists', user.uid, listID, 'test'], {});
          }}
        >
          <Form className="center-col">
            <Field
              name="listName"
              type="text"
              placeHolder="List name"
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
          onClick={handleAddNewList}
          className="w-[200px] h-[200px] rounded-lg font-bold border-2 center text-3xl cursor-pointer"
        >
          +
        </li>
        {lists.map((list) => {
          return (
            <li
              key={list.listID}
              className="text-3xl font-bold border-2 rounded-lg "
            >
              <Link to={list.listName} className="w-[200px] h-[200px] center">
                {list.listName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

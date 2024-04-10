import Heading from 'components/UI/heading/heading';
import { Field, Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

export default function UserLists() {
  const user = useStateStore((state) => state.user);
  const [modalIsOpen, setIsOpen] = useState(false);

  ReactModal.setAppElement(document.getElementById('root'));

  const [componentData, setComponentData] = useState({
    title: 'Your Custom Lists',
    data: [],
  });

  const DB = new ConnectDB();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await DB.getFirestoreDocs([user.uid]);
        setComponentData({
          ...componentData,
          data: fetchedData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    }

    // because user auth check is async, I check the user to not be null
    if (user) {
      fetchData();
    }
  }, [user]);

  const [lists, setLists] = useState([
    { listName: 'comedy' },
    { listName: 'horror' },
    { listName: 'action' },
  ]);

  function handleAddNewList() {
    setIsOpen(!modalIsOpen);
  }

  return (
    <div className="w-full">
      <Heading title={componentData.title} />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleAddNewList}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={{ listName: 'name', listDescription: 'description' }}
          onSubmit={async (values) => {
            DB.setFirestoreDoc(
              ['lists', user.uid, values.listName],
              values.listDescription
            );
            setLists([...lists, { listName: values.listName }]);
          }}
        >
          <Form className="center-col">
            <Field name="name" type="text" className="text-black" />
            <Field name="email" type="text" className="text-black" />
            <button type="submit">Submit</button>
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
              key={list.listName}
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

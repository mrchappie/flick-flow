import Modal from 'components/UI/modal/modal';
import { Field, Form, Formik } from 'formik';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function CreateNewList({ onAddNewListToState, onCloseModal }) {
  const { userData } = useStateStore();

  // add new list to DB
  async function handleSubmit(formValues) {
    const list = await DB.createNewList({
      uid: userData.uid,
      listName: formValues.listName,
    });

    onAddNewListToState(list);
    onCloseModal();
  }
  return (
    <Modal>
      <h1 className="text-3xl font-bold text-center text-black max-w-[400px]">
        Please input a name for your list:
      </h1>
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
    </Modal>
  );
}

import { Field, Form, Formik } from 'formik';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();

  function handleOnSubmit(formData) {
    const query = formData.searchQuery;
    if (query !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div className="bg-white rounded-sm">
      <Formik
        initialValues={{ searchQuery: '' }}
        onSubmit={(values, { resetForm }) => {
          handleOnSubmit(values);
          resetForm();
        }}
      >
        <Form className="center">
          <Field
            type="text"
            name="searchQuery"
            id="searchQuery"
            className="px-2 py-1 text-black bg-transparent outline-none"
            placeholder="Search.."
          />
          <button
            type="submit"
            className="p-2 text-white cursor-pointer rounded-e-sm bg-brand1"
          >
            <HiMagnifyingGlass className="pointer-events-none" />
          </button>
        </Form>
      </Formik>
    </div>
  );
}

import { Field, Form, Formik } from 'formik';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [, setSearchParams] = useSearchParams();

  function handleOnSubmit(formData) {
    const query = formData.searchQuery;
    if (query !== '') {
      setSearchParams({ query: formData.searchQuery });
    }
  }

  return (
    <div className="bg-white rounded-sm">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleOnSubmit}>
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
            <HiMagnifyingGlass />
          </button>
        </Form>
      </Formik>
    </div>
  );
}

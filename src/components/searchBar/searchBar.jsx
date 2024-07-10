import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
// import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleOnSubmit(formData) {
    const query = formData.searchQuery;
    if (query) {
      setSearchQuery({ query: formData.searchQuery });
      navigate(`/search?${new URLSearchParams(searchQuery).toString()}`);
    }
  }

  return (
    <div className="bg-white rounded-sm center">
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleOnSubmit}>
        <Form>
          <Field
            type="text"
            name="searchQuery"
            id="searchQuery"
            className="px-2 py-1 text-black bg-transparent outline-none"
            placeholder="Search.."
          />
          <button
            type="submit"
            className="w-8 h-8 p-2 text-white cursor-pointer rounded-e-sm bg-brand1"
          ></button>
        </Form>
      </Formik>
      {/* <HiMagnifyingGlass /> */}
    </div>
  );
}

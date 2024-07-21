import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from 'utils/hooks/useFetch';
import { createUser } from 'utils/services/auth/Auth';

export default function Register() {
  const { response, loading, fetchData } = useFetch({});
  const navigate = useNavigate();

  async function handleRegister(formData) {
    try {
      // attempt to login the user
      const userCredentials = await createUser(formData);
      const user = userCredentials.user;
      console.log(user);
      const accessToken = await user.getIdToken();

      if (user) {
        fetchData({
          customURL: process.env.REACT_APP_FIREBASE_INIT_USER,
          customMethod: 'POST',
          customBody: { data: { email: user.email, username: null } },
          customHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // navigate the user to the homepage
    if (!loading) {
      navigate('/home');
    }
  }, [loading, navigate]);

  return (
    <section className="col-span-full center">
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="rounded-md center-col p-[40px]">
          <Formik
            initialValues={{ email: 'alex@mail.com', password: 'Alex2024!' }}
            onSubmit={handleRegister}
          >
            <Form className="items-stretch h-full center-col">
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className="text-black w-[400px] h-10"
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="text-black w-[400px] h-10"
              />
              <ButtonTextBg type="submit">Register</ButtonTextBg>
            </Form>
          </Formik>
          <Link to={'/login'}>Already have an accout? Log in!</Link>
        </div>
      )}
    </section>
  );
}

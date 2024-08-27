import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { LoadingSpinner } from 'components/UI/loadingSpinner/loadingSpinner';
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from 'utils/hooks/useFetch';
import { createUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';

export default function Register() {
  const { loading, fetchData } = useFetch({});
  const navigate = useNavigate();
  const { updateUserData } = useStateStore();

  async function handleRegister(formData) {
    try {
      // attempt to login the user
      const userCredentials = await createUser(formData);
      const user = userCredentials.user;
      const accessToken = await user.accessToken;

      if (user) {
        const result = await fetchData({
          customURL: process.env.REACT_APP_FIREBASE_INIT_USER,
          customMethod: 'POST',
          customBody: {
            data: { email: user.email, name: user.email.split('@')[0] },
          },
          customHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (result && result.status === 200) {
          updateUserData(result.data);
          return navigate('/home');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="col-span-full center">
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="rounded-md center-col p-[40px]">
          <Formik
            initialValues={{ email: '', password: '' }}
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

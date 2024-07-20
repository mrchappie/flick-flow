import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useFetch from 'utils/hooks/useFetch';
import { createUser } from 'utils/services/auth/Auth';
import { useStateStore } from 'utils/services/state/State';

export default function Register() {
  const navigate = useNavigate();
  const { fetchData } = useFetch({});
  const { updateUserAuthToken } = useStateStore();
  const { userAuthToken } = useStateStore();

  async function handleRegister(formData) {
    try {
      // attempt to login the user
      const userCredentials = await createUser(formData);
      const user = userCredentials.user;

      console.log(user);
      updateUserAuthToken(user.accessToken);
      if (user) {
        console.log(userAuthToken);
        fetchData(process.env.REACT_APP_FIREBASE_INIT_USER, 'POST', {
          data: { email: user.email, username: null },
        });

        // redirect to homepage
        navigate('/home');
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="col-span-full center">
      <div className="rounded-md center p-[40px]">
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
      </div>
    </section>
  );
}

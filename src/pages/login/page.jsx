import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from 'utils/services/auth/Auth';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function Login() {
  const { isLoggedIn } = useStateStore();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/home');
    return;
  }

  async function handleLogin(formData) {
    try {
      // attempt to login the user
      const response = await loginUser(formData);
      console.log(response);
      if (response) {
        await DB.updateFirestoreDoc(['users', response.user.uid], {
          email: response.user.email,
        });
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="col-span-full center">
      <div className="rounded-md center-col p-[40px]">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
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
            <ButtonTextBg type="submit">Log In</ButtonTextBg>
          </Form>
        </Formik>
        <Link to={'/register'}>Don't have an accout? Create one!</Link>
      </div>
    </section>
  );
}

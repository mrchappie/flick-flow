import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { loginUser } from 'utils/services/auth/Auth';

export default function Login() {
  async function handleLogin(formData) {
    try {
      // attempt to login the user
      const response = await loginUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="col-span-full center">
      <div className="rounded-md center-col p-[40px]">
        <Formik
          initialValues={{ email: 'alex@mail.com', password: 'Alex2024!' }}
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

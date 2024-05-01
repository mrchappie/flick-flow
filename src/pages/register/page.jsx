import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Field, Form, Formik } from 'formik';
import { createUser } from 'utils/services/auth/Auth';
import ConnectDB from 'utils/services/crud/crud';
import { v4 as uuid } from 'uuid';

export default function Register() {
  const DB = new ConnectDB();

  async function initUserData(user) {
    const favListID = uuid();
    const watchListID = uuid();
    const historyListID = uuid();

    // init user object in DB
    await DB.setFirestoreDoc(['users', user.uid], {
      uid: user.uid,
      username: null,
      email: user.email,
      genres: [],
      lists: [
        {
          listID: favListID,
          listName: 'favorites',
        },
        {
          listID: watchListID,
          listName: 'watchlist',
        },
        {
          listID: historyListID,
          listName: 'watch-history',
        },
      ],
    });

    // init user default lists in DB
    await DB.setFirestoreDoc(['lists', user.uid, favListID, 'test'], {});

    await DB.setFirestoreDoc(['lists', user.uid, watchListID, 'test'], {});

    await DB.setFirestoreDoc(['lists', user.uid, historyListID, 'test'], {});
  }

  async function handleRegister(formData) {
    console.log(formData);

    try {
      // attempt to login the user
      const userCredentials = await createUser(formData);
      const user = userCredentials.user;

      if (user) {
        initUserData(user);
      }
      console.log(user);
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

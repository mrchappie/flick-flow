import { createUser } from 'utils/services/auth/Auth';

export default function Register() {
  async function handleRegister(event) {
    // prevent default behaviour of forms
    event.preventDefault();

    // extracts the form data object from event
    const formData = new FormData(event.target);

    // attempt to login the user
    await createUser(formData);
  }

  return (
    <section className="col-span-full center ">
      <div className="bg-black/50 rounded-md center p-[40px]">
        <form onSubmit={handleRegister} className="center-col">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="text-black w-[400px] h-10"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-black w-[400px] h-10"
          />
          <button type="submit" className="bg-slate-400 w-[400px] h-10">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

import { createUser } from 'utils/services/auth/Auth';

export default function Register() {
  return (
    <section className="col-span-full center ">
      <div className="bg-black/50 rounded-md center p-[40px]">
        <form action={createUser} className="center-col">
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

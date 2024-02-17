'use client';
import { FormEvent } from 'react';
import { loginUser } from '@services/auth/Auth';
import { useStateStore } from '@services/state/State';

export default function Login() {
  const isLoggedIn = useStateStore((state) => state.isLoggedIn);
  const updateIsLoggedIn = useStateStore((state) => state.updateIsLoggedIn);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const response = await loginUser(formData);

    if (response) {
      updateIsLoggedIn(true);
    }
  };

  return (
    <section className="col-span-full center ">
      <div className="bg-black/50 rounded-md center p-[40px]">
        <form onSubmit={handleLogin} className="center-col">
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
            {isLoggedIn ? 'Logged In' : 'Log In'}
          </button>
        </form>
      </div>
    </section>
  );
}

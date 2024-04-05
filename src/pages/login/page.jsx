export default function Login() {
  async function handleLogin(formData) {
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log(rawFormData);
  }

  return (
    <section className="col-span-full center ">
      <div className="bg-black/50 rounded-md center p-[40px]">
        <form action={handleLogin} className="center-col">
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
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}

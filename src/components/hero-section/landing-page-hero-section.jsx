import { Link } from 'react-router-dom';

export default function LandingPageHeroSection() {
  return (
    <section className="w-full h-[70vh] col-span-full center justify-start-start overflow-hidden relative">
      <div className="w-full">
        <div className="w-[50%] center-col gap-6">
          <h1 className="text-[50px] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            asperiores ea, pariatur laudantium modi ratione.
          </p>
          <label htmlFor="landingPageSubButton" className="w-full">
            <input type="text" id="landingPageSubButton" placeholder="Email" />
            <button>
              <Link to={'/register'}>Sign Up</Link>
            </button>
          </label>
        </div>
      </div>
    </section>
  );
}

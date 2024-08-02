import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Link } from 'react-router-dom';

export default function LandingPageHeroSection() {
  return (
    <section className="w-full h-[70vh] col-span-full center justify-start-start overflow-hidden relative">
      <div className="w-full">
        <div className="w-[50%] center-col items-start gap-6">
          <h1 className="text-[20px] font-semibold">Welcome to FlickFlow</h1>
          <p className="text-[50px] font-bold">
            Download Unlimited Movies, Drama, Music Video and More Content.
          </p>
          <p className="text-md w-[60%]">
            Enjoy exclusive Music Video popular movies and Live shows. Sign Up
            to <b>FlickFlow</b> now.
          </p>
          <label htmlFor="landingPageSubButton" className="w-full">
            {/* <input
              type="text"
              id="landingPageSubButton"
              placeholder="Email"
              className="p-3 text-black outline-none"
            /> */}
            <ButtonTextBg customStyle={'w-[200px]'}>
              <Link to={'/register'}>Sign Up</Link>
            </ButtonTextBg>
          </label>
        </div>
      </div>
    </section>
  );
}

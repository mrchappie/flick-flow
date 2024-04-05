import './loaderStyle.css';

// on page loading spinner
export function LoadingSpinner() {
  return (
    <section className="absolute top-0 left-0 w-full h-full bg-black center">
      <span className="loader"></span>
    </section>
  );
}

// inline loading spinner

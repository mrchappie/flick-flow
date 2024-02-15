export default function Heading({ title }: Heading) {
  return (
    <div className="center justify-between w-full">
      <h1 className="text-[35px]">{title}</h1>
    </div>
  );
}

interface Heading {
  title: string;
}

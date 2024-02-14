export default function Title({ title }: Title) {
  return (
    <div className="center justify-between w-full">
      <h1 className="text-[35px]">{title}</h1>
      <a href="/movies">See all</a>
    </div>
  );
}

interface Title {
  title: string;
}

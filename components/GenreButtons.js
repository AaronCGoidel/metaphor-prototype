export default function GenreButtons({ genre, setGenre }) {
  const genres = ["Action", "Comedy", "Drama", "Romance"];

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <button
          type="button"
          key={g}
          className={`rounded-xl py-2 px-4 border-indigo-600 border-2  ${g === genre ? "bg-blue-300" : ""}`}
          onClick={() => setGenre(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

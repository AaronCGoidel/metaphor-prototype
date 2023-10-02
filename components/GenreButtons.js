export default function GenreButtons({ genre, setGenre }) {
  const genres = ["Action", "Comedy", "Drama", "Romance"];

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <button
          key={g}
          className={`text-white rounded-full py-2 px-4 ${g === genre ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={() => setGenre(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

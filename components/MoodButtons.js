export default function MoodButtons({ mood, setMood }) {
  const moods = [
    { emoji: '😃', name: 'happy' },
    { emoji: '😭', name: 'like crying' },
    { emoji: '🤪', name: 'silly' },
    { emoji: '😠', name: 'angry' },
    { emoji: '🥰', name: 'lovey-dovey' },
    { emoji: '🥳', name: 'celebratory' },
  ];

  return (
    <>
    <br />
    <label>I'm feeling...</label>
    <div className="flex flex-wrap gap-2">
      {moods.map((m) => (
        <button
          type="button"
          key={m.name}
          className={`text-xl rounded-xl py-2 px-4 border-indigo-600 border-2 ${m.name === mood ? "bg-blue-300" : ""}`}
          onClick={() => setMood(m.name)}
        >
          {m.emoji}
        </button>
      ))}
    </div>
    </>
  );
}
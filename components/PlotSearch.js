export default function PlotSearch({ plot, setPlot }) {
  return (
    <>
      <br />
      <label>I want a movie where...</label>
      <input
        type="text"
        className="border rounded p-2 w-full"
        placeholder="e.g. there's a happy ending"
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
      />
    </>
  );
}

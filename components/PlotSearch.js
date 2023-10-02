export default function PlotSearch({ plot, setPlot }) {
  return (
    <input
      type="text"
      className="border rounded p-2 w-full"
      placeholder="Enter desired plot points"
      value={plot}
      onChange={(e) => setPlot(e.target.value)}
    />
  );
}

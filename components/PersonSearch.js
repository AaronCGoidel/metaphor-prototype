import { useState, useEffect } from "react";

function SearchDropdown({ searchType, setSearchType }) {
  return (
    <select
      className="border rounded p-2"
      onChange={(e) => setSearchType(e.target.value)}
      value={searchType}
    >
      <option value="Director">Director</option>
      <option value="Actor">Actor</option>
    </select>
  );
}

export default function PersonSearch({
  isActor,
  setIsActor,
  person,
  setPerson,
}) {
  const [searchType, setSearchType] = useState("Director");

  useEffect(() => {
    setIsActor(searchType === "Actor");
  }, [searchType]);

  return (
    <>
      <br />
      <label>I'd like to see the work of... (optional)</label>
      <div className="flex items-center space-x-2">
        <SearchDropdown searchType={searchType} setSearchType={setSearchType} />
        <input
          type="text"
          className="flex-grow border rounded p-2"
          placeholder={`Search for ${searchType}`}
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        />
      </div>
    </>
  );
}

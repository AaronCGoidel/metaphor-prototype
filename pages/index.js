import Head from "next/head";
import MoodButtons from "../components/MoodButtons";
import GenreButtons from "../components/GenreButtons";
import PlotSearch from "../components/PlotSearch";
import PersonSearch from "../components/PersonSearch";
import MovieLink from "../components/MovieLink";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [genre, setGenre] = useState("Action");
  const [mood, setMood] = useState("happy");
  const [isActor, setIsActor] = useState(true); // [actor, director]
  const [person, setPerson] = useState("");
  const [plot, setPlot] = useState("");

  const [contentData, setContentData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    let query = `A ${genre} movie where ${plot} for when you're feeling ${mood}.`;

    if (person !== "") {
      query += ` and ${isActor ? "stars" : "is directed by"} ${person}`;
    }
    console.log("Query:", query);

    try {
      const requestData = {
        query: query,
        numResults: 5,
        includeDomains: ["imdb.com"],
        useAutoprompt: true,
      };

      const response = await axios.post("/api/search", requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const documentIds = response.data.results.map((item) => item.id);
      console.log(documentIds);

      const contentResponse = await axios.get("/api/getContents", {
        params: {
          ids: documentIds,
        },
        headers: {
          Accept: "application/json",
        },
      });

      const contentData = contentResponse.data;

      setContentData(contentData.contents);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <>
      <Head>
        <title>🎥 Meta-Movie Search</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-12 lg:p-24 bg-gray-100">
        <div className="z-10 w-full p-8 rounded-lg shadow-lg bg-white items-center justify-between font-mono text-sm lg:flex">
          <form className="flex flex-col space-y-4 w-full">
            <GenreButtons genre={genre} setGenre={setGenre} />

            <PlotSearch plot={plot} setPlot={setPlot} />

            <MoodButtons mood={mood} setMood={setMood} />

            <PersonSearch
              isActor={isActor}
              setIsActor={setIsActor}
              person={person}
              setPerson={setPerson}
            />

            <div className="flex justify-center">
              <button
                className="border-2 border-green-500 rounded-full py-2 px-8 hover:bg-green-500 hover:text-white"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-full p-8 rounded-lg shadow-lg bg-white mt-8">
          {contentData.length > 0 ? (
            contentData.map((content, index) => (
              <MovieLink key={index} content={content} index={index} />
            ))
          ) : (
            <p>Search for something.</p>
          )}
        </div>
      </main>
    </>
  );
}

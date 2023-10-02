import Head from "next/head";
import MoodButtons from "../components/MoodButtons";
import GenreButtons from "../components/GenreButtons";
import PlotSearch from "../components/PlotSearch";
import PersonSearch from "../components/PersonSearch";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

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

      const metaphorApiUrl = "https://api.metaphor.systems/search";

      const response = await axios.post(metaphorApiUrl, requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_METAPHOR_API_KEY,
        },
      });

      const documentIds = response.data.results.map((item) => item.id);
      console.log(documentIds);

      const contentResponse = await axios.get(
        "https://api.metaphor.systems/contents",
        {
          params: {
            ids: documentIds,
          },
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_METAPHOR_API_KEY,
          },
        }
      );

      const contentData = contentResponse.data;

      setContentData(contentData.contents);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
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
            <Link  href={content.url} target="_blank">
            <div key={index} className="mb-4 p-4 border rounded">
              <h2 className="text-lg font-bold flex items-center">
                
                  {content.title.split(" - ")[0]}
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </h2>
              </div>
            </Link>
          ))
        ) : (
          <p>Search for something.</p>
        )}
      </div>
    </main>
  );
}

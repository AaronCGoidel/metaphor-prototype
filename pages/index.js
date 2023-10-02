import Head from "next/head";
import Image from "next/image";
import GenreButtons from "../components/GenreButtons";
import PlotSearch from "../components/PlotSearch";
import PersonSearch from "../components/PersonSearch";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [genre, setGenre] = useState("Action");
  const [isActor, setIsActor] = useState(true); // [actor, director]
  const [person, setPerson] = useState("");
  const [plot, setPlot] = useState("");

  const [contentData, setContentData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = `A ${genre} movie where ${plot} and ${
      isActor ? "stars" : "is directed by"
    } ${person}`;
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
          "X-API-KEY": process.env.NEXT_PUBLIC_METAPHOR_API_KEY
        },
      });

      const documentIds = response.data.results.map(item => item.id);
      console.log(documentIds);
  
      const contentResponse = await axios.get("https://api.metaphor.systems/contents", {
        params: {
          ids: documentIds
        },
        headers: {
          "Accept": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_METAPHOR_API_KEY
        }
      });
  
      const contentData = contentResponse.data;
  
      setContentData(contentData.contents);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="z-10 w-full p-8 rounded-lg shadow-lg bg-white items-center justify-between font-mono text-sm lg:flex">
        <form className="flex flex-col space-y-4 w-full">
          <GenreButtons genre={genre} setGenre={setGenre} />

          <PersonSearch
            isActor={isActor}
            setIsActor={setIsActor}
            person={person}
            setPerson={setPerson}
          />

          <PlotSearch plot={plot} setPlot={setPlot} />

          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white rounded-full py-2 px-8 hover:bg-green-600"
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
          <div key={index} className="mb-4 p-4 border rounded">
            <h2 className="text-lg font-bold">
              <a href={content.url} target="_blank" rel="noopener noreferrer">
                {content.title}
              </a>
            </h2>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: content.extract }}
            />
          </div>
        ))
      ) : (
        <p>Search for something.</p>
      )}
    </div>
    </main>
  );
}

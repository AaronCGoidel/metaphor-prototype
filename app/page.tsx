"use client";
import Image from 'next/image';
import GenreButtons from '../components/GenreButtons';
import PlotSearch from '../components/PlotSearch';
import PersonSearch from '../components/PersonSearch';
import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('Action');
  const [isActor, setIsActor] = useState(true); // [actor, director]
  const [person, setPerson] = useState('');
  const [plot, setPlot] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = `A ${genre} movie where ${plot} and ${isActor ? 'stars' : 'is directed by'} ${person}:`
    console.log(query);
    // todo query metaphor
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <div className="z-10 max-w-5xl w-full p-8 rounded-lg shadow-lg bg-white items-center justify-between font-mono text-sm lg:flex">
        <form className="flex flex-col space-y-4 w-full">
          <GenreButtons genre={genre} setGenre={setGenre} />

          <PersonSearch isActor={isActor} setIsActor={setIsActor} person={person} setPerson={setPerson} />

          <PlotSearch plot={plot} setPlot={setPlot} />

          <div className="flex justify-center">
            <button className="bg-green-500 text-white rounded-full py-2 px-8 hover:bg-green-600">
              Search
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

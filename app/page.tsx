"use client"

import { useState } from "react"
import { SearchForm } from "@/components/search-form"
import { MovieGrid } from "@/components/movie-grid"

export default function Home() {
  const [liveQuery, setLiveQuery] = useState("")

  const handleQueryChange = (query: string) => {
    setLiveQuery(query)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold text-center mb-6">Movie Explorer</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-8">
          Search for your favorite movies, discover new films, and share your thoughts with our community.
        </p>
        <SearchForm onQueryChange={handleQueryChange} />
      </div>

      {liveQuery ? (
        <div className="mb-10">
          <p className="mb-6 text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{liveQuery}</span>
          </p>
          <MovieGrid searchQuery={liveQuery} />
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Popular Movies</h2>
            <MovieGrid />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Top Rated</h2>
            <MovieGrid />
          </div>
        </>
      )}
    </div>
  )
}


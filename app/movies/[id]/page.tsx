import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewList } from "@/components/review-list"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from an API
const mockMovie = {
  id: 1,
  title: "Inception",
  poster: "/placeholder.svg?height=600&width=400",
  backdrop: "/placeholder.svg?height=1080&width=1920",
  year: 2010,
  rating: 8.8,
  runtime: 148,
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
  plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  genres: ["Action", "Adventure", "Sci-Fi"],
  thumbnails: [
    "/placeholder.svg?height=200&width=300&text=Scene+1",
    "/placeholder.svg?height=200&width=300&text=Scene+2",
    "/placeholder.svg?height=200&width=300&text=Scene+3",
    "/placeholder.svg?height=200&width=300&text=Scene+4",
    "/placeholder.svg?height=200&width=300&text=Scene+5",
    "/placeholder.svg?height=200&width=300&text=Scene+6",
  ],
}

interface MoviePageProps {
  params: { id: string }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id

  // In a real app, fetch the movie data based on the ID
  const movie = mockMovie

  return (
    <div className="pb-4">
      {/* Backdrop */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 z-10" />
        <Image src={movie.backdrop || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="container relative z-20 h-full flex flex-col justify-end pb-6 px-4 md:px-6 mx-auto">
          <Link href="/" className="mb-auto mt-4">
            <Button variant="ghost" size="sm" className="gap-1 px-0">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block relative h-[200px] w-[140px] shrink-0 rounded-lg overflow-hidden shadow-lg">
              <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime} min</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">{movie.plot}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Director:</span> {movie.director}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-4 px-4 md:px-6">
        {/* Cast */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor) => (
              <Badge key={actor} variant="outline">
                {actor}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.thumbnails.map((thumbnail, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={thumbnail || "/placeholder.svg"}
                    alt={`${movie.title} scene ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            <ReviewList movieId={movieId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


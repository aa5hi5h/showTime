"use client"
import { trpcClient } from "@/trpc/client"


const MoviesListingPage = () => {

    const {data,isLoading} = trpcClient.movies.movies.useQuery()

    if(isLoading){
        return <div>Loading..........</div>
    }
    
    console.log("data::::",data)
    return (
        <div>
            this is the moview page here you will see all the movies created haha
            <div className="grid grid-cols-3 space-y-4 space-x-4 p-4">
                {data?.map((movie) => (
                    <div className="p-2 border border-red-600 rounded-md justify-center items-center flex flex-col " key={movie.id}>
                        {movie.name}
                        {movie.Genere}
                        {movie.director}
                        {movie.duration}
                        <img className="w-64 h-64" src={`${movie.poster}` } alt="movie poster " />
                        {movie.releaseDate}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MoviesListingPage
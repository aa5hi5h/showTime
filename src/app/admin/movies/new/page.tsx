"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { createMovies, CreateMoviesForm } from "@/Form/CreateMovies"
import { Button } from "@/components/ui/button"
import { trpcClient } from "@/trpc/client"
import { GENERE } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const MovieCreationPage = () => {

    const {register, handleSubmit} = useForm<CreateMoviesForm>({
        resolver: zodResolver(createMovies)
    })

    const {data,mutateAsync} = trpcClient.movies.createMovies.useMutation()

    const {toast} = useToast()
    const router = useRouter()



    return (
        <form onSubmit={handleSubmit(async(values) => {
            console.log("VALUES:::::",values)
            const movies = await mutateAsync(values)
            if(movies){
                toast({title: 'MOvie created sucessfully'})
                router.push("/admin/movies")
            }
        })} className="max-w-md rounded-md border-2 p-8 border-red-400">
            <span>
            <Label  className="text-lg">Title</Label>
            <Input className="mt-1" {...register("name")} />
            </span>
            <div className="mt-2">
            <Label className="text-lg">Genere</Label>
            <select {...register("Genere")}>
            {Object.values(GENERE).map((type) => (
                <option key={type}>
                    {type}
                </option>
            ))}
            </select>
            </div>
            <div className="mt-2">
            <Label className="text-xl">Director</Label>
            <Input {...register("director")} />
            </div>
            <div className="mt-2">
            <Label className="text-xl">Duration</Label>
            <Input {...register("duration",{
                valueAsNumber: true
            })} />
            </div>
            <div className="mt-2">
            <Label className="text-xl">Poster Img</Label>
            <Input {...register("poster")} />
            </div>
            <div className="mt-2">
            <Label className="text-xl">Release date</Label>
            <Input type="date" {...register("releaseDate",{
                setValueAs: (value:any) => {
                    const date = new Date(value)
                    return isNaN(date.getTime()) ? "" : date.toISOString()
                }
            })} />
            </div>
            <Button className="mt-4" type="submit">Submit</Button>
        </form>
    )
}


export default MovieCreationPage
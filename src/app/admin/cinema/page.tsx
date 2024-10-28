"use client"
import { trpcClient } from "@/trpc/client"
import { format } from "date-fns"
import Image from "next/image"


const CinemaListingsPage = () => {

    const {data,isLoading} = trpcClient.cinemas.getCinemas.useQuery()

    if(isLoading){
        return <div>Loading.......</div>
    }

    return (
        <div>
           {data?.length === 0 ? <div>NO Cinema screens yet</div> 
           : <div>
            {data?.map((cinema) => (
                <div key={cinema.id} className="flex flex-col">
                    <div>{cinema.name}</div>
                     {cinema.Screens.length === 0 && <div>there is no showtime at current.</div>}
                     <div>
                        {cinema.Screens.map((screen) => (
                            <div key={screen.id}>
                                <div>Screen {screen.number}</div>
                                <div>
                                   {screen.showTime.length === 0 ? <div >NO show found</div> :
                                    <div>
                                    {
                                        screen.showTime.map((showtime) => (
                                            <div key={showtime.id}>
                                                <div className="p-3 text-2xl">
                                                    {format(showtime.startTime.toString(),"p")}
                                                    </div>
                                                    <div className="text-xs text-gray-700">
                                                        {format(showtime.startTime.toString(),"pp")}
                                                    </div>
                                                    <Image
                                                    src={showtime.Movie.poster || "https://imgs.search.brave.com/ctTqX-zbk0tj0FSdBB0IxCRguaxt25kStDrRz3UcwCU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTEwSlo4WlROWUwu/anBn"}
                                                    alt="Movie"
                                                    width={300}
                                                    height={300} />
                                            </div>
                                        ))
                                    }
                                    </div>} 
                                </div>
                            </div>
                        ))}
                        </div>
                </div>
            ))}
            </div>
            }
        </div>
    )
} 


export default CinemaListingsPage
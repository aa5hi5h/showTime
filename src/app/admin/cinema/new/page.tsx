"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateCinemaForm, CreateCinemaSchema, ScehemaCreateSceen } from "@/Form/CreateCinema"
import { useToast } from "@/hooks/use-toast"
import { trpcClient } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProjectionType, SoundSystem } from "@prisma/client"
import { Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"


const CinemaCreation = () => {

    const form = useForm<CreateCinemaForm>({
        resolver: zodResolver(CreateCinemaSchema),
        defaultValues: {
            name: "",
            address: {
                adress: "",
                lng: 0,
                lat: 0
            }, 
            screen:[]
        }
    })

    const { mutateAsync:CreateCinema} = trpcClient.cinemas.createCinema.useMutation()

    const router = useRouter()
    const {toast} = useToast()


    const handleSubmit = async(values: CreateCinemaForm ) => {

        console.log("DATA::::",values)
        const newCinema = await CreateCinema(values)
        console.log(values)

        if(newCinema){
            toast({title:"NEw Cinema has been Created"})
            router.push("/admin/cinema")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField 
                name="name"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name for the cinema</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormDescription>
                            THis is the public name od the cinema which will be visible to the end user.
                        </FormDescription>
                    </FormItem>
                ) } />
                <FormField name="address.adress"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="address...." {...field} />
                        </FormControl>
                        <FormDescription>
                            put a exact and correct location of the cinema!!!
                        </FormDescription>
                    </FormItem>
                )} />
                <AddScreen />
                <Button type="submit" >Submit</Button>
            </form>
        </Form>
    )
}

export const AddScreen = () => {
    

    const {
        control,
        register,
        formState:error,
        watch
    } = useFormContext<CreateCinemaForm>()

    const { append ,remove,fields} = useFieldArray({
        control,
        name: "screen"
    })

    return <div>
        {fields.map((item,index) => {
            const row = watch(`screen.${index}.row`) || 0
            const coloumn = watch(`screen.${index}.coloumn`) || 0
            return (
            <div key={index}>
                <Button
                variant={"link"}
                size={"sm"}
                className="underline underline-offset-2"
                onClick={() => {
                    remove(index)
                }}>
                    remove screen
                </Button>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Label 
                        className="flex flex-col space-y-2"
                         >
                            <span className="text-xl font-semibold">Projection Type</span>
                            <select {...register(`screen.${index}.ProjectionType`)}>
                                {Object.values(ProjectionType).map((type) => (
                                    <option key={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                         </Label>
                         <Label className="flex flex-col font-semibold" title="Sound system">
                            <span className="text-xl font-semibold">Sound System</span>
                            <select {...register(`screen.${index}.SoundSystem`)}>
                                {Object.values(SoundSystem).map((type) => (
                                    <option key={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                         </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Label className="flex flex-col gap-y-2" title="Rows">
                            <span className="text-xl font-semibold">Rows</span>
                            <Input 
                            {...register(`screen.${index}.row`,{
                                valueAsNumber: true
                            })}
                            placeholder="enter the row you have in your screen house e.g. 10" />
                        </Label>
                        <Label className="flex flex-col gap-y-2" title="Column">
                            <span className="text-xl font-semibold">Column</span>
                            <Input 
                            {...register(`screen.${index}.coloumn`,{
                                valueAsNumber: true
                            })} 
                            placeholder="enter the coloumn you have in your dcreen house"
                            />
                        </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Label className="flex flex-col sapce-y-2" title="price">
                            <span className="text-xl font-semibold">price</span>
                            <Input 
                            {...register(`screen.${index}.price`, {
                                valueAsNumber: true
                            })}
                             placeholder="$$$" />
                        </Label>
                    </div>
                    <Grid row= {row} coloumn={coloumn} />
                </div>
            </div>
        )})}
        <div>
            <Button
            variant={"link"}
            size={"sm"}
            className="underline underline-offset-2"
            onClick={() => {
                append({coloumn:0,price:0,row:0,ProjectionType:"HDR",SoundSystem:"DOLBY_ATMOS"})
            }}>
                Add Screen
            </Button>
        </div>
    </div>
}

export const Grid = ({row,coloumn}:{row: number,coloumn:number}) => {

    const renderRows = () => {
        const rowElements =  []

        for (let i = 0 ; i < row ; i++){
            const columnElement = []

            for(let j = 0; j < coloumn ; j++){
                columnElement.push(<Square key={`${i}-${j}`} />)
            }

            rowElements.push(
                <div key={`row-${i}`}>
                    {columnElement}
                </div>
            )
        }

        return (
            <div className="flex  items-center gap-2">
                {rowElements}
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {renderRows()}
        </div>
    )

}


export default CinemaCreation
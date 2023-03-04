"use client"
import { useMutation, useQueryClient } from "react-query"
import React,{ useState } from "react"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

const AddWord = ({groupId}) => {
    const [word, setWord] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastWordID: string

    const { mutate } = useMutation(
        async (wordData) =>
            await axios.post("/api/words/addWord", wordData),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.dismiss(toastWordID)
                    toast.error(error?.response?.data.message, { id: toastWordID })
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["detail-group"])
                toast.dismiss(toastWordID)
                toast.success("Word has been Added", { id: toastWordID })
                setWord("")
                setIsDisabled(false)
            },
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        toastWordID = toast.loading("Creating your group", { id: toastWordID })
        try {
            setIsDisabled(true)
            const wordWithMeanings = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

            const definitions = formatDefinitions(wordWithMeanings.data[0].meanings)
            const wordData = {
                word: wordWithMeanings.data[0].word,
                audio: wordWithMeanings.data[0].phonetics[0].audio,
                definitions: definitions,
                groupId: groupId
            }
            // console.log(wordData);
            mutate(wordData)
        } catch (error) {
            toast.dismiss(toastWordID)
            toast.error("Word not found")
            setWord("")
            setIsDisabled(false)
        }
        
    }

    const formatDefinitions = (defs) =>{
        const definitions = []
        defs.map((def)=>{
            definitions.push(def.definitions[0].definition)
        })
        return definitions
    }

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md ">
            <div className="flex flex-col my-4">
                <input
                    onChange={(e) => setWord(e.target.value)}
                    value={word}
                    name="Word"
                    placeholder="Add a new Word"
                    className="p-4 text-lg rounded-md my-2  bg-gray-200"
                />
            </div>
            <div className=" flex items-center justify-between gap-2">
                <p
                    className={`font-bold text-sm ${word.length > 20 ? "text-red-700" : "text-gray-700"
                        } `}
                >{`${word.length}/20`}</p>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Add Word
                </button>
            </div>
        </form>
    )
}

export default AddWord
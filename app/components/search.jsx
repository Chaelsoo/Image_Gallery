"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"


export default function Search() {
    const [search,setSearch] = useState('')
    const router = useRouter()

    async function handleSubmit(e){
        e.preventDefault()
        router.push(`/results/${search}`)
        setSearch('')
    }

  return (
    <form className="flex justify-center md:justify-between" onSubmit={handleSubmit}>
        <input 
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="p-2 bg-white w-[260px] sm:w-80 text-xl rounded-xl text-black"
        ></input>
    </form>
  )
}

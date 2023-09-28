import Gallery from "/app/components/gallery.jsx";

export function generateMetadata({params : { term }}){
    const topic = term?.[0] ?? "curated"
    const page = term?.[1] ?? "1"
 return{
    title: ` Result for ${topic} - Page ${page}`
 }
}

export default function SearchResults({params : { term }}){
    const topic = term?.[0] ?? "curated"
    const page = term?.[1] ?? "1"
    return <Gallery topic={topic} page={page}/>
}
import fetchImages from "/lib/fetchImages"
import Image from "next/image"
import addBlurredDataUrls from "/lib/getBase64"
import Link from "next/link"
import getPrevNext from "/lib/getindexes"
import Footer from "./footer"

export default async function Gallery( {topic = "curated" ,page }) {

    let url 
    if (topic === 'curated' && page) { // browsing beyond home 
      url = `https://api.pexels.com/v1/curated?page=${page}&per_page=26`
  } else if (topic === 'curated') { // home 
      url = 'https://api.pexels.com/v1/curated?per_page=26'
  } else if (!page) { // 1st page of search results 
      url = `https://api.pexels.com/v1/search?query=${topic}&per_page=26`
  } else { // search result beyond 1st page
      url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}&per_page=26`
  }



    const images = await fetchImages(url)


    if (images){
    // const photos = images.photos

    const photosWithBlur = await addBlurredDataUrls(images)

    const { prevPage, nextPage } = getPrevNext(images)

    const footerProps =  { topic , page, nextPage, prevPage }
    function calcphotoSpans(photo){
    const widthHeightRatio = photo.height / photo.width
    const galleryHeight = Math.ceil(250 * widthHeightRatio)
    const photoSpans = Math.ceil(galleryHeight / 10) + 1
    return photoSpans
    }

  
    if (!images || images.per_page === 0 ) {
      return (
        <h2 className="m-4 text-2xl font-bold "> No Images Found </h2>
      )
    }
    return(
        <>
        <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((image) => (
        <div key={image.id} className="justify-self-center w-[250px]"  style={{ gridRow: `span ${calcphotoSpans(image)}` }}> 
        <Link href={image.src.large} target="_blank" className="grid place-content-center">
        <div className="rounded-xl overflow-hidden group">
        <Image
        src={image.src.large}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="250px"
        className="group-hover:opacity-75"
        placeholder="blur"
        blurDataURL={image.blurredDataUrl}
        />
          </div>
        </Link>
        </div>
        ))}

        </section>
          <Footer {...footerProps}/>
        
        </> 
    )
        }else{
          return <h2> fuck off</h2>
        }
}
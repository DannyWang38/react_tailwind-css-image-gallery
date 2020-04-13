import React,{useState,useEffect} from 'react';
import ImageCard from './components/ImageCard'
import ImageSearch from './components/ImageSearch'

function App() {
  const [images,setImages]=useState([])
  const [isLoading,setIsLoading]=useState(true)
  const [term,setTerm]=useState(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo&pretty=true`)

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res=>res.json())
    .then(data=>{
        setImages(data.hits)
        setIsLoading(false)
    })
    .catch(err=>console.log(err))
  },[term])
 // 從 ImageSearch 中 把 text 拿出來
  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={texts=>setTerm(texts)}/> 
      {!isLoading && images.length ===0 && <h1 className='text-5xl text-center mx-auto mt-6 text-red-400'>Images Not Found...</h1> }
      {isLoading ? <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      :<div className='grid grid-cols-3 gap-4'>
        {images.map(image=>(
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}

    </div>

  );
}

export default App;

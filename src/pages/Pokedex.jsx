import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components/Pokedex/PokeCard'
// import Posts from '../components/Pokedex/Pagination/Posts'
import SelectTypes from '../components/Pokedex/SelectTypes'
import './styles/pokedex.css'
//import Pagination from '../components/Pokedex/Pagination/Pagination'

const Pokedex = () => {

  const { nameTrainer } = useSelector((state) => state)

  const [pokemons, setPokemons] = useState()
  const [selectValue, setSelectValue] = useState('allpokemons')
//paginacion
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [postsPerPage] = useState(10)

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true)
//       const res = await axios.get('https://pokeapi.co/api/v2/pokemon/')
//       setPosts(res.data)
//       setLoading(false)
//     }
//     fetchPosts()
//   }, [])

//   const indexOfLastPost = currentPage * postsPerPage
//   const indexOfFirstPost = indexOfLastPost - postsPerPage
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

//   const paginate = pageNumber => setCurrentPage(pageNumber)
// //paginacion  
  useEffect(() => {
    if(selectValue === 'allpokemons'){
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      axios
        .get(url)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))
    } else {
      axios.get(selectValue)
        .then(res => {
          const results = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results})
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])
  
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value = ''
  }

  return (
    <div className='pokedex'>
      <h1 className='pokedex__title'>
        <span className='pokedex__title-name'>Hello {nameTrainer}</span>, here you will find your favourite Pokemon and much more!
      </h1>
      <div className='pokedex__container'>
        <form onSubmit={handleSubmit}>
          <input id='pokemon' type="text" />
          <button className='pokedex__btn'>Search</button>
        </form>
        <SelectTypes setSelectValue={setSelectValue} />
      </div>
      <div className='pokedex__container-pokemon'>
        {
          pokemons?.results.map(pokemon => (
            <PokeCard 
              key={pokemon.url}
              pokemon={pokemon}
            />
          ))
        }
      </div>
      {/* pagination */}
      {/* <div>
        <Posts 
          posts={currentPosts} 
          loading={loading}
        />
        <Pagination 
          postsPerPage={postsPerPage} 
          totalPosts={posts.length} 
          paginate={paginate}
        />
      </div> */}
      {/* pagination */}
    </div>
  )
}

export default Pokedex
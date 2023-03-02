import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokeInfo.css'
import colors from '../../src/utils/colorsPokemon'

const PokeInfo = () => {

  const { id } = useParams()

  const [poke, setPoke] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(url)
      .then(res => {
        setPoke(res.data)
        setHasError(false)
      })
      .catch(err => {
        setHasError(true)
        console.log(err)
      })
  }, [id])

  const typeColor = poke?.types[0].type.name

  if(hasError){
    return <h1>The Pokemon "{id}" doesn't exist</h1>
  } else {
    return (
      <article className='info' 
      style={{
        background: `linear-gradient(0deg, white 0 65%, ${colors[typeColor]?.first} 65% 70%, ${colors[typeColor]?.second} 80% 85%, ${colors[typeColor]?.third} 95% 100%`,
        borderColor: colors[typeColor]?.second
      }}
      >
        <div className='pokecard__info'>
          <header className='poke__header-info'>
            <img className='info__img' src={poke?.sprites.other['official-artwork'].front_default} alt="artwork" />
          </header>
          <h1 className='info__title'>{poke?.name}</h1>
        </div>
        <section className="poke__info">
          <div className='poke__info-features'>
            <span className='features__name'>Weight</span>
            <h3 className='features__numb'>{poke?.weight}</h3>
          </div>
          <div className='poke__info-features'>
            <span className='features__name'>Height</span>
            <h3 className='features__numb'>{poke?.height}</h3>
          </div>
          </section>
          <section className="type__and__abilities">
            <div className='type__container'>
              <h3>Type</h3>
              <div className='poke__type'>
                <span>{poke?.types[0].type.name}</span>
                <span>{poke?.types[0].type.name}</span>
              </div>
            </div>
            <div className='abilities__container'>
              <h3>Ability</h3>
              <div className='poke__type'>
                <span>{poke?.types[0].type.name}</span>
                <span>{poke?.types[0].type.name}</span>
              </div>
            </div>
          </section>
      </article>
    )
  }  
}

export default PokeInfo
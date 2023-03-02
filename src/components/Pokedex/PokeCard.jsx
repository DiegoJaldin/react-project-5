import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/pokecard.css'
import colors from '../../utils/colorsPokemon'

const PokeCard = ({ pokemon }) => {

  const [poke, setPoke] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(pokemon.url)
      .then(res => setPoke(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleClick = () => {
    navigate(`/pokedex/${poke.id}`)
  }

  const typeColor = poke?.types[0].type.name

  return (
    <article style={{
      background: `linear-gradient(0deg, white 0 65%, ${colors[typeColor]?.first} 65% 70%, ${colors[typeColor]?.second} 80% 85%, ${colors[typeColor]?.third} 95% 100%`,
      borderColor: colors[typeColor]?.second
    }} onClick={handleClick} className='card'>
      <header  className='card__header'>
        <img className='card__avatar' src={poke?.sprites.other['official-artwork'].front_default} alt="artwork" />
      </header>
      <h2 className={`card__name color-${poke?.types[0].type.name}`}>{poke?.name}</h2>
      <ul className='card__type-list'>
        {
          poke?.types.map(type => (
            <li className='card__type-item' key={type.type.name}>{type.type.name}</li>
          ))
        }
      </ul>
      <hr className='card__hr' />
      <ul className='card__stat-list'>
        {
          poke?.stats.map(stat => (
            <li className='card__stat-item' key={stat.stat.url}>
              <span className='card__stat-name'>{stat.stat.name}</span>
              <span className={`card__stat-number color-${poke?.types[0].type.name}`}>{stat.base_stat}</span>
            </li>
          ))
        }
      </ul>
    </article>
  )
}

export default PokeCard
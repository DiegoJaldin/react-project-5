import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import { setNameTrainer } from '../store/slices/trainerName.slice'
import './styles/home.css'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.name.value.trim()))
    e.target.name.value = ''
    navigate('/pokedex')
  }

  return (
    <div className='home'>
        <Header />
      <h2 className='home__title'>Welcome trainer</h2>
      <p className='home__description'>To start this pokedex, enter your name</p>
      <form className='home__form' onSubmit={handleSubmit}>
        <input className='home__input' id='name' type="text" />
        <button className='home__btn'>Start</button>
      </form>
    </div>
  )
}

export default Home
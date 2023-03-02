import React from 'react'
import './styles/header.css'
import imagePokedex from "../../../public/images/Pokedex.png"

const Header = () => {
  return (
    <div className='header'>
      <img className='header__img' src={imagePokedex} alt="" />
      <div className='header__black'>
        <div className='header__circle'>
        </div>
      </div>
    </div>
  )
}

export default Header
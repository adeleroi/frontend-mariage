import * as React from 'react'
import { Paragraph } from './typography'


export const Info = () => {
  const handleClick = (e) => {
    const parent = document.getElementById('popup')
    parent.classList.add('hidden')
  }
  return (
    <div id="popup" className="bottom-8 fixed bg-black rounded-lg font-Matter w-96 h-56 flex flex-col justify-center px-6 right-4 pt-5" style={{zIndex: "40000000"}}>
      <div className="absolute right-1 top-1 pr-2" aria-label="dismiss message"><p onClick={handleClick} className="text-gray hover:text-white text-2xl cursor-pointer">&times;</p></div>
      <Paragraph className="text-white text-left">
        <span role="img" aria-label="wave">&#128075;</span> &nbsp;Merci pour votre présence. Un montant de 25$ + taxes sera nécessaire pour l'accès au lieu du mariage.
        Vous berceriez dans un magnifique jardin tout en couleur
        et renoueriez avec la nature.
      </Paragraph>
      <div className="text-left my-3">
        <a href="https://seigneurieiledorleans.com/la-seigneurie/nos-jardins-et-visite-des-lieux/" target="_blank" rel="noopener noreferrer" className='text-white text-left underline'>Site web du jardin</a>
      </div>
    </div>
  )
}
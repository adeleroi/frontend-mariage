import * as React from 'react'
import Chalet from '../image/chalet.jpeg'
import { Paragraph } from '../components/typography'


export const Home = () => {
  return (
    <>
    <HeroSection />
    </>
  )
}

const HeroSection = () => {
  return (
    <section className="w-full px-6 xl:px-24 mt-36">
      <div className="relative w-full p-2 rounded-lg ring-4 ring-black">
        <img src={Chalet} alt="hero" width="100%" height="350px" className="rounded-lg"/>
      </div>
      {/* <div className="mt-16 w-full flex flex-col items-center xl:my-32">
          <p className="text-5xl xl:text-8xl text-center font-GreatVibes z-10 xl:mb-12">Ruth & <br /> Dimitri</p>
          <p className="mt-10 text-2xl xl:text-5xl text-center font-thin z-10">Venez célébrer et partager avec <br /> nous cette journée spéciale!</p>
      </div> */}
      <div className="mt-16 w-full flex flex-col items-center xl:my-32">
      <div className="w-full md:w-2/3 mb-24 text-center leading-loose font-Dancing rounded-lg ml-3 p-5 text-xl flex self-center">
                    <Paragraph className="text-vxl md:text-4xl md:leading-loose">
                        Nous sommes heureux de vous inviter le 9 octobre 2021 à notre mariage… <br/>

                        Les cérémonies  religieuse et civile ainsi que la réception, se dérouleront dans les jardins de la Seigneurie de l’île dorleans.<br/>

                        Vous pourrez profiter du cadre exceptionnellement beau de cet environnement naturel pour prendre des photos ou renouer avec Mère Nature, autour d'un cocktail et d'un repas que nous vous offrons.

                        <br/>
                        Mettez-vous sur votre 31, arborez un coeur rempli de joie : nous allons célébrer l’amour !!<br/>

                    </Paragraph>
                </div>
      </div>
    </section>
  )
}
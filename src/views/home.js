import * as React from 'react'
import Chalet from '../image/chalet.jpeg'

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
      <div className="relative w-full">
        <img src={Chalet} alt="hero" width="100%" height="350px" className="rounded-lg"/>
        {/* <div className="w-full" style={{backgroundColor:"black", height: "80vh", width: "80vw"}}></div> */}
        <div className="hidden lg:absolute bottom-24">
          <p className="text-8xl text-left pl-24 font-GreatVibes text-white z-10">Ruth & <br /> Dimitri</p>
          <p className="mt-10 text-5xl text-left pl-24 text-white font-thin z-10">Venez célébrer et partager avec <br /> nous cette journée spéciale!</p>
        </div>
      </div>
      <div className="mt-16 w-full flex flex-col items-center xl:my-32">
          <p className="text-5xl xl:text-8xl text-center font-GreatVibes z-10 xl:mb-12">Ruth & <br /> Dimitri</p>
          <p className="mt-10 text-2xl xl:text-5xl text-center font-thin z-10">Venez célébrer et partager avec <br /> nous cette journée spéciale!</p>
      </div>
      {/* <Cutdown /> */}
    </section>
  )
}
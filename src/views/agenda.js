import * as React from 'react'
import { useMap } from './save-the-date'
import Neige from '../image/neige.jpeg'
// import Coeur from '../image/coeur.jpeg'
// import Ville from '../image/ville.jpeg'
import { H1, H4 } from '../components/typography'
import { Cutdown, HorizontalCutdown } from '../components/cutdown'



export const Agenda = () => {
    const agendaMapRef = useMap()
    const event = [
        {
            from: '09h45',
            to: '10h20',
            type: 'Arrivée et installation des invites',
        },
        {
            from: '10h30',
            type: 'début de la célébration',
        },
        {
            from: '12h00',
            type: 'cocktail et photos',
        },
        {
            from: '14h00',
            type: 'réception',
        },
        {
            from: '17h00',
            type: 'départ des lieux',
        }
    ]
    return (
        <>
        <section className="px-5 lg:mx-24 max-w-8xl block">
            <div className="flex">
                <div className="w-full">
                    <H1 className="text-center lg:text-left text-xl mt-32 sm:mb-12 md:mb-12 text-secondary lg:mb-6">Déroulement de la cérémonie</H1>
                    <H1 className="w-full text-center lg:text-left mb-3 lg:w-7/12">Le samedi 9 octobre</H1>
                    <H4 className="text-gray w-full text-center lg:text-left">Au 3658 chemin royal saint-françois-de-l'île-d'orléans</H4>

                </div>
                <Cutdown vertical className="hidden 2xl:flex mr-0 self-end"/>
            </div>
            <div className="flex flex-col 2xl:flex-row 2xl:mt-32 mt-20">
                <div className="mr-12 w-full 2xl:w-4/5 mb-12 ">
                    <div  className="rounded-lg p-2 ring-4 ring-black" style={{position:"sticky",  top: "0px"}}>
                        <img src={Neige} className="h-full w-full rounded-lg focus-ring" alt="cheval"/>
                    </div>
                </div>
                <div>
                    <div className="flex justify-center flex-col  2xl:flex-col 2xl:items-center  w-full">
                        <Deroulement event={event}/>
                    </div>
                    <div className="flex justify-center rounded-lg mt-12 mb-20 p-2 2xl:hidden" style={{backgroundColor: 'whitesmoke'}}>
                        <Cutdown vertical className="sm:hidden mr-0 w-44 self-center p-2 my-24"/>
                        <HorizontalCutdown className="flex items-end justify-center hidden sm:flex mr-0 2xl:hidden self-center w-full p-2 my-24"/>
                    </div>
                    <div className="rounded-lg ring-4 ring-or p-2 my-12">
                        <div id="mapid" className="rounded-lg" ref={agendaMapRef} style={{height: "30vh"}}></div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export const Deroulement = ({event}) => {
    return (
        <div className="block px-6 flex flex-col items-center">
            <div className="text-left w-full mb-12">
                <span className=" text-2xl 2xl:text-lg">Samedi 9 Octobre 2021</span>
            </div>
            <div className="flex flex-col lg:flex-row justify-start items-center">
                <div className="">
                    {event.map(event => {
                        return <Event event={event} key={event.from}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export const Event = ({event}) => {
    let {from, to} = event;
    return (
        <div  className="flex mb-8">
            <div className="flex justify-start flex-col text-secondary lg:pr-24 pr-12 2xl:pr-12 leading-1 text-2xl font-thin">
                <p>{from}</p>
                {to && <small>-</small>}
                <p>{to ? to: ''}</p>
            </div>
            <div className="flex flex-col items-start text-left text-2xl 2xl:text-lg font-thin">
                <p className=" text-left">{event?.type}</p>
                <p className="mt-3 ">{event?.description}</p>
                <small className="text-gray hover:text-primary">
                3658 chemin royal saint-françois-de-l'île-d'orléans
                </small>
            </div>
        </div>
    )
}
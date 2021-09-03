import * as React from 'react'
import { useMap } from './save-the-date'
import Cavaliere from '../image/cavaliere.jpeg'
import { H1, H4 } from '../components/typography'
import { Cutdown } from '../components/cutdown'


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
                    <H1 className="text-center lg:text-left text-xl mt-32 sm:mb-12 md:mb-12 text-secondary mb-12">Déroulement de la cérémonie</H1>
                    <H1 className="w-full text-center lg:text-left mb-3 lg:w-7/12">le samedi 9 octobre</H1>
                    <H4 className="text-gray w-full text-center lg:text-left lg:w-4/12">au 3658 chemin royal saint-françois-de-l'île-d'orléans</H4>

                </div>
                <Cutdown vertical className="hidden 2xl:flex mr-0 self-end"/>
            </div>
            <div className="flex flex-col 2xl:flex-row 2xl:mt-32 mt-20">
                <div className="mr-12 w-full 2xl:w-4/5 mb-12 ">
                    <div  className="" style={{position:"sticky",  top: "0px"}}>
                        <img src={Cavaliere} className="h-full transform rotate-180" alt="cheval"/>
                    </div>
                </div>
                <div>
                    <div className="flex justify-center flex-col  2xl:flex-col 2xl:items-center  w-full">
                        <Deroulement event={event}/>
                        {/* <Form
                            defaultMsg="Soumettre"
                            processingMsg="Soumission en cours"
                        /> */}
                    </div>
                    {/* <Deroulement event={event}/> */}
                    <div id="mapid" className="my-12" ref={agendaMapRef} style={{height: "30vh"}}></div>
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
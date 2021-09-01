import * as React from 'react'
import clsx from 'clsx'
import { Form } from './save-the-date'
import Cavaliere from '../image/cavaliere.jpeg'
import { H1, H2 } from '../components/typography'

export const Agenda = () => {
    const event = [
        {
            from: '09h45',
            to: '10h20',
            type: 'Arrive et installation des invites',
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
        <section className="px-5 max-w-8xl block">
            <H2 className="text-left text-xl mt-32 sm:mb-12 md:mb-12 text-secondary mb-12">Deroulement de la ceremonie</H2>
            <div className="flex flex-col md:flex-row">
                <div className="mr-12 w-full md:w-3/5 mb-12">
                    <div>
                        <img src={Cavaliere} className="transform rotate-180 rounded-lg"/>
                    </div>
                </div>
                <div>
                    <Deroulement event={event}/>
                </div>
                <div>
                    {/* <Form/> */}
                </div>
            </div>
        </section>
        </>
    )
}

export const Deroulement = ({event}) => {
    return (
        <div className="block px-6">
            <div className="text-left mb-12">
                <span>Samedi 9 Octobre 2021</span>
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

export const Event = ({event} = event) => {
    let {from, to} = event;
    return (
        <div  className="flex mb-8">
            <div className="flex justify-start flex-col text-secondary pr-12 leading-1">
                <p>{from}</p>
                {to && <small>-</small>}
                <p>{to ? to: ''}</p>
            </div>
            <div className="flex flex-col items-start text-left">
                <p className=" text-left">{event?.type}</p>
                <p className="mt-3 ">{event?.description}</p>
                <small className="text-gray hover:text-primary">
                3658 chemin royal saint-françois-de-l'île-d'orléans
                </small>
            </div>
        </div>
    )
}
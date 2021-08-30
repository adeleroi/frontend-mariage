import * as React from 'react'
import clsx from 'clsx'


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
        <div className="flex w-full px-12" style={{height:'50vh'}}>
            <Deroulement event={event}/>
        </div>
        </>
    )
}


// Dimitri Pag-yendu
// Déroulement 


// 9h45-10h15 : arrivée et installation des invités 

// 10h30: début de la célébration 

// 12h00: cocktail et photos 

// 14h00: réception 

// 17h00: départ des lieux

export const Deroulement = ({event}) => {
    return (
        <div>
            <div className="text-left mb-12">
                <span>Samedi 9 Octobre 2021</span>
            </div>
            <div className="">
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
        <div  className="flex mb-12">
            <div className="flex justify-start flex-col text-secondary pr-32">
                <p>{from}</p>
                {to && <small>-</small>}
                <p>{to ? to: ''}</p>
            </div>
            <div className="flex flex-col items-start text-left">
                <p className=" text-left">{event?.type}</p>
                <p className="mt-3 ">{event?.description}</p>
                {/* <div className="mt-3 text-left font-thin">
                    <span className="text-secondary">Ajouter a votre calendrier</span>
                </div> */}
            </div>
        </div>
    )
}
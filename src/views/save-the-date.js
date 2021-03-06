import * as React from "react"
import { Button } from "../components/button";
import { Input } from "../components/input"
// import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import clsx from "clsx";
// import Slider from "react-slick";
// import Chute from '../image/chute-deau.jpeg'
// import Ombre from '../image/jardin-dombre.jpeg'
// import Zen from '../image/jardin-zen.png'
// import Pierre from '../image/Pont-de-pierre.png'
// import Japonais from '../image/pont-japonais.jpeg'
import * as L from 'leaflet'
import { H1, H4, Paragraph } from "../components/typography";
import { Cutdown, HorizontalCutdown } from "../components/cutdown";
import Perspective from "../image/perspective.jpeg"


const client = async (url, formValue, { token, bodyOptions } = {}) => {
    let data = await fetch(url, {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token && `Bearer ${token}`,
            "Access-Control-Allow-Origin": '*',
        },
        'body': JSON.stringify({
            email: formValue.email,
            username: formValue.username,
            message: formValue.message,
            ...bodyOptions
        }),
    })
    return data.json()
}


export default function SaveTheDate() {
    const [formValue, setFormValue] = React.useState({username: "", email: "", message: ""})
    const [processing, setProcessing] = React.useState(false)
    const [emailState, setEmailState] = React.useState('')
    // const leafletRef = useMap();

    const handleChange = (e) => {
        const form =  e.currentTarget
        setFormValue({ username: form.username.value, email: form.email.value, message: form.message.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        console.log('processing...')
        const [
            {sendToBride},
            {sendToGuest}
        ] = await Promise.all(
            [
                client('/send-email-to-bride', formValue),
                client('/send-email-to-guest', formValue),
            ]
        )
        if (sendToBride && sendToGuest) {
            setProcessing(false)
            setEmailState('send')
            const form = document.querySelector('form')
            form.reset()
        } else {
            setProcessing(false)
            setEmailState('error')
        }
    }

    return (
        <div className="px-5 lg:px-0 flex flex-col max-w-8xl block">
            <div className="flex">
                <div className="lg:mx-24 xl:mx-44 lg:mb-24 flex flex-col sm:items-center lg:items-start justify-start w-full">
                    <H1 className="text-center sm:text-left mt-32 sm:mb-3 md:mb-8 lg:mb-3 text-secondary">Confirmez votre pr??sence</H1>
                    <H1 className="text-center sm:text-left mt-5 mb-4">Remplissez le formulaire ci-bas.</H1>
                    <H4 className="text-gray w-full text-center lg:text-left ">Faites nous savoir si vous avez besoin d'accomodements (allergies)</H4>
                </div>
                <Cutdown vertical className="hidden 2xl:flex self-center mr-36"/>
            </div>
            <div className="w-full lg:mt-24 flex lg:items-start items-center lg:justify-between lg:flex-row  flex-col">
                <div className="my-24 lg:mt-0  lg:left-32 flex-col justify-start lg:w-80 lg:w-96 xl:ml-16" style={{zIndex: '1000'}}>
                    <div className="lg:ml-24" style={{borderRadius: '15px', padding:'10px 10px', width:'410px'}}>
                        <Form
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            processing={processing}
                            defaultMsg="Soumettre"
                            processingMsg="Soumission en cours..."
                            emailState={emailState}
                        />
                    </div>
                </div>
                <div className="flex justify-center rounded-lg mt-12 mb-20 py-12 2xl:hidden w-80 md:w-96 sm:w-2/3 mx-12 sm:mx-0 lg:hidden" style={{backgroundColor: 'whitesmoke'}}>
                    <Cutdown vertical className="lg:hidden mr-0 w-44 self-center p-2"/>
                </div>
                <div className="relative my-12 lg:mt-0 xl:mr-12 lg:mx-24 rounded-md w-80 md:w-96 sm:w-2/3 lg:w-2/5 h-4/5 xl:mr-36 xl:w-2/5">
                    <img alt="" className="w-full rounded-lg" src={Perspective} />
                </div>
            </div>
            <div className="hidden lg:flex justify-center rounded-lg mt-12 mb-20 py-12 lg:py-0 w-96 sm:w-2/3 mx-12 lg:w-4/5 self-center lg:mx-0 sm:mx-0" style={{backgroundColor: 'whitesmoke'}}>
                <HorizontalCutdown className="flex items-end justify-center hidden lg:flex mr-0 2xl:hidden self-center w-full p-2 my-24"/>
            </div>
            <div className="relative my-12 lg:mt-0 xl:mr-12 lg:mx-24rounded-md w-96 sm:w-2/3 lg:w-2/5 h-4/5 xl:mr-36 xl:w-2/5">
            </div>
        </div>
    )
}


export const Form = ({
    onChange,
    onSubmit,
    processing,
    children,
    forPaiment,
    className,
    defaultMsg=null,
    processingMsg=null,
    emailState,
}) => {

    return (
        <form className={className}
            onChange={onChange} onSubmit={onSubmit}>
            <fieldset>
                {
                   emailState === 'error' ? (
                    <div className="mb-2 lg:text-left flex items-center">
                        <i className="fa fa-times-circle absolute text-2xl text-red"></i>
                        <span className="ml-7 text-red">Une erreur est survenue veuillez re??ssayez.</span>
                    </div>
                    ): emailState === 'send' ?  (
                        <div className="mb-2 lg:text-left flex items-center">
                            <i className="fa fa-check-circle absolute text-2xl text-green"></i>
                            <span className="ml-7">Votre confirmation ?? bien ??t?? envoy??e.</span>
                        </div>
                    ): null
                }
            </fieldset>
            <fieldset className="mb-4">
                <Input className="w-80 md:w-96" required type="text" id="username" placeholder="Nom:"/>
            </fieldset>
            <fieldset className="mb-4">
                <Input className="w-80 md:w-96" required type="email" id="email" placeholder="Email:"/>
            </fieldset>
            <fieldset className="mb-4">
                <Input className="w-80 md:w-96" type="textarea" id="message" placeholder="Message:" />
            </fieldset>
            <fieldset className="hidden">
                <div className={clsx('h-12 bg-white rounded-lg text-xl w-96 border-secondary border-2 pb-2 pt-3 px-2 mb-4 outline-none', {
                    'hidden': !forPaiment
                })}>
                    { children }
                </div>
            </fieldset>
            <fieldset>
                <Button
                    className={clsx("rounded-md w-80 md:w-96 focus:outline-none focus:ring-4 focus:ring-yellow-800 focus:ring-opacity-50 disabled:opacity-50",
                    {
                        "bg-bg-purple-700": processing
                    })}
                    type="submit" variant="secondary" disabled={processing}
                    >
                        { !processing ? defaultMsg : processingMsg }
                </Button>
            </fieldset>
            <fieldset className="flex justify-center px-8 md:px-0">
                <Paragraph className='text-center md:text-left mt-3 font-bold'>NB: Les frais d'acc??s au site de la Seigneurie de l'??le d'Orl??ans sont de 25$ + taxes, payables directement ?? la caisse de la Seigneurie ?? votre arriv??e.</Paragraph>
            </fieldset>
        </form>
    )
}

export const useMap = () => {
    const leafletRef = React.useRef()
    React.useEffect(() => {
        var lat = 46.9608679;
        var long = -70.860946
        var mymap = L.map(leafletRef.current?.id).setView([lat, long], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYWRlbGVyb2kiLCJhIjoiY2tpZ2JqcjdjMHVxZzJycndnaGdvcjhmZSJ9.-HoOvFz1qf52csX3hWwQPA'//'your.mapbox.access.token'
        }).addTo(mymap);
    
        var marker = L.marker([lat, long]).addTo(mymap);
        marker.bindPopup("<p style='text-align: center'><b>3658 chemin royal <br/> saint-fran??ois-de-l'??le-d'orl??ans</br><p>").openPopup();
    }, [leafletRef])

    return leafletRef
}

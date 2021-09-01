import * as React from "react"
import { Button } from "../components/button";
import { Input } from "../components/input"
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import clsx from "clsx";
import Slider from "react-slick";
import Chute from '../image/chute-deau.jpeg'
import Ombre from '../image/jardin-dombre.jpeg'
import Zen from '../image/jardin-zen.png'
import Pierre from '../image/Pont-de-pierre.png'
import Japonais from '../image/pont-japonais.jpeg'
import * as L from 'leaflet'
import { H1, H2, H4 } from "../components/typography";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#C6930A",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883"
        },
        "::placeholder": {
          color: "#C6930A"
        }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
};

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const client = async (url, formValue, { token, bodyOptions } = {}) => {
    let data = await fetch(url, {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token && `Bearer ${token}`,
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

const OPTIONS = {
    token: process.env.REACT_APP_STRIPE_SECRET_KEY,
    bodyOptions: {
        paymentMethodType: 'card',
        currency: 'cad'
    }
}

const MapImage = () => ([Ombre, Pierre, Chute, Zen, Japonais])

export default function SaveTheDate() {
    const [formValue, setFormValue] = React.useState({username: "", email: "", message: ""})
    const [processing, setProcessing] = React.useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const leafletRef = useMap();

    const handleChange = (e) => {
        const form =  e.currentTarget
        setFormValue({ username: form.username.value, email: form.email.value, message: form.message.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)

        let data = await client('http://localhost:4242/create-payment-intent', formValue, OPTIONS).then(x => x)

        if (!stripe || !elements) {
            return
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret,
            {
                payment_method: {
                  card: elements.getElement(CardElement),
                  billing_details: {
                    name: formValue.username,
                    email: formValue.email,
                  },
                },
              }
        );
        console.log('paymentintent ', paymentIntent)
            
        if (stripeError) {
            console.log('[error]', stripeError);
            return
        } else {
            const [
                sendToBride,
                sendToGuest
            ] = await Promise.all(
                [
                    client('http://localhost:4242/send-email-to-bride', formValue),
                    client('http://localhost:4242/send-email-to-guest', formValue),
                ]
            )
            setProcessing(false)
            console.log(e, sendToGuest, sendToBride)
        }
    }

    return (
        <div className="px-5 lg:px-0 max-w-8xl block">
            <div className="lg:mx-24 xl:mx-44 lg:mb-24 flex flex-col sm:items-center lg:items-start justify-start w-full">
                <H1 className="text-center sm:text-left mt-32 sm:mb-3 md:mb-8 text-secondary">Confirmez votre presence</H1>
                <H2 className="text-center sm:text-left mt-5 mb-4">en remplissant le formulaire ci-bas.</H2>
                <H4 className="text-gray w-full text-center lg:text-left lg:w-4/12">Une contribution de 30$ est requise pour confirmer votre presence </H4>
            </div>
            <div className="w-full flex lg:items-start items-center xl:justify-between lg:flex-row  flex-col">
                <div className="flex lg:absolute xl:relative lg:left-32 flex-col justify-start lg:w-80 lg:w-96 my-32 xl:ml-12" style={{zIndex: '1000'}}>
                    { !processing ? 
                    <div className="lg:shadow-2xl xl:shadow-none bg-transparent lg:bg-white xl:bg-transparent" style={{borderRadius: '15px', padding:'10px 10px', width:'410px'}}>
                        <Form
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            processing={processing}
                            forPaiment
                            defaultMsg="Payez pour confirmer"
                            processingMsg="Paiement en cours"
                        >
                            <CardElement options={CARD_OPTIONS}/>
                        </Form>
                    </div>
                    :
                    <p>Votre confirmation a bien ete recu</p>}
                </div>
                <div className="relative xl:my-32 xl:mr-12 ring-4 lg:mx-24 ring-yellow-600 rounded-md w-full sm:w-2/3 h-4/5 lg:w-full xl:mr-36 xl:w-2/5">
                    <div className="m-2">
                        <div id="mapid w-1/2" ref={leafletRef} style={{height: '84vh'}}>
                        </div>
                        <div className="flex flex-col shadow-2xl">
                            <div className="carousel shadow-2xl" style={{
                                position: "absolute", height: '230px', width: "250px", bottom: '70px',
                                zIndex:'100000', borderRadius:'15px', right:"5%"}}>
                                <Slider {...settings}>
                                    {MapImage().map(img => {
                                        return(
                                            <div style={ {paddingBottom: "49px",
                                                borderBottomRightRadius: "15px",
                                                borderBottomLeftRadius: "15px",
                                                }}
                                                key={img.toString()}
                                            ><img src={img} className="rounded-lg h-60 w-64"/></div>    
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


const usePayment = async ({ clientInfo }) => {
    const [processing, setProcessing] = React.useState(false)
    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) return
    let data = await client('http://localhost:4242/create-payment-intent', clientInfo, OPTIONS).then(x => x)
    if (data) setProcessing(true)

    const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret,
        {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: clientInfo.username,
                email: clientInfo.email,
              },
            },
          }
    );

    if (stripeError) {
        return stripeError
    } else {
        const [
            sendToBride,
            sendToGuest
        ] = await Promise.all(
            [
                client('http://localhost:4242/send-email-to-bride', clientInfo),
                client('http://localhost:4242/send-email-to-guest', clientInfo),
            ]
        )
        setProcessing(false)
        console.log( sendToGuest, sendToBride)
        return { processing, sendToGuest, sendToBride }
    }
}

export const Form = ({
    onChange,
    onSubmit,
    processing,
    children,
    forPaiment,
    defaultMsg=null,
    processingMsg=null
}) => {

    return (
        <form
            onChange={onChange} onSubmit={onSubmit}>
            <fieldset className="mb-4">
                <Input className="w-96" required type="text" id="username" placeholder="Nom:"/>
            </fieldset>
            <fieldset className="mb-4">
                <Input className="w-96" required type="email" id="email" placeholder="Email:"/>
            </fieldset>
            <fieldset className="mb-4">
                <Input className="w-96" type="textarea" id="message" placeholder="Message:" />
            </fieldset>
            <fieldset>
                <div className={clsx('h-12 bg-white rounded-lg text-xl w-96 border-secondary border-2 pb-2 pt-3 px-2 mb-4 outline-none', {
                    'hidden': !forPaiment
                })}>
                    { children }
                </div>
            </fieldset>
            <fieldset className="flex justify-start">
                <Button
                    className={clsx("rounded-md w-96 focus:outline-none focus:ring-4 focus:ring-yellow-800 focus:ring-opacity-50 disabled:opacity-50",
                    {
                        "bg-bg-purple-700": processing
                    })}
                    type="submit" size="large" variant="secondary" disabled={processing}
                    size="extra"
                    >
                        { !processing ? defaultMsg : processingMsg }
                </Button>
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
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYWRlbGVyb2kiLCJhIjoiY2tpZ2JqcjdjMHVxZzJycndnaGdvcjhmZSJ9.-HoOvFz1qf52csX3hWwQPA'//'your.mapbox.access.token'
        }).addTo(mymap);
    
        var marker = L.marker([lat, long]).addTo(mymap);
        marker.bindPopup("<p style='text-align: center'><b>3658 chemin royal <br/> saint-françois-de-l'île-d'orléans</br><p>").openPopup();
    }, [leafletRef])

    return leafletRef
}

// export const Form = ({
//     onChange,
//     onSubmit,
//     children
// }) => {
//     return (
//         <form
//         onChange={(e) => {
//         const form =  e.currentTarget
//         setFormValue({ username: form.username.value, email: form.email.value, message: form.message.value })
//     }} onSubmit={(e) => handleSubmit(e)}>
//         <fieldset className="mb-4">
//             <Input className="w-96" required type="text" id="username" placeholder="Nom:"/>
//         </fieldset>
//         <fieldset className="mb-4">
//             <Input className="w-96" required type="email" id="email" placeholder="Email:"/>
//         </fieldset>
//         <fieldset className="mb-4">
//             <Input className="w-96" type="textarea" id="message" placeholder="Message:" />
//         </fieldset>
//         {/* <fieldset>
//             <div className='h-12 bg-white rounded-lg text-xl w-96 border-secondary border-2 pb-2 pt-3 px-2 mb-4 outline-none'>
//                 <CardElement options={CARD_OPTIONS}/>
//             </div>
//         </fieldset> */}
//         { children }
//         <fieldset className="flex justify-start">
//             <Button
//                 className={clsx("rounded-md w-96 lg:w-80 focus:outline-none focus:ring-4 focus:ring-yellow-800 focus:ring-opacity-50 disabled:opacity-50",
//                 {
//                     "bg-bg-purple-700": processing
//                 })}
//                 type="submit" size="large" variant="secondary" disabled={processing}
//                 size="extra"
//                 >
//                     { !processing ? "Payez pour confirmer" : "Paiment en cours..."}
//             </Button>
//         </fieldset>
//     </form>
//     )
// }

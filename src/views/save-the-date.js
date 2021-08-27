import * as React from "react"
import { Button } from "../components/button";
import { Input } from "../components/input"
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
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


const api = async (url, formValue) => {
    console.log('api there')
    let data = await fetch(url, {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
        },
        'body': JSON.stringify({
            paymentMethodType: 'card',
            currency: 'cad',
            email: formValue.email,
            username: formValue.username,
            message: formValue.message,
        }),
    })
    console.log(formValue)
    return data.json()
}


export default function SaveTheDate() {
    const [formValue, setFormValue] = React.useState({username: "", email: "", message: ""})
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = await api('http://localhost:4242/create-payment-intent', formValue).then(x => x)

        if (!stripe || !elements) {
            return
        }
        let res = elements.getElement(CardElement)
        console.log(elements.getElement(CardElement), data.clientSecret)

        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(data.clientSecret,
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
            
        if (stripeError) {
            console.log('[error]', stripeError);
            return
        } else {
            console.log('[PaymentIntent]', paymentIntent);

        }
    }

    return (
        <div className="w-full flex items-center justify-center lg:flex-row  flex-col">
            <div className="flex flex-col items-start w-80 my-32 xl:ml-12">
                <form onChange={(e) => {
                    const form =  e.currentTarget
                    setFormValue({ username: form.username.value, email: form.email.value, message: form.message.value })
                }} onSubmit={(e) => handleSubmit(e)}>
                    <fieldset className="mb-4">
                        <Input required type="text" id="username" placeholder="Name:"/>
                    </fieldset>
                    <fieldset className="mb-4">
                        <Input required type="email" id="email" className="h-12 rounded-lg text-xl w-80 border-secondary border-2 py-2 px-2 outline-none" placeholder="Email:"/>
                    </fieldset>
                    <fieldset className="mb-4">
                        <Input type="textarea" id="message" placeholder="Message:" />
                    </fieldset>
                    <fieldset>
                        <div className='h-12 rounded-lg text-xl w-80 border-secondary border-2 pb-2 pt-3 px-2 mb-4 outline-none'>
                            <CardElement options={CARD_OPTIONS}/>
                        </div>
                    </fieldset>
                    <fieldset className="flex w-full justify-end">
                        <Button type="submit" size="large" variant="secondary" disabled={!stripe}>Payez pour confirmer</Button>
                    </fieldset>
                </form>
            </div>
            <div className="w-96 flex flex-col mt-32 xl:my-32 xl:mr-12">
            {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer> */}
            </div>
        </div>
    )
}
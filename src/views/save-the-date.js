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

export default function SaveTheDate() {
    const [formValue, setFormValue] = React.useState({username: "", email: "", message: ""})
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.currentTarget.reset();
        console.log('form submitted', formValue)
        // fetch("/.netlify/functions/send-email", {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formValue)
        // }).then(response => {
        //     console.log('response ', response)
        //     const data = response
        //     if (data?.status === 200) {
        //         console.log('email sent')
        //     }
        // })
        if (!stripe || !elements) {
            return
        }

    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    }

    return (
        <div className="w-full flex items-center justify-center lg:flex-row  flex-col">
            <div className="flex flex-col items-start w-80 my-32 xl:ml-12">
                <form onChange={(e) => {
                    const form =  e.currentTarget
                    setFormValue({ username: form.name.value, email: form.email.value, message: form.message.value })
                }} onSubmit={(e) => handleSubmit(e)}>
                    <fieldset className="mb-4">
                        <Input required type="text" id="name" placeholder="Name:"/>
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
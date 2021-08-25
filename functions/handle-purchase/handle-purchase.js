const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const mail = require('@sendgrid/mail').setApiKey(process.env.SENDGRID_API_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET


const HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTION',
}

exports.handler = async ({ header, body }) => {
  let event
  try {
    event = await stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      endpointSecret,
    );
    
    if (event.type === 'payment_intent.succeeded') {
      console.log('event ', event)
      
      const msg = {
          to: ['wilfriednguess@gmail.com', 'pag.yendu@gmail.com'],
          from: 'ade.nguessan@outlook.fr',
          subject: "Test envoi email mariage",
          text: 'Accuse de reception',
          html: `
              <img src="" style="margin-bottom:5px"/>
              <br/>
              <h2 style="margin-bottom:12px; margin-top: 5px">Bonsoir ${username},<h2>
              <p style="margin-bottom:4px">Merci d'avoir confirme votre presence a la ceremonie de mariage de Ruth et Pakendam.<p>
          `,
        }
        
        await mail.send(msg)
      }
    return {
      headers: HEADER,
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: HEADER,
      error,
    }
  }
}

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_API_KEY)


const HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTION',
}

exports.handler = async ({ header, body }) => {
  
  const { paymentMethodType, currency } = JSON.parse(body);
  const params = {
    payment_method_types: [paymentMethodType],
    amount: 30 * 100,
    currency: currency,
  }
  
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    return {
      headers: HEADER,
      clientSecret: paymentIntent.client_secret,
      statusCode: 200,
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: HEADER,
      error,
    }
  }
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTION',
}

exports.handler = async ({ headers, body }) => {
  
  const { paymentMethodType, currency } = JSON.parse(body);
  const params = {
    payment_method_types: [paymentMethodType],
    amount: 30 * 100,
    currency: currency,
  }
  
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    console.log('paymentIntent', typeof paymentIntent.client_secret)
    return {
      clientSecret: paymentIntent,
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

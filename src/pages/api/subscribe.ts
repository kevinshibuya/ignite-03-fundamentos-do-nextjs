import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from '../../services/stripe';

async function Subscribe(request: NextApiRequest, response: NextApiResponse) {
  const session = await getSession({ req: request });

  const stripeCustomer = await stripe.customers.create({
    email: session.user.email,
    // metadata
  })

  if (request.method === 'POST') {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1KUIEYDgfDeh2bSaOjo0G9Xi', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}

export default Subscribe;
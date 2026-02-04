import Razorpay from 'razorpay';

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} else {
  console.warn('Razorpay keys not set — payments will be disabled. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in production environment.');
}

export default razorpay;
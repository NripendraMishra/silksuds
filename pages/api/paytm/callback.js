import { db } from '../../../lib/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { ORDERID, STATUS, TXNID, TXNAMOUNT, RESPCODE, RESPMSG } = req.body;

    // Update order status in Firebase
    if (STATUS === 'TXN_SUCCESS') {
      // Payment successful
      await updateDoc(doc(db, 'orders', ORDERID), {
        status: 'paid',
        paymentId: TXNID,
        paymentStatus: 'success',
        updatedAt: new Date().toISOString()
      });
      
      // Clear user cart
      // await setDoc(doc(db, 'user-carts', userId), { items: [] });
      
      res.redirect('/order-success?orderId=' + ORDERID);
    } else {
      // Payment failed
      await updateDoc(doc(db, 'orders', ORDERID), {
        status: 'failed',
        paymentStatus: 'failed',
        failureReason: RESPMSG,
        updatedAt: new Date().toISOString()
      });
      
      res.redirect('/order-failed?orderId=' + ORDERID);
    }
  } catch (error) {
    console.error('Callback error:', error);
    res.redirect('/order-failed');
  }
}
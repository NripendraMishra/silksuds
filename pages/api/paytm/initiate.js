import crypto from 'crypto';

const PaytmConfig = {
  MID: process.env.PAYTM_MID,
  WEBSITE: process.env.PAYTM_WEBSITE || 'WEBSTAGING',
  CHANNEL_ID: 'WEB',
  INDUSTRY_TYPE_ID: 'Retail',
  PAYTM_MERCHANT_KEY: process.env.PAYTM_MERCHANT_KEY,
  PAYTM_FINAL_URL: process.env.NODE_ENV === 'production' 
    ? 'https://secure.paytm.in/oltp-web/processTransaction' 
    : 'https://securegw-stage.paytm.in/oltp-web/processTransaction'
};

function generateChecksum(params, key) {
  const data = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  
  const cipher = crypto.createCipher('aes-128-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const hash = crypto.createHash('sha256').update(encrypted).digest('base64');
  return hash;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      ORDER_ID,
      CUST_ID,
      TXN_AMOUNT,
      EMAIL,
      MOBILE_NO,
      CALLBACK_URL,
      orderRef
    } = req.body;

    const paytmParams = {
      MID: PaytmConfig.MID,
      WEBSITE: PaytmConfig.WEBSITE,
      CHANNEL_ID: PaytmConfig.CHANNEL_ID,
      INDUSTRY_TYPE_ID: PaytmConfig.INDUSTRY_TYPE_ID,
      ORDER_ID,
      CUST_ID,
      TXN_AMOUNT,
      CALLBACK_URL,
      EMAIL,
      MOBILE_NO
    };

    const checksum = generateChecksum(paytmParams, PaytmConfig.PAYTM_MERCHANT_KEY);
    paytmParams.CHECKSUMHASH = checksum;

    res.status(200).json({
      success: true,
      params: paytmParams,
      paytmURL: PaytmConfig.PAYTM_FINAL_URL
    });
  } catch (error) {
    console.error('Paytm initiation error:', error);
    res.status(500).json({ success: false, message: 'Payment initiation failed' });
  }
}
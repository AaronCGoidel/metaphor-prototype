import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('searching')
      console.log(process.env.METAPHOR_API_KEY)
      const response = await axios.post(
        'https://api.metaphor.systems/search',
        req.body,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.METAPHOR_API_KEY
          }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json(error.response?.data || {});
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

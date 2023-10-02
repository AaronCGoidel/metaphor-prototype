import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        'https://api.metaphor.systems/contents',
        {
          params: req.query,
          headers: {
            Accept: 'application/json',
            'X-API-KEY': process.env.NEXT_PUBLIC_METAPHOR_API_KEY
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
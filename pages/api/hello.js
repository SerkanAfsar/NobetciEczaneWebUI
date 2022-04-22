// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  axios.get("https//www.ankatasimacilik.com").then(resp => {
    return resp;
  }).catch(err => {
    console.log(err);
  })
}

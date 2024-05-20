//create a express server with cors
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const axios = require('axios');
const FormData = require('form-data');


app.get('/api/languages', async(req, res) => {
    const options = {
        method: 'GET',
        url: 'https://text-translator2.p.rapidapi.com/getLanguages',
        headers: {
          'x-rapidapi-key': '3a5ba5324cmshb6d4bcc34096054p13b5c9jsn062556f716e7',
          'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          res.json(response.data);
      } catch (error) {
          console.error(error);
      }
}
)

app.post('/api/translate', async(req, res) => {

    const {source, target, text} = req.body;
    if (!source || !target || !text) {
      res.status(400).json({error: 'source, target and text are required fields'});
      return;
  }
    const data = new FormData();
    data.append('source_language', source);
    data.append('target_language', target);
    data.append('text', text);
    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'x-rapidapi-key': '3a5ba5324cmshb6d4bcc34096054p13b5c9jsn062556f716e7',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
        ...data.getHeaders(),
      },
      data: data
    };
    
    try {
        const response = await axios.request(options);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
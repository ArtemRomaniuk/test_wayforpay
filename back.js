// Встанови перед запуском: npm install express body-parser crypto
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

const publicKey = 'sandbox_i54302443569'; // твій тестовий public_key
const privateKey = 'sandbox_CFt2SHAf9WgJu7f4Hejaus2QBOgNQw9W2e2y6fpw'; // твій private_key

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/create-payment', (req, res) => {
    const order = {
        public_key: publicKey,
        version: '3',
        action: 'pay',
        amount: '1',
        currency: 'UAH',
        description: 'Тестова оплата',
        order_id: 'test-' + Date.now(),
        language: 'uk',
        result_url: 'https://example.com/success'
    };

    const data = Buffer.from(JSON.stringify(order)).toString('base64');
    const signature = crypto
        .createHash('sha1')
        .update(privateKey + data + privateKey)
        .digest('base64');

    res.json({ data, signature });
});

app.listen(3000, () => console.log('Сервер на http://localhost:3000'));

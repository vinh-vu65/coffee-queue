import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser'
import { RGPTransaction, Deserialise, IsHotDrink, DrinkOrder } from './parsingService';

const app = express();
let port = process.env.PORT || 8999;

let drinksQueue: Array<DrinkOrder> = []

app.use(bodyParser.json());

//initialize a simple http server
const server = http.createServer(app);

app.post('/hook', (req, res) => {
    console.log(`Log: ${JSON.stringify(req.body)}`)
    let transaction: RGPTransaction = Deserialise(JSON.stringify(req.body));
    if (IsHotDrink(transaction)) {
        let drinkOrder = transaction.toDrinkOrder();
        drinksQueue.push(drinkOrder)
    }
    
    console.log(`Current Queue: ${drinksQueue.map(drink => drink.toString())}`)
    
    res.status(200).send(`Order received: ${JSON.stringify(req.body)}`)
});

//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});

export default app

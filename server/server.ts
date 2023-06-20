import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser'
import { RGPTransaction, Deserialise, IsHotDrink, DrinkOrder } from './parsingService';
import { Server } from 'socket.io';


const app = express();
app.use(bodyParser.json());

let port = process.env.PORT || 8999;

interface ServerToClientEvents {
    noArg: () => void;
    sendDrinks: (a: Array<DrinkOrder>) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}
  
interface ClientToServerEvents {
  removeDrink: (drinkQueue: Array<DrinkOrder>) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const server = http.createServer(app);
const io = new Server<ClientToServerEvents,ServerToClientEvents,InterServerEvents,SocketData>(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
})

let drinksQueue: Array<DrinkOrder> = []
app.post('/hook', (req, res) => {
    console.log(`Log: ${JSON.stringify(req.body)}`)
    let transaction: RGPTransaction = Deserialise(JSON.stringify(req.body));
    if (IsHotDrink(transaction)) {
        let drinkOrder = transaction.toDrinkOrder();
        drinksQueue.push(drinkOrder)
    }
    
    console.log(`Current Queue: ${drinksQueue.map(drink => drink.toString())}`)
    
    io.emit("sendDrinks", drinksQueue)
    
    res.status(200).send(`Order received: ${JSON.stringify(req.body)}`)
});

io.on('connection', socket => {
    socket.on('removeDrink', updatedDrinkQueue => {
        drinksQueue = [...updatedDrinkQueue]
    })
})


//start our server
server.listen(port, () => {
    console.log(`Server started on port ${port} :)`);
});

export default app

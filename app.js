import express from 'express'
import path from 'path'
// import {fileURLToPath} from 'url'
// import {dirname} from 'path'
import https from 'https'
import fs from 'fs'
import {router as adminPagesRouter} from './routes/adminPagesRoutes.js'
import {router as apiRouter} from './routes/apiRoutes.js'
import cors from "cors";
import { Server as SocketIOServer } from 'socket.io';
import {PROFILES_DATA} from './middleware/dataIO.js'
import {sortArrayOfEntriesByDate} from "./middleware/newsSotr.js";
import {newsLayout} from "./middleware/newsLayout.js";


const options = {
    key: fs.readFileSync('./key/example.key'),
    cert: fs.readFileSync('./cert/example.csr')
}
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
const httpsPort = process.env.PROT ?? 3000;
const httpPort = process.env.PROT ?? 80;
const appHttps = https.createServer(options, app)
const io = new SocketIOServer(appHttps, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
    },
});
const redirectToHttps = (req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect(`https://${req.hostname}:${httpsPort}${req.url}`);
    }
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const sockets = {};

io.on('connection', (socket) => {
    console.log('Пользователь подключен');

    socket.on('join', (userId) => {
        console.log(`Пользователь ${userId} присоединился`);
        socket.join(userId);
        sockets[userId] = socket;
    });

    socket.on('addNews', (newsData, userId) => {        PROFILES_DATA[userId] = {...PROFILES_DATA[userId], ...newsData}
        fs.writeFileSync('profiles.json', JSON.stringify(PROFILES_DATA, null, 2));
        for (let id of PROFILES_DATA[userId].friends) {
            sockets[id].emit('newsAdded', newsLayout(id));
        }
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключен');
    });
});

app.use(cors({
    origin: 'http://localhost:4200',
}));

// app.use(redirectToHttps);
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(path.resolve("D:\\IDE\\WebStorm 2023.2.1\\projects\\MeetHub", 'gulp')))
app.use('/', adminPagesRouter);
app.use('/', apiRouter);

const server = appHttps.listen(httpsPort, ()=>{
})

app.listen(httpPort, () => {})

export {server}
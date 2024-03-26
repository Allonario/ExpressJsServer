import express from "express";
import {PROFILES_DATA, upload, LOGIN_DATA, copyDirectory} from '../middleware/dataIO.js'
import fs from "fs";
import {generatorId} from "../middleware/idGenerator.js";
import {newProfile} from "../middleware/NewProfile.js"
import {sortArrayOfEntriesByDate} from "../middleware/newsSotr.js";
import {newsLayout} from "../middleware/newsLayout.js";

const router = express.Router();


router.put('/api/profile_list/image/:id', upload.single('image'), (req, res) => {
    PROFILES_DATA[req.params.id].photo = `/img/${req.params.id}_image.png`;
    copyDirectory('D:\\IDE\\WebStorm 2023.2.1\\projects\\MeetHubClient\\client\\src\\assets\\img',
        "D:\\IDE\\WebStorm 2023.2.1\\projects\\MeetHub\\gulp\\img")
    fs.writeFileSync('profiles.json', JSON.stringify(PROFILES_DATA, null, 2));
    res.status(201).json({messege:'Изображение загружено и скопировано.'});
});

router.get('/api/profile_list', (req, res) => {
    res.json(PROFILES_DATA)
})

router.get('/api/profile/:id', (req, res) => {
    res.json(PROFILES_DATA[req.params.id])
})

router.put('/api/profile/:id', (req, res) => {
    PROFILES_DATA[req.params.id] = {...PROFILES_DATA[req.params.id], ...req.body}
    fs.writeFileSync('profiles.json', JSON.stringify(PROFILES_DATA, null, 2));
    res.status(201).json({message: 'Profile was edited'})
})

router.get('/api/profile/:id/news', (req, res) => {
    const id = req.params.id
    res.json({newsList: newsLayout(id)})
})

router.post('/api/login', (req, res) => {
    const loginData = req.body;
    if (loginData.username in LOGIN_DATA && loginData.password === LOGIN_DATA[loginData.username].password) {
        res.status(200).json({
            message: 'Login successful',
            id: LOGIN_DATA[loginData.username].id
        });
    } else {
        res.status(401).json({
            message: 'Invalid login credentials',
            profiles: LOGIN_DATA
        });
    }
});

router.put('/api/registration', (req, res) => {
    const registrationData = req.body;
    if (registrationData.username in LOGIN_DATA) {
        res.status(401).json({
            message: 'Данная почта уже используется'
        });
    } else {
        const newId = generatorId();
        const dateParts = registrationData.date.split('-');
        const date = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
        PROFILES_DATA[newId] = {
            ...newProfile,
            name: registrationData.name,
            email: registrationData.username,
            birthDate: date
        }
        LOGIN_DATA[registrationData.username] = {
            password: registrationData.password,
            id: newId
        }
        fs.writeFileSync('profiles.json', JSON.stringify(PROFILES_DATA, null, 2))
        fs.writeFileSync('loginInfo.json', JSON.stringify(LOGIN_DATA, null, 2))
        res.status(201).json({
            message: 'Аккаунт создан успешно',
            id: newId
        });
    }
    res.json()
});

export {router}
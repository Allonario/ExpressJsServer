import express from "express";
import {PROFILES_DATA} from '../middleware/dataIO.js'


const router = express.Router();


router.get('/admin/profile/:id/friends', (req, res) => {
    const id = req.params.id
    const friendsList = {}
    for(let key of PROFILES_DATA[id].friends){
        friendsList[key] = PROFILES_DATA[key]
    }
    res.render('friends.ejs', {
        friendsList: friendsList,
        id: id
    })
})

router.get('/admin/profile/:id/news', (req, res) => {
    res.render('news.ejs', {
        id: req.params.id
    })
})

router.get('/admin/profile/:id', (req, res) => {
    const id = req.params.id
    res.render('profile.ejs', {
        id: id,
        name: PROFILES_DATA[id].name,
        email: PROFILES_DATA[id].email,
        birthDate: PROFILES_DATA[id].birthDate,
        photo: PROFILES_DATA[id].photo
    })
})

router.get('/admin', (req, res) => {
    res.render('index.ejs')
})


export {router};
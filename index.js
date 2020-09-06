const express = require('express')
const app = express()
const port = 5000
const { User } = require("./models/User")

//Html body를 Parsing한다
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config/key')

//application/x-www-form-urlencoded 분석하기 위함
app.use(bodyParser.urlencoded({extended: true}))

//application/json 분석하기위함
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false
}).then(() => console.log('MongoDb Connected..')).catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req,res) => {

    //회원가입할때 필요한 정보들을 Client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다. 

    const user = new User(req.body)
    //save : 몽고DB 함수
    user.save((err,userInfo)=> {
       //Mongo Db에 저장 후 Json 형식으로 Client에 응답
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
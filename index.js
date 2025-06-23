const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path);
    next()
})

app.get('/users', (req, res) => {
    const { name } = req.query
    console.log({name})

    
    const data = fs.readFileSync('users.json').toString()
    const json = JSON.parse(data)
    
    const filteredData = [];

    for (let i = 0; i < json.length; i++) {
        if (json[i].name === name) {
            filteredData.push(json[i])
        }
    }

    console.log(filteredData)
    
    // if (name === 'John') {
    //     res.send('John name is not accepted');
    //     return;
    // }

    if (filteredData.length === 0) {
        res.send(json)
    }else{

        res.send(filteredData)
    }

})

app.post('/users', (req, res, next) => {
    const user = req.body;

    if (user.name === 'John') {
        res.send('John name is not accepted');
        return;
    }
    
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', '['+JSON.stringify(req.body)+']')
    }


    const data = fs.readFileSync('users.json').toString()
    const json = JSON.parse(data)
    json.push(req.body)

    fs.writeFileSync('users.json', JSON.stringify(json))

    res.send('User added.')
})

app.listen(3000, () => {
    console.log("app running at localhost:3000")
})


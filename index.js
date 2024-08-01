const express = require('express')
const sequelize = require("./config/database")
const userRoutes = require("./routes/user")

const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    "origin": "*",
}))

app.get("/", (req, res) => {
    console.log("Tá funcionando")
})

sequelize
    .sync()
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error.message);
    });

app.use("/users/", userRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

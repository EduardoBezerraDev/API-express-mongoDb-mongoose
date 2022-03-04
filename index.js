//config inicial
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const personRoutes = require("./routes/personRoutes")

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
//ROUTES
app.use("/person", personRoutes)

mongoose
    .connect('')
    .then(() => {
        app.listen(3001)
    })
    .catch((error) => {
        console.log(error)
    })

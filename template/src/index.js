// load env
require("dotenv").config()

const { RBS } = require("@releai/rb-node-sdk")
const handlers = require("./handlers")

// initiate RELE.AI's server
const rbs = new RBS({
    appId: process.env.APP_ID,
    appHash: process.env.APP_HASH
})

// register handlers
rbs.use(handlers)

// start the server
const port = process.env.PORT || 9090
rbs.listen(port)

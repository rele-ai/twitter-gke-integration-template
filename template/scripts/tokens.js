const fs = require('fs')
const TokensCommand = require('@releai/cli/src/commands/app/tokens')
const path = require('path')
const pkgDir = require("pkg-dir")
const os = require("os")
const dir = pkgDir.sync(process.cwd())
const credsPath = path.join(os.homedir(), ".rb/creds.json")
const envPath = path.join(dir, ".env")

/**
 *  Writing the tokens into .env file .
 * .env needs to be located in the root folder
 * @param {object} hashes
 */
const writeTokens = (hashes) => {
    try {
        const decelerations = {
            "id": "APP_ID",
            "appHash": "APP_HASH"
        }
        const content = Object.entries(decelerations).map(([key, value])=>{
            return `\n${value}=${hashes[key]}`
        })
        fs.writeFileSync(envPath, content.join(), { flag: 'a+' })
    } catch (err) {
        throw new Error("Error when writing to .env file")
    }
}

/**
 * Read the refresh_token from ~/.rb dir
 * @returns {string} refresh_token
 */
const readRefreshToken = () => {
    try {
        const { refresh_token } = JSON.parse(fs.readFileSync(credsPath, 'utf8'))
        return refresh_token
    } catch (err) {
        throw new Error(`Error when trying to read from ${credsPath}`)
    }
}

/**
 * Assigning required flags for the the tokens command execution
 * @param {class} command tokens command class
 * @param {string} token a refresh token
 */
const assignFlags = (command, token) => {
    command.flags = { token }
    command._pkgLocation = dir
}

/**
 * Append required tokens into .env file
 */
const appendTokens = async () => {
    try {
        if (fs.existsSync(credsPath)) {
            const command = new TokensCommand()
            // Read the refresh token from ~/.rb dir
            const refresh_token = readRefreshToken()
            //assign required flags for the command execution
            assignFlags(command, refresh_token)
            // Run the tokens command. result will include the required tokens
            const result = await command.run()
            // writing the hashes into .env file.
            writeTokens(result.pop())
        } else {
            console.log("Login is missing, Please authenticate.")
        }
    } catch (err) {
        throw err
    }
}

appendTokens()








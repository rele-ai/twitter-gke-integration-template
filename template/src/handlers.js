const { RBS } = require("@releai/rb-node-sdk")
const { TwitterClient } = require("twitter-api-client")
const logger = require("@releai/rb-node-sdk/src/utils/logger")

// create new router instance
const router = new RBS.Router()

/**
 * Publish a tweet to twitter using the provided
 * API KEY.
 *
 * @param {Request} req - RB's request object.
 * @param {Response} res - RB's response object.
 */
router.use("publish_tweet", async (req, res) => {
    // debug incoming request payload
    logger.debug({
        message: "recieved request to publish_tweet endpoing",
        payload: req.payload
    })

    try {
        // initiate the twitter client
        const tc = new TwitterClient({
            apiKey: process.env.TWITTER_CONSUMER_KEY,
            apiSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        })

        // tweet message
        const response = await tc.tweets.statusesUpdate({ status: req.payload.tweet_content })

        // notify rele.ai that the tweet is published
        response.id
            ? res.send(200, { published: true })
            : res.send(200, { published: false })
    } catch (err) {
        logger.error({
            message: "unable to publish tweet",
            error: err
        })

        // notify rele.ai that the tweet hasn't been published
        res.send(200, { published: false })
    }
})

// export default router
module.exports = router

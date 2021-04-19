// export template meta information
module.exports = {
    prompts: {
        GOOGLE_PROJECT_ID: {
            type: "string",
            required: true,
            label: "Google Project ID"
        },
        GOOGLE_APPLICATION_CREDENTIALS: {
            type: "string",
            required: true,
            label: "Google Service Account Path (absolute path)"
        },
        TWITTER_CONSUMER_KEY: {
            type: "string",
            required: true,
            label: "Twitter Consumer Key",
        },
        TWITTER_CONSUMER_SECRET: {
            type: "string",
            required: true,
            label: "Twitter Consumer Secret",
        },
        TWITTER_ACCESS_TOKEN_KEY: {
            type: "string",
            required: true,
            label: "Twitter Access Token",
        },
        TWITTER_ACCESS_TOKEN_SECRET: {
            type: "string",
            required: true,
            label: "Twitter Access Token Secret",
        },
        NGROK_TOKEN: {
            type: "string",
            required: true,
            label: "NGROK Authtoken",
        },
    },
    completeMessage: "{{#inPlace}}To get started:\n\n  npm install\n  rb app:tokens | grep 'APP_' | sed 's/: /=/g' >> .env\n  npm run dev OR rb deploy:[user/org]{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  rb app:tokens | grep 'APP_' | sed 's/: /=/g' >> .env\n  npm run dev OR rb deploy:[user/org]{{/inPlace}}"
}

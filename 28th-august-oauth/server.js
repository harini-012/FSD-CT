const express = require("express");

const app = express();

const CLIENT_ID = "Ov23liBgy9ovWrL4Gztl";
const CLIENT_SECRET = "35fe176116a19e94a16711eda32eb21b6f9231d7";

app.get("/", (req, res) => {

    res.send(`
        <h2>GitHub OAuth Demo</h2>
        <a href="/login">
            <button>Login with GitHub</button>
        </a>
    `);

});

app.get("/login", (req, res) => {

    const url =
        "https://github.com/login/oauth/authorize" +
        "?client_id=" + CLIENT_ID +
        "&scope=user";

    res.redirect(url);

});

app.get("/callback", async (req, res) => {

    const code = req.query.code;

    const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",

            headers: {
                "Accept": "application/json"
            },

            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code
            })
        }
    );

    const data = await response.json();

    res.send(`
        <h2>OAuth Successful!</h2>
        <p>Access Token received.</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `);

});

app.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});


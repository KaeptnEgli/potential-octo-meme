

Best if you read the Readme here: https://github.com/KaeptnEgli/potential-octo-meme

# Preface:

I have renamed the README from the first hand in. I changed it to README_old.md.

## Server and API

<p>I am aware that the task description provides a api you could use. The game evaluation from that api did not really serve my needs.
The api on stone.dev.ifs.hsr.ch provided those fields:</p>

```javascript
{"choice":"Papier","win":false}
```
<p>What I need instead were those:<p>

```javascript
{"playerHand": 2, "systemHand": 3, "gameEval": -1}
```

<p>So I decided to write my own api that serves the fields I need. 😅</p>

## Open Points From Code Review.
<p>First, thanks for good the reviews! Unfortunately I had a lot of assessments this and last week, so I kind of ran out of time a bit.
Due to that, I could not address all of the points you have mentioned. For example:</p>

<ul>
    <li>Page reload and the resulting bugs. local-storage.js:26</li>
    <li>My very well written sort function. start-page.dom.js:90</li>
</ul>

<p>I will definitely fix them for the final assessment!</p>

___

# Server
## Server Installation

<p>Make sure that you have the json-server module installed. You can install the module very easily with npm:<p>

```bash
npm install -g json-server
```

## Start the Server

To make the api fully working you have to run two commands. One for the json-server and on for the node-server that evaluates the game.

1. ```bash json-server --watch ./scripts/server/data.json```

2. ```bash nodejs ./scripts/server/data.json```

<mark>You have to temporarily disable CORS policy in your browser. Otherwise all request with source localhost will be blocked and the api does not word!</mark>
___


# Clean Code

## npm run all

<p>The command `npm run all` produces five warnings now, see ./npm_run_all_2.png.</p>

* The while loop:
<p>I have to use a while loop because the input parameter is constantly changing. Elements are getting removed with the splice() function.
This would brake the iterator within a for or for each loop. Please also read the doc about the corresponding function sortPlayers() below.</p>

* The if - else if:
<p>The eslinter recommends to use an action map instead of an if - else if structure. Yes, for some obvious reason this is not possible here.
</p>
<p>Change my Mind. 😄☕</p>

* The no-console:
<p>Yes, that is the console log from the server which indicated that the server is up and running. What should I say...</p>

___

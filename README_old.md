

Best if you read the Readme here: https://github.com/KaeptnEgli/potential-octo-meme

# Installation:
<p>I used an Nginx (Version 1.18.0) web server to run the Page. I recommend you to also run the project with Nginx or Apache web server.
Otherwise you might get some problems with CORS policy and the page won't work.</p>

<p>If you are not familiar with web servers consider one the following links:</p>

**Ubuntu Nginx:**
[Install And Configure Nginx](https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview)

**Ubuntu Apache:**
[Install And Configure Apache](https://ubuntu.com/tutorials/install-and-configure-apache#1-overview)

**Windows XAMPP:**
[XAMPP For Windows](https://www.apachefriends.org/de/index.html)

<p>If you have any problems with your web server configuration or if there is something wrong with the project, please don't hesitate to contact me.</p>

___


# Clean Code

## npm run all

<p>The command `npm run all` produces three warnings, see ./npm_run_all.png.</p>

* The while loop:
<p>I have to use a while loop because the input parameter is constantly changing. Elements are getting removed with the splice() function.
This would brake the iterator within a for or for each loop. Please also read the doc about the corresponding function sortPlayers() below.</p>

* The if - else if:
<p>The eslinter recommends to use an action map instead of an if - else if structure. Yes, for some obvious reason this is not possible here.
</p>
<p>Change my Mind. 😄☕</p>

## local-storage.js
<p>I made my comments about clean code in that file in the section below.</p>

___


# Code Documentation

## local-storage.js

<p>This file handles all the interactions with the persistent storage, in this case localStorage. It is the most complex part of my web1 assessment.
So that you don't have to hard times figuring out what my code does during the peer review, I give you a brief explanation.</p>

**It does four things:**

1. initialize LocalStorage. <br>
2. convert LocalStorage into an Array and <br>
3. Sort the Array. <br>
4. add new Values to the local Storage. <br>

<p>This functionallity is implemented in five functions. All the functions are listed below with a short doc:</p>

### initializeLocalStorage()

<p>Sets the default values you will see in the ranking on the main page. It only sets the values if the localStorage is empty, thus the localStorage won't be reinitialized by every page reload.</p>

### convertLocalStorageToArray()

<p>Converts the JSON data stored in the localStorage into an Javascript array.</p>

### sortPlayers()

<p>I know the code in this function is a bit complex and seems clumsy too. I also aware of that it is possible to write it cleaner with Javascript array functions. I actually tried to rewrite the function with array functions. Unfortunately, I couldn't figure it out anymore on Sunday evening and i just ran out of time. The good thing is.. It works anyway! :D</p>

<p>I will make to code neater and cleaner for the next hand in of the assessment. But for now my dear peer reviewer: you have to deal with my code. As already mentioned I document it to make your life a bit more ease.</p>

<p>The purpose of this function is to create an array that is sorted after the ranking of each individual player.
The array contains objects with three field: rank, wins, players. Players with the same amount of wins appear in the same object.
Below you can see a little example of that:</p>

**convertLocalStorageToArray() creates this:**

```javascript
[
    {
        user: "Markus",
        win: 3,
        lost: 6,
    },
    {
        user: "Michael",
        win: 4,
        lost: 5,
    },
    {
        user: "Lisa",
        win: 4,
        lost: 5,
    },
];
```

**sortPlayers() converts the array above to this:**

```javascript
[
    {
        rank: 1,
        wins: 4,
        players: ["Michael", "Lisa"],
    },
    {
        rank: 2,
        wins: 3,
        players: ["Markus"],
    },
];
```

### addScoreToUser()

<p>Simply adds a loss or a win to the corresponding user in localStorage. Gets called by addResultToLocalStorage(), see below.</p>

### addResultToLocalStorage()

<p>Determines if a player already exists in localStorage or not.
If the user already exists it just calls addScoreToUser().
If the player does not yet exists in LocalStorage it adds a new field with the users name an then calls addScoreToUser().</p>

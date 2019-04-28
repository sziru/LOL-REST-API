# League Of Legends Champions API

## Introduction

This was created during my time as a student at Code Chrysalis. My graphic card was broken. So I couldn’t play LOL (League of Legends) and I joined coding bootcamp. I didn’t have enough time to play the game. I missed all the champions. Creating LOL REST api to get the champions’ information is the way to see them. This is why I choose the data.

This api provides simple information about LOL champions. I used data from https://github.com/ngryman/lol-champions to build api server. This api supports HTTP GET, POST, PATCH, DELETE. Please be careful manipulate the data. the data is stored in firebase. I'm newb using firebase and I failed to deploy my server🔥🔥🔥. Please wait until completing the deploy. Now the api provides champions basic information **ONLY**

## Resource Lists and Pagination

Calling champions endpoint with **start** and **offset** you can get a paginated list of available resources. Without start and offset, it returns all champions’ information.

**start** is the beginning index of the list.
**offset** is the number of the champions.

### GET /api/v1/champions/?start=20&offset=20

## Champions

### GET /api/v1/champions/

Get all the champions' information.

```
{
    id:"aatrox",
    key:266,
    name: "Aatrox",
    title: "the Darkin Blade",
    tags: ["Fighter", "Tank"],
    stats: {
        hp: 580,
        hpperlevel: 85,
        mp: 100,
        mpperlevel: 0,
        movespeed: 345,
        armor: 33,
        armorperlevel: 3.8,
        spellblock: 32.1,
        spellblockperlevel: 1.25,
        attackrange: 150,
        hpregen: 6.5,
        hpregenperlevel: 0.5,
        mpregen: 0,
        mpregenperlevel: 0,
        crit: 0,
        critperlevel: 0,
        attackdamage: 70,
        attackdamageperlevel: 3.2,
        attackspeedoffset: -0.04,
        attackspeedperlevel: 3
    },
    icon: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Aatrox.png",
    sprite: {
        url: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
        x: 0,
        y: 0
    },
    description: "One of the ancient darkin, Aatrox was once a peerless swordmaster who reveled in the bloody chaos of the battlefield. Trapped within his own blade by the magic of his foes, he waited out the millennia for a suitable host to wield him—this mortal warrior..."
}
...
```

### GET /api/v1/champions/:nameOrKey

Get a champion's information with name or key.

```
//call by name
/api/v1/champions/aatrox

//call by key
/api/v1/champions/266
```

### GET /api/v1/champions/types/:type

Get some champions' information having target type. Types are saved in tags. The options are fighter, Support, Tank, Mage Marksman and Assassin.

```
/api/v1/champions/types/fighter
```

### POST /api/v1/champions

When adding a new champion to the database, create POST reqest to the endpoint with new champion information.
```
{
    id:"newchampion",
    key:999,
    name: "New Champion",
    title: "Brand NEW~~",
    tags: ["Fighter", "Tank"],
    stats: {
        hp: 580,
        hpperlevel: 85,
        mp: 100,
        mpperlevel: 0,
        movespeed: 345,
        armor: 33,
        armorperlevel: 3.8,
        spellblock: 32.1,
        spellblockperlevel: 1.25,
        attackrange: 150,
        hpregen: 6.5,
        hpregenperlevel: 0.5,
        mpregen: 0,
        mpregenperlevel: 0,
        crit: 0,
        critperlevel: 0,
        attackdamage: 70,
        attackdamageperlevel: 3.2,
        attackspeedoffset: -0.04,
        attackspeedperlevel: 3
    },
    icon: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/newchampion.png",
    sprite: {
        url: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
        x: 0,
        y: 0
    },
    description: "New champion is coming!"
}
```

### PATCH /api/v1/champions
When modifying a champion information, create PATCH request to the endpoint with changed information.
```
{
    id:"updatedchampion",
    key:999,
    name: "Updated Champion",
    title: "Renewed!!",
    tags: ["Fighter", "Tank"],
    stats: {
        hp: 580,
        hpperlevel: 85,
        mp: 100,
        mpperlevel: 0,
        movespeed: 345,
        armor: 33,
        armorperlevel: 3.8,
        spellblock: 32.1,
        spellblockperlevel: 1.25,
        attackrange: 150,
        hpregen: 6.5,
        hpregenperlevel: 0.5,
        mpregen: 0,
        mpregenperlevel: 0,
        crit: 0,
        critperlevel: 0,
        attackdamage: 70,
        attackdamageperlevel: 3.2,
        attackspeedoffset: -0.04,
        attackspeedperlevel: 3
    },
    icon: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/newchampion.png",
    sprite: {
        url: "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
        x: 0,
        y: 0
    },
    description: "New champion is coming!"
}
```

### DELETE /api/v1/champions
When removing a champion information, create DELETE request to the endpoint with **nameOrKey**. It has the same rule above.
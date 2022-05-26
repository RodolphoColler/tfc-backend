
# Trybe football club

## POST /api/login


#### Body 
``` 
  {
    email: string,
    password: string
  }
```

#### Should return

  ```
  {
    user: {
      id: 1,
      username: Admin,
      role: admin,
      email: admin@admin.com
    },
    token: 123.456.789
  }
  ```
## GET /api/login/validate

Should recieve `authorization` filled with user `token`.

### Should return

User role.

  ```plaintext
    "admin"
  ```

## GET /api/teams

### Should return

Every team registered.

```
[
	{
		id: 1,
		teamName: "Avaí/Kindermann"
	},
	{
		id: 2,
		teamName: "Bahia"
	},
	{
		id: 3,
		teamName: "Botafogo"
	},
]
```

## GET /api/teams/:id

### Should return

The team with current id.

```
{
	id: 1,
	teamName: "Avaí/Kindermann"
},

```

## GET /api/matches

### Should return

Every match registered.

```json
[
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Internacional"
    }
  }
]
```

## GET /api/matches?inProgress=true

### Should return

Every finished match.

```json
[
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
]
```

## GET /api/matches?inProgress=false

### Should return

Every finished match.

```json
[
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
]
```

## POST /api/matches

Should recieve `authorization` filled with user `token`.

### Body

```json
{
  homeTeam: 16, 
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}
```

### Should return

```json
{
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}
```

## PATCH /api/matches/:id/finish

Should finish match with current id.

## PATCH api/matches/:id

## Body

```json
{
  homeTeamGoals: 3,
  awayTeamGoals: 1
}
```

Should update match score.

## GET api/leaderboard

### Should return

```json
[
  {
    name: "Palmeiras",
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: 86.67
  },
  {
    name: "Corinthians",
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: 80
  },
]
```

## GET api/leaderboard/away

### Should return

Leaderboard based on teams that plays how visiters.

```json
[
  {
    name: "Palmeiras",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 0,
    goalsBalance: 7,
    efficiency: 100
  },
  {
    name: "Corinthians",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 2,
    goalsBalance: 4,
    efficiency: 66.67
  },
]
```

## GET api/leaderboard/home

### Should return

Leaderboard based on teams that plays how home.

```json
[
  {
    name: "Santos",
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: 100
  },
  {
    name: "Palmeiras",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 5,
    goalsBalance: 6,
    efficiency: 77.78
  },
]
```


<div id="top"></div>

<div align="center">
  <!--   
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> 
  -->
  <h3 align="center">Sing me a Song</h3>
  <p align="center">
    API Reference
    <br />
    <!--     
    <a href="#" style="pointer-events: none; color:gray">
      <strong>Explore the docs »</strong>
    </a> 
    <br />
    -->
    <br />
    <!--     
    <a 
    href="#" style="pointer-events: none; color:gray">View Demo</a> 
    ·
    -->
    <a href="https://github.com/ruineto-dev/api-sing-me-a-song/issues">Report Bug</a>
    ·
    <a href="https://github.com/ruineto-dev/api-sing-me-a-song/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#routes">Routes Overview</a>
      <ul>
        <li>
          <a href="#create-recommendation">
          Create Recommendation
          </a>
        </li>
        <li>
          <a href="#create-upvote">Create Upvote</a>
        </li>
        <li>
          <a href="#create-downvote">Create Downvote</a>
        </li>
        <li>
          <a href="#read-recommendations">
            Read Recommendations
          </a>
        </li>
        <li>
          <a href="#read-recommendation">
            Read Recommendation
          </a>
        </li>
        <li>
          <a href="#read-recommendations-random">
            Read Recommendations Random
          </a>
        </li>
        <li>
          <a href="#read-recommendations-amount">
            Read Recommendations Amount
          </a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
    <li>
      <a href="#acknowledgments">Acknowledgments</a>
    </li>
  </ol>
</details>

## Routes

### Create Recommendation

Adds a new song recommendation. The request has the following format:

| Parameter     | Type     | Description  |
| ------------- | -------- | ------------ |
| `body`        | `object` | **Required** |
| `name`        | `string` | **Required** |
| `youtubeLink` | `url`    | **Required** |

- Endpoint

```http
POST /recommendations
```

- Send

```json
{
  "name": "ChillSynth FM - lofi synthwave radio for retro dreaming",
  "youtubeLink": "https://www.youtube.com/watch?v=UedTcufyrHc"
}
```

- Response

```json
{
  "code": 200
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Create Upvote

Adds a point to the reflection of the reflection. It does not expect anything in the body:

| Parameter | Type     | Description  |
| --------- | -------- | ------------ |
| `params`  | `string` | **Required** |

- Endpoint

```http
POST /recommendations/:id/upvote
```

- Response

```json
{
  "code": 200
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Create Downvote

Remove a point from the score. It does not expect anything in the body. If the score falls below -5, the recommendation will be deleted:

| Parameter | Type     | Description  |
| --------- | -------- | ------------ |
| `params`  | `string` | **Required** |

- Endpoint

```http
POST /recommendations/:id/downvote
```

- Response

```json
{
  "code": 200
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Read Recommendations

Get all the last 10 recommendations:

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `none`    | `n/a` | **n/a**     |

- Endpoint

```http
GET /recommendations
```

- Response

```json
[
	{
		"id": 1,
		"name": "ChillSynth FM - lofi synthwave radio for retro dreaming",
		"youtubeLink": "https://www.youtube.com/watch?v=UedTcufyrHc",
		"score": 245
	},
  ...
]
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Read Recommendation

Get a recommendation by your ID.

| Parameter | Type     | Description  |
| --------- | -------- | ------------ |
| `params`  | `string` | **Required** |

- Endpoint

```http
GET /recommendations/:id
```

- Response

```json
{
  "id": 1,
  "name": "ChillSynth FM - lofi synthwave radio for retro dreaming",
  "youtubeLink": "https://www.youtube.com/watch?v=UedTcufyrHc",
  "score": 245
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Read Recommendations Random

Takes a random recommendation, based on the following logic:

- **70% of the times they hit this route**: a song with a score greater than 10 should be randomly recommended
- **30% of the times they hit this route**: a song with a score between -5 and 10 (inclusive), should be randomly recommended
- If there are only songs with a score above 10 or only below/equal to 10, 100% of the time any song must be drawn
- If there is no song registered, status 404 must be returned

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `none`    | `n/a` | **n/a**     |

- Endpoint

```http
GET /recommendations/random
```

- Response

```json
{
  "id": 1,
  "name": "jazz/lofi hip hop radio🌱chill beats to relax/study to [LIVE 24/7]",
  "youtubeLink": "https://www.youtube.com/watch?v=kgx4WGK0oNU",
  "score": 400
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Read Recommendations Amount

Lists the songs with the most points and their score. Top x songs are returned (parameter :amount of the route), ordered by score (highest first)

| Parameter | Type  | Description |
| --------- | ----- | ----------- |
| `none`    | `n/a` | **n/a**     |

- Endpoint

```http
GET /recommendations/top/:amount
```

- Response

```json
[
  {
    "id": 1,
    "name": "jazz/lofi hip hop radio🌱chill beats to relax/study to [LIVE 24/7]",
    "youtubeLink": "https://www.youtube.com/watch?v=kgx4WGK0oNU",
    "score": 576
  },
  {
    "id": 2,
    "name": "ChillSynth FM - lofi synthwave radio for retro dreaming",
    "youtubeLink": "https://www.youtube.com/watch?v=UedTcufyrHc",
    "score": 340
  },
  ...
]
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Rui Neto - [@ruineto-dev](https://github.com/ruineto-dev) - ruineto11@gmail.com <br />
Project Link: [@api-sing-me-a-song](https://github.com/ruineto-dev/api-sing-me-a-song)

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

I would like to express my sincere thanks to the team and the teams that set out to develop these excellent technologies that were essential for the creation of this project.

- [Jest](https://jestjs.io/)
- [ESlint](https://eslint.org/)
- [Prettier](https://www.npmjs.com/package/prettier)
<p align="right">(<a href="#top">back to top</a>)</p>

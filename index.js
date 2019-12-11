const fs = require('fs');
const util = require('util');
const readline = require('readline');

const axios = require('axios');

const writeIndex = util.promisify(fs.writeFile);
const appendCSS = util.promisify(fs.appendFile);

let githubUsername;
let color;

let company;
let location;
let githubPFP;
let githubBio;
let githubRepos;
let githubFollowers;
let githubStars;
let githubFollowing;

let userInput = () => {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("What is your GitHub username? ", (usernameInput) => {
    githubUsername = usernameInput;
    rl.close();
    console.log(githubUsername);
  });
}

githubUsername = "malilaychris";
color = "#0f9cff";

let generateData = async () => {
  await userInput();
  const queryURL = "https://api.github.com/users/" + githubUsername;

  axios.get(queryURL).then(function(res) {
    fullName = res.data.name;
    githubPFP = res.data.avatar_url;
    githubBio = res.data.bio;
    location = res.data.location;
    githubRepos = res.data.public_repos;
    githubFollowers = res.data.followers;
    githubStars = res.data.public_gists;
    githubFollowing = res.data.following;
    
    writeIndex("index.html", generateIndex());
    appendCSS("assets/css/styles.css", changeColor(color));
  });
}

let generateIndex = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="assets/css/styles.css">
  <title>Developer Profile Generator</title>
</head>
<body>

<header>
  <img class="profile-picture" src="${githubPFP}">
  <h1>Hi!</h1>
  <h1>My name is ${fullName}!</h1>
  <h3>Currently @ ${company}</h3>
  
  <div class="information">
    <div>
      <span><a href="https://www.google.com/maps/place/${location}">${location}</a></span>
      <span><a href="https://github.com/${githubUsername}">Github</a></span>
      <span><a href="">Blog</a></span>
    </div>
  </div>
</header>

<section class="github">
  <h2>${githubBio}</h2>
  <div class="section__info-blocks">
    <div class="info-block">
      <div>Public Repositories</div>
      <div>${githubRepos}</div>
    </div>
    <div class="info-block">
      <div>Followers</div>
      <div>${githubFollowers}</div>
    </div>
    <div class="info-block">
      <div>Github Stars</div>
      <div>${githubStars}</div>
    </div>
    <div class="info-block">
      <div>Following</div>
      <div>${githubFollowing}</div>
    </div>
  </div>
</section>
  
</body>
</html>`;
}

let changeColor = (color) => {
  return `:root {
  --custom-color: ${color};
}`;
}

generateData();
import axios from 'axios';
import logCustomMessage from './logCustomMessage';

const id = "";
const sec = "";
const param = `?client_id=${id}&client_secret=${sec}`;

function getUserInfo (username) {
  return axios.get(`https://api.github.com/users/${username + param}`);
};

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`);
}

function getTotalStars (repos) {
  return repos.data.reduce((prev, current) => prev + current.stargazers_count, 0);
}

async function getPlayersData (player) {
  try {
    const repos = await getRepos(player.login);
    const totalStars = getTotalStars(repos);

    return {
      followers: player.followers,
      totalStars
    };
  } catch (error) {
    console.log('Error in githubHellpers getPlayersData:', error);
  };
}

function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ];
}

export async function getPlayersInfo (players) {
  try {
    const info = await Promise.all(players.map((username) => getUserInfo(username)));
    return info.map((user) => user.data);
  } catch (error) {
    logCustomMessage(error.response.statusText, {
      players,
      error
    })
  };
};

export async function battle (playersInfo) {
  try {
    const playerOneData = getPlayersData(playersInfo[0]);
    const playerTwoData = getPlayersData(playersInfo[1]);
    const data = await Promise.all([playerOneData, playerTwoData]);
    return await calculateScores(data);
  } catch (error) {
    logCustomMessage(error.response.statusText, {
      players: [playerOneData, playerTwoData],
      error
    });
  };

  return axios.all([playerOneData, playerTwoData])
    .then(calculateScores)
};

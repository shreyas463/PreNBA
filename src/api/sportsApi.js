import axios from 'axios';
import { API_KEY, FOOTBALL_API_URL, NBA_API_URL } from './config';

const footballApi = axios.create({
  baseURL: FOOTBALL_API_URL,
  headers: {
    'x-apisports-key': API_KEY
  }
});

const nbaApi = axios.create({
  baseURL: NBA_API_URL,
  headers: {
    'x-apisports-key': API_KEY
  }
});

export const searchPremierLeaguePlayers = async (name) => {
  try {
    const response = await footballApi.get('/players', {
      params: {
        league: 39, // Premier League ID
        search: name,
        season: 2023
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching Premier League players:', error);
    throw error;
  }
};

export const searchNBAPlayers = async (name) => {
  try {
    const response = await nbaApi.get('/players', {
      params: {
        league: 12, // NBA League ID
        search: name,
        season: 2023
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching NBA players:', error);
    throw error;
  }
};

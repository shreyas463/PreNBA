import axios from 'axios';
import { API_KEY, FOOTBALL_API_URL, NBA_API_URL } from './config';
import { mockNBAPlayers } from './mockData';

const footballApi = axios.create({
  baseURL: FOOTBALL_API_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
  }
});

const nbaApi = axios.create({
  baseURL: NBA_API_URL,
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v3.basketball.api-sports.io'
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
    console.log('Searching for NBA player:', name);
    const response = await nbaApi.get('/players', {
      params: {
        league: 12, // NBA League ID
        search: name,
        season: 2023
      }
    });
    console.log('NBA API response:', response.data);
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching NBA players:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    // Use mock data as fallback when API fails
    console.log('Using mock NBA player data as fallback');
    const lowercaseName = name.toLowerCase();
    return mockNBAPlayers.filter(player => {
      return player.firstname.toLowerCase().includes(lowercaseName) || 
             player.lastname.toLowerCase().includes(lowercaseName);
    });
  }
};

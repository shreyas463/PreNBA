import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, Tab, Tabs, CircularProgress } from '@mui/material';
import PlayerCard from './components/PlayerCard';
import { searchPremierLeaguePlayers, searchNBAPlayers } from './api/sportsApi';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sport, setSport] = useState('football');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError('');
    try {
      const result = sport === 'football'
        ? await searchPremierLeaguePlayers(searchTerm)
        : await searchNBAPlayers(searchTerm);
      setPlayers(result || []);
    } catch (err) {
      setError('Error fetching player data. Please try again.');
      setPlayers([]);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 3, py: 4, mt: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
          Sports Player Info
        </Typography>

        <Tabs
          value={sport}
          onChange={(_, newValue) => setSport(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Premier League" value="football" />
          <Tab label="NBA" value="nba" />
        </Tabs>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Search Player"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-box"
            sx={{
              '& label': { color: 'white' },
              '& label.Mui-focused': { color: '#EA738D' }
            }}
          />
          <Button
            variant="contained"
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2, color: '#EA738D' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              player={player}
              sport={sport}
            />
          ))}
          {players.length === 0 && !loading && !error && (
            <Typography align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Please enter a player name to search.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;

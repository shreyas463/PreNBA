import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, Tab, Tabs, CircularProgress } from '@mui/material';
import PlayerCard from './components/PlayerCard';
import AnimatedBackground from './components/AnimatedBackground';
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
      let result;
      if (sport === 'football') {
        result = await searchPremierLeaguePlayers(searchTerm);
      } else {
        // NBA search
        console.log('Initiating NBA player search for:', searchTerm);
        result = await searchNBAPlayers(searchTerm);
        console.log('NBA search result:', result);
        
        // Check if we got results
        if (result.length === 0) {
          console.log('No NBA players found with that name');
        }
      }
      
      setPlayers(result || []);
      
      // Show a message if no players were found
      if ((result || []).length === 0) {
        setError(`No ${sport === 'football' ? 'Premier League' : 'NBA'} players found with the name "${searchTerm}". Try a different name.`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(`Error fetching ${sport === 'football' ? 'Premier League' : 'NBA'} player data. Please try again.`);
      setPlayers([]);
    }
    setLoading(false);
  };

  return (
    <>
      <AnimatedBackground />
      <Container maxWidth="md" sx={{ 
        backgroundColor: 'rgba(106, 127, 219, 0.25)', 
        backdropFilter: 'blur(10px)', 
        borderRadius: 16, 
        py: 4, 
        mt: 4, 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
          color: '#EA738D',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
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
            <Typography align="center" sx={{ color: '#EA738D' }}>
              Please enter a player name to search.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default App;

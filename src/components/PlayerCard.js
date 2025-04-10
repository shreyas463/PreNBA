import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlayerCard = ({ player, sport }) => {
  if (sport === 'football') {
    return (
      <Card sx={{ minWidth: 275, m: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {player.player?.name || player.name}
          </Typography>
          <Typography color="text.secondary">
            Age: {player.player?.age || player.age || 'N/A'}
          </Typography>
          <Typography>
            Nationality: {player.player?.nationality || player.nationality || 'N/A'}
          </Typography>
          <Typography>
            Team: {player.statistics?.[0]?.team?.name || 'N/A'}
          </Typography>
          <Typography>
            Position: {player.statistics?.[0]?.games?.position || 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {player.firstname} {player.lastname}
        </Typography>
        <Typography color="text.secondary">
          Age: {player.age || new Date().getFullYear() - new Date(player.birth?.date).getFullYear() || 'N/A'}
        </Typography>
        <Typography>
          Nationality: {player.nationality || player.birth?.country || 'N/A'}
        </Typography>
        <Typography>
          Team: {player.team?.name || 'N/A'}
        </Typography>
        <Typography>
          Position: {player.position || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;

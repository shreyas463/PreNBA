import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, CardMedia, Skeleton } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const PlayerCard = ({ player, sport }) => {
  // Separate state for football and NBA players
  const [footballImageLoaded, setFootballImageLoaded] = useState(false);
  const [footballImageError, setFootballImageError] = useState(false);
  const [nbaImageLoaded, setNbaImageLoaded] = useState(false);
  const [nbaImageError, setNbaImageError] = useState(false);
  if (sport === 'football') {
    return (
      <Card sx={{ 
        minWidth: 275, 
        m: 2, 
        backgroundColor: 'rgba(106, 127, 219, 0.3)',
        backdropFilter: 'blur(5px)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}>
        <CardContent sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ width: 120, height: 120, borderRadius: 2, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            {!footballImageLoaded && !footballImageError && (
              <Skeleton 
                variant="rectangular" 
                width={120} 
                height={120} 
                animation="wave" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
              />
            )}
            {player.player?.photo && !footballImageError ? (
              <CardMedia
                component="img"
                image={player.player.photo}
                alt={player.player?.name || player.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: footballImageLoaded ? 'block' : 'none',
                  borderRadius: 2
                }}
                onLoad={() => setFootballImageLoaded(true)}
                onError={() => setFootballImageError(true)}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(234, 115, 141, 0.7)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <SportsSoccerIcon sx={{ fontSize: 60 }} />
              </Box>
            )}
          </Box>
          <Box>
          <Typography variant="h5" component="div" sx={{ color: '#EA738D', fontWeight: 'bold' }}>
            {player.player?.name || player.name}
          </Typography>
          <Typography sx={{ color: 'white', opacity: 0.8 }}>
            Age: {player.player?.age || player.age || 'N/A'}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Nationality: {player.player?.nationality || player.nationality || 'N/A'}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Team: {player.statistics?.[0]?.team?.name || 'N/A'}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Position: {player.statistics?.[0]?.games?.position || 'N/A'}
          </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
        minWidth: 275, 
        m: 2, 
        backgroundColor: 'rgba(106, 127, 219, 0.3)',
        backdropFilter: 'blur(5px)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}>
      <CardContent sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ width: 120, height: 120, borderRadius: 2, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          {!nbaImageLoaded && !nbaImageError && (
            <Skeleton 
              variant="rectangular" 
              width={120} 
              height={120} 
              animation="wave" 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
            />
          )}
          {player.id && !nbaImageError ? (
            <CardMedia
              component="img"
              image={`https://media.api-sports.io/basketball/players/${player.id}.png`}
              alt={`${player.firstname} ${player.lastname}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: nbaImageLoaded ? 'block' : 'none',
                borderRadius: 2
              }}
              onLoad={() => setNbaImageLoaded(true)}
              onError={() => setNbaImageError(true)}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(234, 115, 141, 0.7)',
                color: 'white',
                borderRadius: 2
              }}
            >
              <SportsBasketballIcon sx={{ fontSize: 60 }} />
            </Box>
          )}
        </Box>
        <Box>
        <Typography variant="h5" component="div" sx={{ color: '#EA738D', fontWeight: 'bold' }}>
          {player.firstname} {player.lastname}
        </Typography>
        <Typography sx={{ color: 'white', opacity: 0.8 }}>
          Age: {player.age || new Date().getFullYear() - new Date(player.birth?.date).getFullYear() || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          Nationality: {player.nationality || player.birth?.country || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          Team: {player.team?.name || 'N/A'}
        </Typography>
        <Typography sx={{ color: 'white' }}>
          Position: {player.position || 'N/A'}
        </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;

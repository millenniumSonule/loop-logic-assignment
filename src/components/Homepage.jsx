import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LoadingSpinner from './LoadingSpinner';
import './Homepage.css';

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Homepage = () => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [orderBy, setOrderBy] = useState('Release Date');
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch('https://spa.api.logicloop.io/api/games');
        const data = await response.json();
        setGames(data.data || []);
        setFilteredGames(data.data || []);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    onFilterChange({ name, score, orderBy });
  }, [name, score, orderBy]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const clearFilters = () => {
    setName('');
    setScore('');
    setOrderBy('Release Date');
  };

  const onFilterChange = async ({ name, score, orderBy }) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const queryParams = new URLSearchParams();

      if (name) {
        queryParams.append('filters[name][$containsi]', name);
      }

      if (score) {
        queryParams.append('filters[rating][$gte]', score);
      }

      if (orderBy === 'Name') {
        queryParams.append('sort', 'name');
      } else if (orderBy === 'Score') {
        queryParams.append('sort', 'rating:desc');
      } else if (orderBy === 'Release Date') {
        queryParams.append('sort', 'releaseDate:desc');
      }

      const response = await fetch(`https://spa.api.logicloop.io/api/games?${queryParams.toString()}`);
      const data = await response.json();
      setFilteredGames(data.data || []);
    } catch (error) {
      console.error('Error filtering games:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="homepage-container">
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="content">
        <div className="filter-container">
          <div className="filter-component">
            <div>
              <h3>Filter Results</h3>
              <label>
                Name (contains):
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Text string"
                />
              </label>
            </div>
            <div>
              <label>
                Minimum Score:
                <input
                  type="number"
                  value={score}
                  onChange={handleScoreChange}
                  onFocus={(e) => e.target.placeholder = ''}
                  onBlur={(e) => e.target.placeholder = '1 - 10'}
                  placeholder="1 - 10"
                />
              </label>
            </div>
            <div>
              <label>
                Order By:
                <select value={orderBy} onChange={handleOrderByChange}>
                  <option value="Release Date">Release Date</option>
                  <option value="Score">Score</option>
                  <option value="Name">Name</option>
                </select>
              </label>
            </div>
            <button onClick={clearFilters}>Clear</button>
          </div>
        </div>

        <div className="result-container">
          {loading ? (
            <LoadingSpinner /> // Show spinner while loading
          ) : filteredGames && filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game.id} className="outer-game-card">
                <div className="game-card">
                  <h3 className="game-name">{game.attributes.name}</h3>
                  <p className="game-rating">Release Date: {formatDate(game.attributes.createdAt)}</p>
                  <p className="game-summary">{game.attributes.summary}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No games found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

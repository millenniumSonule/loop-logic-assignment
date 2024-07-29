import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LoadingSpinner from './LoadingSpinner'; 
import './Homepage.css';


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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchGames = async (filters = {}, pagination = { page: 1, pageSize: 10 }, sort = '') => {
      setLoading(true); 
      try {
        let query = `?pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}`;

        Object.keys(filters).forEach((key) => {
          const filter = filters[key];
          query += `&filters[${key}][${filter.operator}]=${filter.value}`;
        });

        if (sort) {
          query += `&sort=${sort}`;
        }

        const response = await fetch(`https://spa.api.logicloop.io/api/games${query}`);
        const data = await response.json();
        setGames(data.data);
        setFilteredGames(data.data);
        setTotalPages(data.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    const filters = {};
    if (name) filters['name'] = { operator: '$containsi', value: name };
    if (score) filters['rating'] = { operator: '$gte', value: score };

    let sort = '';
    switch (orderBy) {
      case 'Name':
        sort = 'name'; 
        break;
      case 'Score':
        sort = 'rating'; 
        break;
      case 'Release Date':
        sort = 'createdAt'; 
        break;
      default:
        sort = 'createdAt'; 
    }

    fetchGames(filters, { page, pageSize: 10 }, sort);
  }, [name, score, orderBy, page]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setPage(1); // Reset to first page when filters change
  };

  const handleScoreChange = (event) => {
    const newScore = event.target.value;
    setScore(newScore);
    setPage(1); // Reset to first page when filters change
  };

  const handleOrderByChange = (event) => {
    const newOrderBy = event.target.value;
    setOrderBy(newOrderBy);
  };

  const clearFilters = () => {
    setName('');
    setScore('');
    setOrderBy('Release Date');
    setPage(1); // Reset to first page when filters are cleared
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
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
            <LoadingSpinner /> // Show spinner when loading
          ) : filteredGames.length > 0 ? (
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
          <div className="pagination">
            {page > 1 && <button onClick={() => handlePagination(page - 1)}>Previous</button>}
            {page < totalPages && <button onClick={() => handlePagination(page + 1)}>Next</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

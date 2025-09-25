import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './BookCatalog.css';

const BookCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailable, setFilterAvailable] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const booksData = await api.getBooks();
        setBooks(booksData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(`Failed to load books: ${err.message}. Please check your internet connection and try again.`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterAvailable || book.available;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Books</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            // Retry fetching books
            api.getBooks()
              .then(booksData => {
                setBooks(booksData);
                setLoading(false);
              })
              .catch(err => {
                console.error('Retry failed:', err);
                setError(`Failed to load books: ${err.message}. Please check your internet connection and try again.`);
                setLoading(false);
              });
          }} 
          className="btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="book-catalog">
      <div className="catalog-header">
        <h1>📚 Book Catalog</h1>
        <p className="catalog-subtitle">
          Discover your next great read from our collection of {books.length} books
        </p>
      </div>

      <div className="catalog-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.checked)}
          />
          Show only available books
        </label>
      </div>

      <div className="books-grid">
        {filteredBooks.length === 0 ? (
          <div className="no-books">
            <h3>No books found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img 
                  src={book.coverimage} 
                  alt={`${book.title} cover`}
                  onError={(e) => {
                    e.target.src = '/books.png'; // Fallback image
                  }}
                />
                {!book.available && (
                  <div className="book-status unavailable">
                    Checked Out
                  </div>
                )}
              </div>
              
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-description">
                  {book.description.length > 150 
                    ? `${book.description.substring(0, 150)}...` 
                    : book.description
                  }
                </p>
                
                <div className="book-actions">
                  <Link to={`/books/${book.id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookCatalog;

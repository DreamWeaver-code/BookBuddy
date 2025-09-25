import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reserving, setReserving] = useState(false);
  const [reservationMessage, setReservationMessage] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookData = await api.getBook(id);
        setBook(bookData);
      } catch (err) {
        setError('Failed to load book details. Please try again later.');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReserve = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setReserving(true);
      setReservationMessage('');
      
      await api.createReservation(book.id, token);
      setReservationMessage('Book reserved successfully!');
      
      // Refresh book data to update availability
      const updatedBook = await api.getBook(id);
      setBook(updatedBook);
    } catch (err) {
      setReservationMessage('Failed to reserve book. Please try again.');
      console.error('Error reserving book:', err);
    } finally {
      setReserving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Book not found'}</p>
        <button onClick={() => navigate('/books')} className="btn">
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <div className="book-detail-content">
          <div className="book-cover-large">
            <img 
              src={book.coverimage} 
              alt={`${book.title} cover`}
              onError={(e) => {
                e.target.src = '/books.png'; // Fallback image
              }}
            />
            {!book.available && (
              <div className="book-status-large unavailable">
                Currently Checked Out
              </div>
            )}
          </div>
          
          <div className="book-details">
            <div className="book-header">
              <h1 className="book-title-large">{book.title}</h1>
              <p className="book-author-large">by {book.author}</p>
            </div>
            
            <div className="book-description-large">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
            
            <div className="book-availability">
              <h3>Availability</h3>
              <div className={`availability-status ${book.available ? 'available' : 'unavailable'}`}>
                {book.available ? '✅ Available for checkout' : '❌ Currently checked out'}
              </div>
            </div>
            
            {reservationMessage && (
              <div className={`reservation-message ${reservationMessage.includes('successfully') ? 'success' : 'error'}`}>
                {reservationMessage}
              </div>
            )}
            
            <div className="book-actions">
              {book.available ? (
                isAuthenticated ? (
                  <button 
                    onClick={handleReserve}
                    disabled={reserving}
                    className="btn btn-success"
                  >
                    {reserving ? 'Reserving...' : 'Reserve This Book'}
                  </button>
                ) : (
                  <div className="login-prompt">
                    <p>Please log in to reserve this book.</p>
                    <button 
                      onClick={() => navigate('/login')}
                      className="btn"
                    >
                      Log In
                    </button>
                  </div>
                )
              ) : (
                <div className="unavailable-message">
                  <p>This book is currently checked out by another user.</p>
                  <p>Check back later or browse other available books.</p>
                </div>
              )}
              
              <button 
                onClick={() => navigate('/books')}
                className="btn btn-secondary"
              >
                Back to Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

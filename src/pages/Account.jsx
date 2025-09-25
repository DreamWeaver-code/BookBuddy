import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './Account.css';

const Account = () => {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returning, setReturning] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/account' } } });
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);
        const reservationsData = await api.getReservations(token);
        setReservations(reservationsData);
      } catch (err) {
        setError('Failed to load reservations. Please try again later.');
        console.error('Error fetching reservations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [isAuthenticated, token, navigate]);

  const handleReturnBook = async (reservationId) => {
    try {
      setReturning(reservationId);
      await api.deleteReservation(reservationId, token);
      
      // Remove the returned book from the reservations list
      setReservations(prev => prev.filter(res => res.id !== reservationId));
    } catch (err) {
      setError('Failed to return book. Please try again.');
      console.error('Error returning book:', err);
    } finally {
      setReturning(null);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and book reservations</p>
        </div>

        <div className="account-content">
          <div className="profile-section">
            <div className="profile-card">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <div className="profile-field">
                  <label>Name:</label>
                  <span>{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <span>{user?.email}</span>
                </div>
                <div className="profile-field">
                  <label>Member Since:</label>
                  <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reservations-section">
            <div className="reservations-card">
              <h2>My Reservations</h2>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {reservations.length === 0 ? (
                <div className="no-reservations">
                  <div className="no-reservations-icon">📚</div>
                  <h3>No books reserved</h3>
                  <p>You haven't reserved any books yet.</p>
                  <Link to="/books" className="btn">
                    Browse Books
                  </Link>
                </div>
              ) : (
                <div className="reservations-list">
                  {reservations.map(reservation => (
                    <div key={reservation.id} className="reservation-item">
                      <div className="reservation-book">
                        <div className="book-cover-small">
                          <img 
                            src={reservation.book?.coverimage} 
                            alt={`${reservation.book?.title} cover`}
                            onError={(e) => {
                              e.target.src = '/books.png';
                            }}
                          />
                        </div>
                        
                        <div className="book-details">
                          <h3 className="book-title">{reservation.book?.title}</h3>
                          <p className="book-author">by {reservation.book?.author}</p>
                          <p className="reservation-date">
                            Reserved on {new Date(reservation.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="reservation-actions">
                        <button
                          onClick={() => handleReturnBook(reservation.id)}
                          disabled={returning === reservation.id}
                          className="btn btn-danger"
                        >
                          {returning === reservation.id ? 'Returning...' : 'Return Book'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

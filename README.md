# 📚 BookBuddy - Library Management System

![The landing page of Book Buddy displays a catalog of different books.](/example.png)

A modern, responsive library management system built with React and Vite that allows users to browse, reserve, and manage book loans through an intuitive web interface.

## ✨ Features Implemented

### For All Users
- **Browse Book Catalog**: View all available books in the library
- **Search & Filter**: Search books by title or author, filter by availability
- **Book Details**: View detailed information about each book including description and cover image
- **User Registration**: Create a new account to access library services
- **User Login**: Sign in to existing accounts

### For Logged-in Users
- **Reserve Books**: Check out available books from the catalog
- **User Profile**: View personal information and account details
- **Reservation Management**: See all current book reservations
- **Return Books**: Return checked-out books directly from the profile page

## Requirements

### All users should be able to:

- See all books in the library's catalog
- View details of an individual book
- Register for a new account
- Log in to an existing account

### Logged in users should be able to:

- Check out an available book
- View their profile page, which includes information such as their name and their email
- See a list of books that they have reserved
- Return a book they have checked out

> [!WARNING]
>
> The API is _not_ instanced by cohort! Everyone interacts with the same set
> of books. Please let your instructor know if all of the books are reserved and you
> cannot make any reservations. Be mindful of this as you work on the project, and
> try not to reserve too many books at once while you are testing!

## Recommended Site Layout

While you are free to organize your project however you'd like to meet the requirements, here is a recommended site layout to follow:

`/`, `/books` - list of all books in catalog

- each book links to its individual page

`/books/:id` - details about the specific book

- if the user is logged in, show a "Reserve" button for the user to check out this book
- if the book is already reserved, the button should be disabled

`/account` - profile page

- if the user is not logged in, show them a link to register or log in
- if the user is logged in, then show their account details such as name and email
- show a list of all reservations the user has made
  - in this list, also include a button for users to return the reserved book

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   └── Navbar.css      # Navigation styles
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── BookCatalog.jsx # Main book listing page
│   ├── BookDetail.jsx  # Individual book details
│   ├── Account.jsx     # User profile and reservations
│   ├── Login.jsx       # User login form
│   ├── Register.jsx    # User registration form
│   └── *.css           # Page-specific styles
├── services/           # API integration
│   └── api.js          # API service layer
├── App.jsx             # Main application component
├── App.css             # Global application styles
├── index.css           # Base styles and utilities
└── main.jsx            # Application entry point
```

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern design principles
- **State Management**: React Context API
- **API Integration**: Fetch API with custom service layer
- **Authentication**: JWT token-based authentication

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🔗 API Integration

The application integrates with the BookBuddy API:
- **Base URL**: `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`
- **Authentication**: Bearer token authentication
- **Endpoints**:
  - `GET /books` - Fetch all books
  - `GET /books/:id` - Fetch book details
  - `POST /users/register` - User registration
  - `POST /users/login` - User login
  - `GET /users/me` - Get current user
  - `GET /reservations` - Get user reservations
  - `POST /reservations` - Create reservation
  - `DELETE /reservations/:id` - Return book

## 🎨 Design Features

- **Modern UI**: Clean, professional design with intuitive navigation
- **Accessibility**: Proper focus management and semantic HTML
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages and fallbacks
- **Visual Feedback**: Hover effects and smooth transitions

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Submission

**Make a pull request** from your fork into the main branch of this starter repo. The title of your pull request should include your full name. Submit the link to your _pull request_.

---

**Happy Reading! 📖✨**

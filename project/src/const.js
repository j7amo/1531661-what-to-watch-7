export const AppRoute = {
  SIGN_IN: '/login',
  MAIN: '/',
  MY_LIST: '/myList',
  FILMS: '/films',
  FILM_WITH_ID: '/films/:id',
  ADD_REVIEW: '/films/:id/review',
  PLAYER: '/player/:id',
};

export const MovieRating = {
  BAD: 'Bad',
  NORMAL: 'Normal',
  GOOD: 'Good',
  VERY_GOOD: 'Very good',
  AWESOME: 'Awesome',
};

export const STARS_COUNT = 10;
export const ALL_GENRES = 'All genres';

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const APIRoute = {
  FILMS: '/films',
  PROMO: '/promo',
  FAVORITE: '/favorite',
  COMMENTS: '/comments',
  SIGN_IN: '/login',
  SIGN_OUT: '/logout',
};

export const ToastMessages = {
  REVIEW_ADD_ERROR: 'There was a problem when adding your review. Please check if you specified the rating, your comment has correct length (minimum 50 symbols and 400 symbols maximum) and try again!',
};

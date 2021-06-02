import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promoMovie = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
  moviePage: 'film-page.html',
  background: 'img/bg-the-grand-budapest-hotel.jpg',
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
};

const movies = [
  {
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    moviePage: 'film-page.html',
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  },
  {
    name: 'Bohemian Rhapsody',
    moviePage: 'film-page.html',
    previewImage: 'img/bohemian-rhapsody.jpg',
  },
  {
    name: 'Macbeth',
    moviePage: 'film-page.html',
    previewImage: 'img/macbeth.jpg',
  },
  {
    name: 'Aviator',
    moviePage: 'film-page.html',
    previewImage: 'img/aviator.jpg',
  },
  {
    name: 'We need to talk about Kevin',
    moviePage: 'film-page.html',
    previewImage: 'img/we-need-to-talk-about-kevin.jpg',
  },
  {
    name: 'What We Do in the Shadows',
    moviePage: 'film-page.html',
    previewImage: 'img/what-we-do-in-the-shadows.jpg',
  },
  {
    name: 'Revenant',
    moviePage: 'film-page.html',
    previewImage: 'img/revenant.jpg',
  },
  {
    name: 'Johnny English',
    moviePage: 'film-page.html',
    previewImage: 'img/johnny-english.jpg',
  },
  {
    name: 'Shutter Island',
    moviePage: 'film-page.html',
    previewImage: 'img/shutter-island.jpg',
  },
  {
    name: 'Pulp Fiction',
    moviePage: 'film-page.html',
    previewImage: 'img/pulp-fiction.jpg',
  },
  {
    name: 'No Country for Old Men',
    moviePage: 'film-page.html',
    previewImage: 'img/no-country-for-old-men.jpg',
  },
  {
    name: 'Snatch',
    moviePage: 'film-page.html',
    previewImage: 'img/snatch.jpg',
  },
  {
    name: 'Moonrise Kingdom',
    moviePage: 'film-page.html',
    previewImage: 'img/moonrise-kingdom.jpg',
  },
  {
    name: 'Seven Years in Tibet',
    moviePage: 'film-page.html',
    previewImage: 'img/seven-years-in-tibet.jpg',
  },
  {
    name: 'Midnight Special',
    moviePage: 'film-page.html',
    previewImage: 'img/midnight-special.jpg',
  },
  {
    name: 'War of the Worlds',
    moviePage: 'film-page.html',
    previewImage: 'img/war-of-the-worlds.jpg',
  },
  {
    name: 'Dardjeeling Limited',
    moviePage: 'film-page.html',
    previewImage: 'img/dardjeeling-limited.jpg',
  },
  {
    name: 'Orlando',
    moviePage: 'film-page.html',
    previewImage: 'img/orlando.jpg',
  },
  {
    name: 'Mindhunter',
    moviePage: 'film-page.html',
    previewImage: 'img/mindhunter.jpg',
  },
  {
    name: 'Midnight Special',
    moviePage: 'film-page.html',
    previewImage: 'img/midnight-special.jpg',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App promoMovie={promoMovie} movies={movies}/>
  </React.StrictMode>,
  document.getElementById('root'));

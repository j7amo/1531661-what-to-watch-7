import PropTypes from 'prop-types';

export default PropTypes.shape({
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  description: PropTypes.string,
  director: PropTypes.string,
  genre: PropTypes.string,
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  name: PropTypes.string,
  posterImage: PropTypes.string,
  previewImage: PropTypes.string,
  previewVideoLink: PropTypes.string,
  rating: PropTypes.number,
  released: PropTypes.number,
  runTime: PropTypes.number,
  scoresCount: PropTypes.number,
  starring: PropTypes.arrayOf(PropTypes.string),
  videoLink: PropTypes.string,
});

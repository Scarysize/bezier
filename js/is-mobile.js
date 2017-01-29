const QUERY = 'only screen and (min-device-width : 320px) and (max-device-width : 480px)';

module.exports = () => {
  return window.matchMedia(QUERY).matches;
}
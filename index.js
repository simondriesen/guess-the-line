import style from './style.js';

const map = new maplibregl.Map({
  container: 'map',
  style,
});

map.on('load', () => {
 console.log('success')
});
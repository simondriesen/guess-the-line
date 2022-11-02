import style from './style.js';
import countries from './countries.js';
import capitalsGeoJson from './capitals.js';

const map = new maplibregl.Map({
  container: 'map',
  style,
});

map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.addControl(new maplibregl.AttributionControl({
  customAttribution: `<a href="https://twitter.com/simondriesen">© Simon Driesen</a>  <a href="https://twitter.com/hashtag/30DayMapChallenge">#30DayMapChallenge</a>`
}));

map.on('load', async () => {
  /* DATA CREATION */
  const initialFeatures = [...capitalsGeoJson.features];
  const featureSelection = [];

  for (var i = 0; i < 10; ++i) {
    const randomIndex = Math.floor(Math.random() * initialFeatures.length);
    featureSelection.push(initialFeatures[randomIndex]);
    initialFeatures.splice(randomIndex, 1)
  }

  const capitalLines = featureSelection.map(capital => {
    const { coordinates } = capital.geometry;
    return {
      ...capital,
      type: "Feature",
      properties: {
        ...capital.properties,
        coordinates,
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [180, coordinates[1]],
          [-180, coordinates[1]]
        ]
      }
    }
  });

  /* SOURCES SETUP */
  map.addSource('countries', {
    type: 'geojson',
    data: countries,
  })

  map.addSource('capital-lines', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: capitalLines,
    },
    promoteId: "CountryName"
  })

  const clickedCapitalFeatures = [];
  map.addSource('capital-circles', {
    type: 'geojson',
    data: {
      type: "FeatureCollection",
      features: clickedCapitalFeatures,
    }
  })

  /* LAYERS SETUP */
  map.addLayer({
    "id": "countries-boundary",
    "type": "line",
    "paint": {
        "line-color": "#666",
        "line-width": {
            "stops": [
                [1,1],
                [6,2],
                [14,6],
                [22,12]
            ]
        },
        "line-opacity": {
            "stops": [
                [3,0.5],
                [6,1]
            ]
        }
    },
    "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
    },
    "source": "maplibre",
    "maxzoom": 24,
    "source-layer": "countries"
  })

  map.addLayer({
    id: 'capital-lines',
    type: 'line',
    source: 'capital-lines',
    layout: {},
    paint: {
      'line-color': '#fff',
      'line-width': [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2.5,
        1
      ]
    }
  })

  map.addLayer({
    id: 'capital-circles',
    type: 'circle',
    source: 'capital-circles',
    layout: {},
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffffff'
    }
  })

  map.addLayer({
    id: 'capital-label',
    type: 'symbol',
    source: 'capital-circles',
    layout: {
      'text-field': ['get', 'CapitalName'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
      'icon-image': ['get', 'icon']
      },
      paint: {
        'text-color': '#ffffff',
      }
  })

  /* EVENTS */
  map.on('zoom', () => {
    map.removeFeatureState({ source: 'capital-lines' });
  })

  map.on('mousemove', (e) => {
    const bboxAroundPoint = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
    const features = map.queryRenderedFeatures(
      bboxAroundPoint, { layers: ['capital-lines'] },
    );

    map.removeFeatureState({ source: 'capital-lines' });

    if (features.length && !clickedCapitalFeatures.find(f => f.properties.CountryName === features[0].properties.CountryName)) {
      map.getCanvas().style.cursor = 'pointer';
      map.setFeatureState({ source: features[0].source, id: features[0].id }, { hover: true });
    } else map.getCanvas().style.cursor = '';
  })

  map.on('click', (e) => {
    const bboxAroundPoint = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
    const features = map.queryRenderedFeatures(
      bboxAroundPoint, { layers: ['capital-lines'] },
    );

    if (features.length && !clickedCapitalFeatures.find(f => f.properties.CountryName === features[0].properties.CountryName)) {
      const coords = JSON.parse(features[0].properties.coordinates);
      clickedCapitalFeatures.push({
        geometry: {
          type: "Point",
          coordinates: coords,
        },
        properties: features[0].properties
      })
      
      const geojsonSource = map.getSource('capital-circles');
      geojsonSource.setData({
        type: "FeatureCollection",
        features: clickedCapitalFeatures,
      })
      map.flyTo({
        center: coords,
        zoom: 4,
      })
    }
  });
});
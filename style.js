export default {
    "id": "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
    "name": "MapLibre",
    "zoom": 0.8619833357855968,
    "pitch": 0,
    "center": [
        17.65431710431244,
        32.954120326746775
    ],
    "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "#444"
            },
            "filter": [
                "all"
            ],
            "layout": {
                "visibility": "visible"
            },
            "maxzoom": 24
        },
        // {
        //     "id": "countries-boundary",
        //     "type": "line",
        //     "paint": {
        //         "line-color": "#666",
        //         "line-width": {
        //             "stops": [
        //                 [
        //                     1,
        //                     1
        //                 ],
        //                 [
        //                     6,
        //                     2
        //                 ],
        //                 [
        //                     14,
        //                     6
        //                 ],
        //                 [
        //                     22,
        //                     12
        //                 ]
        //             ]
        //         },
        //         "line-opacity": {
        //             "stops": [
        //                 [
        //                     3,
        //                     0.5
        //                 ],
        //                 [
        //                     6,
        //                     1
        //                 ]
        //             ]
        //         }
        //     },
        //     "layout": {
        //         "line-cap": "round",
        //         "line-join": "round",
        //         "visibility": "visible"
        //     },
        //     "source": "maplibre",
        //     "maxzoom": 24,
        //     "source-layer": "countries"
        // },
    ],
    "bearing": 0,
    "sources": {
        "maplibre": {
            "url": "https://demotiles.maplibre.org/tiles/tiles.json",
            "type": "vector"
        },
    },
    "version": 8,
    "metadata": {
        "maptiler:copyright": "This style was generated on MapTiler Cloud. Usage is governed by the license terms in https://github.com/maplibre/demotiles/blob/gh-pages/LICENSE",
        "openmaptiles:version": "3.x"
    }
}
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoBoxF, PolygonF } from '@react-google-maps/api';
import { Spinners } from './spinners';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -33.0320658,
    lng: -71.4317347
};

const zoom = 5;

const markers = [
    {
        id: 1,
        name: "IRU",
        position: {
            lat: -33.031800437223936,
            lng: -71.42958891773964
        }
    },
    {
        id: 2,
        name: "Estación El SOl",
        position: {
            lat: -33.039337685520586,
            lng: -71.42877616577614
        }
    },
    {
        id: 3,
        name: "Estación Quilpué",
        position: {
            lat: -33.045273489231235,
            lng: -71.44465484286953
        }
    }
];

const polygonData = {
    paths: [
        { lat: -33.024367107968054, lng: -71.42779695016425 },
        { lat: -33.03990991453434, lng: -71.46933900067305 },
        { lat: -33.007622578225806, lng: -71.55051263719261 },
        { lat: -33.024286042235566, lng: -71.56740258509726 },
        { lat: -33.024367107968054, lng: -71.42779695016425 },
        // {lat: , lng:  },
        // {lat: , lng:  },
    ],
    options: {
        fillColor: "lightblue",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }
};

const HomeMap = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
        // libraries: ['places'],
    });

    // const [map, setMap] = useState(/** @type google.maps.Map */(null));
    

    if (!isLoaded) {
        return <Spinners />;
    }

    return (
        <>
            <GoogleMap
                center={markers[0].position}
                zoom={10}
                mapContainerStyle={{ width: '350px', height: '350px' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                
                <MarkerF position={markers[0].position}>
                    <InfoBoxF 
                        options={{
                            closeBoxURL : ""
                        }}
                    >
                        <div className='text-danger'>
                            IRU
                        </div>
                    </InfoBoxF>
                </MarkerF>
                {/* <PolygonF
                    paths={polygonData.paths}
                    options={polygonData.options}
                /> */}
            </GoogleMap>
        </>
    );
};
//
// const home = {
//     lat: -33.031800437223936,
//     lng: -71.42958891773964
// };

// const elSol = {
//     lat: -33.039337685520586,
//     lng: -71.42877616577614
// };
// const quilpue = {
//     lat: -33.045273489231235,
//     lng: -71.44465484286953
// };


// const HomeMap = () => {
//     const handleOnLoad = (map) => {
//         const bounds = new window.google.maps.LatLngBounds();
//         markers.forEach(({ position }) => bounds.extend(position));
//         map.fitBounds(bounds);
//     };

//     return (
//         <LoadScript
//             googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
//         >
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={zoom}
//                 onLoad={handleOnLoad}
//             >
//                 {markers.map(({ id, name, position }) => (
//                     <Marker
//                         key={id}
//                         position={position}
//                     />
//                 ))}
//             </GoogleMap>
//         </LoadScript>
//     );
// };
export default React.memo(HomeMap);
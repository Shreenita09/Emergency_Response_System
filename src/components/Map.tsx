import React from 'react';

interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: {
    position: { lat: number; lng: number };
    title: string;
    type: 'available' | 'assigned' | 'patient';
  }[];
}

// Import the map image
// const mapBackground = '/assets/delhi-map.png';
const mapBackground ='https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG'

const DELHI_CENTER = { lat: 28.6139, lng: 77.2090 };

const Map: React.FC<MapProps> = ({ 
  markers = []
}) => {
  // Convert lat/lng to relative positions on the map
  const getRelativePosition = (lat: number, lng: number) => {
    // Adjusted calculation for the specific Delhi map region shown in the image
    const mapBounds = {
      north: 28.6339, // Northernmost point in the map
      south: 28.5939, // Southernmost point
      east: 77.2290,  // Easternmost point
      west: 77.1890   // Westernmost point
    };

    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
    
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Map container with background image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#f3f4f6',
          backgroundImage: `url(${mapBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Map overlay for better contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Markers container */}
      <div className="absolute inset-0">
        {markers.map((marker, index) => {
          const pos = getRelativePosition(marker.position.lat, marker.position.lng);
          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              style={{ left: pos.x, top: pos.y }}
            >
              {/* Pulse animation for markers */}
              <div className={`absolute -inset-2 rounded-full animate-ping opacity-20 ${
                marker.type === 'available' ? 'bg-green-500' :
                marker.type === 'assigned' ? 'bg-blue-500' :
                'bg-red-500'
              }`} />
              
              {/* Marker dot */}
              <div className={`w-4 h-4 rounded-full shadow-lg relative ${
                marker.type === 'available' ? 'bg-green-500' :
                marker.type === 'assigned' ? 'bg-blue-500' :
                'bg-red-500'
              }`} />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white px-2 py-1 rounded shadow-lg text-sm">
                  <p className="font-medium">{marker.title}</p>
                  <p className="text-xs text-gray-600 capitalize">{marker.type}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-lg shadow-md">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Patient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map; 
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertCircle, Ambulance, Search, Filter, ChevronDown, ChevronUp, X, Star, Phone, Navigation2, User } from 'lucide-react';
import Map from '../components/Map';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
  image: string;
}

interface Emergency {
  id: number;
  patientId: string;
  location: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'En Route' | 'Completed';
  eta: string;
  assignedUnit?: string;
  distance?: string;
  hospitalEta?: string;
}

interface AmbulanceUnit {
  id: string;
  numberPlate: string;
  status: 'Active' | 'En Route' | 'Available' | 'Maintenance';
  location: string;
  currentEmergency?: string;
  distance?: string;
  eta?: string;
  driver?: Driver;
  type: 'Basic' | 'Advanced' | 'Cardiac';
  rating: number;
}

const drivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    rating: 4.8,
    totalRides: 1250,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvys-F2ZAa7lNKJnA5Edh_bv6ANZD_OH6tnw&s'
  },
  {
    id: 'DRV-002',
    name: 'Priya Singh',
    phone: '+91 98765 43211',
    rating: 4.9,
    totalRides: 980,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU82bviZopIkXw_yerK1ZLefagkOhWSsNOgQ&s'
  }
];

const emergencies: Emergency[] = [
  {
    id: 1,
    patientId: '#12345',
    location: 'Gandhi Nagar, Delhi',
    priority: 'Critical',
    status: 'Active',
    eta: '8 minutes',
    assignedUnit: 'AMB-102',
    distance: '2.5 km',
    hospitalEta: '15 minutes'
  },
  {
    id: 2,
    patientId: '#12346',
    location: 'Dilshad Garden, New Delhi',
    priority: 'High',
    status: 'En Route',
    eta: '12 minutes',
    assignedUnit: 'AMB-103',
    distance: '3.8 km',
    hospitalEta: '20 minutes'
  },
  {
    id: 3,
    patientId: '#12347',
    location: 'Vivek Vihar, New Delhi',
    priority: 'Medium',
    status: 'Active',
    eta: '15 minutes',
    distance: '4.2 km'
  }
];

const ambulanceUnits: AmbulanceUnit[] = [
  {
    id: 'AMB-102',
    numberPlate: 'DL 01 AB 1234',
    status: 'Active',
    location: 'En route to Gandhi Nagar',
    currentEmergency: '#12345',
    distance: '2.5 km',
    eta: '8 minutes',
    driver: drivers[0],
    type: 'Advanced',
    rating: 4.8
  },
  {
    id: 'AMB-103',
    numberPlate: 'KA 02 CD 5678',
    status: 'En Route',
    location: 'Heading to Rajaji Nagar',
    currentEmergency: '#12346',
    distance: '3.8 km',
    eta: '12 minutes',
    driver: drivers[1],
    type: 'Cardiac',
    rating: 4.9
  },
  {
    id: 'AMB-104',
    numberPlate: 'MH 03 EF 9012',
    status: 'Available',
    location: 'Stationed at Central Hospital',
    type: 'Basic',
    rating: 4.7
  },
  {
    id: 'AMB-105',
    numberPlate: 'DL 04 GH 3456',
    status: 'Maintenance',
    location: 'Central Depot',
    type: 'Advanced',
    rating: 4.6
  }
];

export default function Tracking() {
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<AmbulanceUnit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [nearbyAmbulances, setNearbyAmbulances] = useState<AmbulanceUnit[]>([]);

  const [stats, setStats] = useState({
    activeAmbulances: 12,
    avgResponseTime: 9.5,
    pendingEmergencies: 3,
    completedToday: 45
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        avgResponseTime: +(prev.avgResponseTime - 0.1).toFixed(1),
        completedToday: prev.completedToday + 1
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationSubmit = (address: string) => {
    // Simulate geocoding
    setUserLocation({
      latitude: 28.6139,
      longitude: 77.2090,
      address
    });
    setShowLocationModal(false);
    // Simulate finding nearby ambulances
    setNearbyAmbulances(ambulanceUnits.filter(unit => unit.status === 'Available'));
  };

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emergency.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority.length === 0 || filterPriority.includes(emergency.priority);
    return matchesSearch && matchesPriority;
  });

  const priorityColors = {
    Critical: 'bg-red-100 text-red-600',
    High: 'bg-orange-100 text-orange-600',
    Medium: 'bg-yellow-100 text-yellow-600',
    Low: 'bg-green-100 text-green-600'
  };

  const statusColors = {
    Active: 'bg-blue-100 text-blue-600',
    'En Route': 'bg-purple-100 text-purple-600',
    Available: 'bg-green-100 text-green-600',
    Maintenance: 'bg-gray-100 text-gray-600',
    Completed: 'bg-gray-100 text-gray-600'
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getMapMarkers = () => {
    const markers = [];

    // Add user location if available
    if (userLocation) {
      markers.push({
        position: { lat: userLocation.latitude, lng: userLocation.longitude },
        title: 'Your Location',
        type: 'patient' as const
      });
    }

    // Add ambulance markers
    ambulanceUnits.forEach(unit => {
      // Simulate random positions around Delhi for demo
      const randomLat = 28.6139 + (Math.random() - 0.5) * 0.1;
      const randomLng = 77.2090 + (Math.random() - 0.5) * 0.1;
      
      markers.push({
        position: { lat: randomLat, lng: randomLng },
        title: `${unit.id} - ${unit.type}`,
        type: unit.status === 'Available' ? 'available' as const : 'assigned' as const
      });
    });

    return markers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Live Ambulance Tracking</h1>

      {!userLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-lg">Share Your Location</h3>
              <p className="text-gray-600 mb-4">
                To find nearby available ambulances, we need your location
              </p>
              <button
                onClick={() => setShowLocationModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enter Location
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Live Map</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
              </button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {['Critical', 'High', 'Medium', 'Low'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFilterPriority(prev => 
                      prev.includes(priority) 
                        ? prev.filter(p => p !== priority)
                        : [...prev, priority]
                    )}
                    className={`px-3 py-1 rounded-full ${
                      filterPriority.includes(priority)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="aspect-video bg-gray-100 rounded-lg relative">
            <Map 
              markers={getMapMarkers()}
              center={{ lat: 28.6139, lng: 77.2090 }}
              zoom={13}
            />
            {userLocation && (
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow z-10">
                <p className="text-sm font-medium">Your Location</p>
                <p className="text-gray-600 text-sm">{userLocation.address}</p>
              </div>
            )}
            {selectedUnit && selectedUnit.status === 'En Route' && (
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow z-10">
                <div className="flex items-center space-x-2">
                  <Navigation2 className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{selectedUnit.eta} away</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          {selectedUnit ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">Ambulance Details</h2>
                <button
                  onClick={() => setSelectedUnit(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{selectedUnit.id}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedUnit.status]}`}>
                    {selectedUnit.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Number Plate</p>
                  <p className="font-medium">{selectedUnit.numberPlate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium">{selectedUnit.type} Life Support</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedUnit.rating)}
                    <span className="ml-2 text-sm text-gray-600">({selectedUnit.rating})</span>
                  </div>
                </div>
              </div>

              {selectedUnit.driver && (
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedUnit.driver.image}
                      alt={selectedUnit.driver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{selectedUnit.driver.name}</h3>
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedUnit.driver.rating)}
                      </div>
                      <p className="text-sm text-gray-600">{selectedUnit.driver.totalRides} rides</p>
                    </div>
                  </div>
                  <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Driver</span>
                  </button>
                </div>
              )}

              {selectedUnit.status === 'En Route' && (
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-medium">{selectedUnit.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ETA</p>
                      <p className="font-medium">{selectedUnit.eta}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-1/3 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Ambulance className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select an ambulance to view details</p>
            </div>
          )}
        </div>
      </div>

      {userLocation && nearbyAmbulances.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Ambulances Nearby</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyAmbulances.map((unit) => (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{unit.type} Ambulance</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${statusColors[unit.status]}`}>
                    {unit.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{unit.location}</p>
                <div className="flex items-center space-x-1">
                  {renderStars(unit.rating)}
                  <span className="ml-2 text-sm text-gray-600">({unit.rating})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Active Ambulances</h2>
          <div className="space-y-4">
            {ambulanceUnits.map((unit) => (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{unit.id}</h3>
                    <p className="text-sm text-gray-600">{unit.location}</p>
                    {unit.driver && (
                      <div className="flex items-center mt-1">
                        <User className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{unit.driver.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[unit.status]}`}>
                      {unit.status}
                    </span>
                    {unit.eta && (
                      <p className="text-sm text-gray-600 mt-1">ETA: {unit.eta}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Emergency Queue</h2>
          <div className="space-y-4">
            {filteredEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                onClick={() => setSelectedEmergency(emergency)}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Case {emergency.patientId}</h3>
                    <p className="text-sm text-gray-600">{emergency.location}</p>
                    {emergency.assignedUnit && (
                      <p className="text-sm text-blue-600 mt-1">
                        Assigned: {emergency.assignedUnit}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[emergency.priority]}`}>
                      {emergency.priority}
                    </span>
                    {emergency.eta && (
                      <p className="text-sm text-gray-600 mt-1">ETA: {emergency.eta}</p>
                    )}
                  </div>
                </div>
                {emergency.distance && emergency.hospitalEta && (
                  <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-medium">{emergency.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hospital ETA</p>
                      <p className="font-medium">{emergency.hospitalEta}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">System Status</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Active Ambulances</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.activeAmbulances}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Average Response Time</h3>
            <p className="text-2xl font-bold text-green-600">{stats.avgResponseTime} min</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Pending Emergencies</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.pendingEmergencies}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Completed Today</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.completedToday}</p>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Enter Your Location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter your address"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLocationSubmit("123 Gandhi Road, New Delhi")}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Location
                </button>
                <button
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Use Current Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
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
  lastMaintenance: string;
  fuelLevel: number;
}

const ambulanceFleet: AmbulanceUnit[] = [
  {
    id: 'AMB-102',
    numberPlate: 'DL 01 AB 1234',
    status: 'Active',
    location: 'Gandhi Nagar, Delhi',
    currentEmergency: '#12345',
    distance: '2.5 km',
    eta: '8 minutes',
    driver: {
      id: 'DRV-001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
      totalRides: 1250,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvys-F2ZAa7lNKJnA5Edh_bv6ANZD_OH6tnw&s'
    },
    type: 'Advanced',
    rating: 4.8,
    lastMaintenance: '2024-02-15',
    fuelLevel: 85
  },
];

// Sample data for ambulance locations
const ambulanceLocations = [
  { position: { lat: 28.6139, lng: 77.2090 }, title: 'Ambulance A1', type: 'available' as const },
  { position: { lat: 28.6229, lng: 77.2190 }, title: 'Ambulance A2', type: 'available' as const },
  { position: { lat: 28.6339, lng: 77.2290 }, title: 'Ambulance A3', type: 'assigned' as const },
  { position: { lat: 28.6189, lng: 77.2150 }, title: 'Emergency Case #12345', type: 'patient' as const },
];

export default function HospitalTracking() {
  const [selectedUnit, setSelectedUnit] = useState<AmbulanceUnit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    totalUnits: 45,
    activeUnits: 32,
    maintenanceRequired: 3,
    averageResponseTime: 8.5
  });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hospital Fleet Management</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New Unit
          </button>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Schedule Maintenance
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Live Fleet Map</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4 p-4 bg-white rounded-lg">
            <div className="flex flex-wrap gap-2">
              {['Active', 'En Route', 'Available', 'Maintenance'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(prev => 
                    prev.includes(status) 
                      ? prev.filter(s => s !== status)
                      : [...prev, status]
                  )}
                  className={`px-3 py-1 rounded-full ${
                    filterStatus.includes(status)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium">Available Units</span>
            </div>
            <p className="text-2xl font-bold text-green-600">2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="font-medium">Assigned Units</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-medium">Emergency Cases</span>
            </div>
            <p className="text-2xl font-bold text-red-600">1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="font-medium">Avg Response Time</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">8.5m</p>
          </div>
        </div>

        <div className="h-[500px] bg-white rounded-lg shadow-inner p-2">
          <Map 
            markers={ambulanceLocations}
            center={{ lat: 28.6139, lng: 77.2090 }}
            zoom={13}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Fleet</p>
              <p className="text-3xl font-bold">{stats.totalUnits}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Ambulance className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Units</p>
              <p className="text-3xl font-bold">{stats.activeUnits}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Navigation2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Maintenance Due</p>
              <p className="text-3xl font-bold">{stats.maintenanceRequired}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Avg Response Time</p>
              <p className="text-3xl font-bold">{stats.averageResponseTime}m</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Fleet Overview</h2>
          <div className="space-y-4">
            {ambulanceFleet.map((unit) => (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{unit.id}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    unit.status === 'Active' ? 'bg-green-100 text-green-600' :
                    unit.status === 'Maintenance' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {unit.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{unit.location}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fuel: {unit.fuelLevel}%</span>
                  {unit.currentEmergency && (
                    <span className="text-blue-600">Case: {unit.currentEmergency}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Unit Details</h2>
          {selectedUnit ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedUnit.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedUnit.status === 'Active' ? 'bg-green-100 text-green-600' :
                  selectedUnit.status === 'Maintenance' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {selectedUnit.status}
                </span>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600">Number Plate</p>
                <p className="font-medium">{selectedUnit.numberPlate}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600">Current Location</p>
                <p className="font-medium">{selectedUnit.location}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600">Fuel Level</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${selectedUnit.fuelLevel}%` }}
                  ></div>
                </div>
              </div>

              {selectedUnit.driver && (
                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">Driver</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedUnit.driver.image}
                      alt={selectedUnit.driver.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{selectedUnit.driver.name}</p>
                      <div className="flex items-center">
                        {renderStars(selectedUnit.driver.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-gray-600">Last Maintenance</p>
                <p className="font-medium">{selectedUnit.lastMaintenance}</p>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Track Unit
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Maintenance Log
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Ambulance className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a unit to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
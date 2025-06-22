import React, { useState } from 'react';
import { AlertCircle, Users, Activity, ClipboardList, UserCog, Bed, Stethoscope, UserPlus } from 'lucide-react';
import Map from '../components/Map';

// Sample data for ambulance locations
const ambulanceLocations = [
  { position: { lat: 28.6139, lng: 77.2090 }, title: 'Ambulance A1', type: 'available' as const },
  { position: { lat: 28.6229, lng: 77.2190 }, title: 'Ambulance A2', type: 'available' as const },
  { position: { lat: 28.6339, lng: 77.2290 }, title: 'Ambulance A3', type: 'assigned' as const },
  { position: { lat: 28.6189, lng: 77.2150 }, title: 'Emergency Case #12345', type: 'patient' as const },
];

export default function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Case Management System</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">New Case Registration</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Users className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Patient Information</h3>
                <p className="text-gray-600">Register new emergency cases</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Register New Case
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Priority Cases</h2>
          <div className="space-y-4">
            {['Critical', 'High', 'Medium'].map((priority) => (
              <div key={priority} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className={`w-5 h-5 ${
                      priority === 'Critical' ? 'text-red-600' :
                      priority === 'High' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`} />
                    <span className="font-medium">{priority} Priority</span>
                  </div>
                  <span className="text-sm text-gray-600">3 cases</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Case Analytics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <Activity className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-medium">Active Cases</h3>
            <p className="text-2xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="font-medium">Critical Cases</h3>
            <p className="text-2xl font-bold text-red-600">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <ClipboardList className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-medium">Resolved Today</h3>
            <p className="text-2xl font-bold text-green-600">18</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Emergency Unit Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <Stethoscope className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-medium">Available Doctors</h3>
            <p className="text-2xl font-bold text-purple-600">8</p>
            <button className="mt-2 text-sm text-purple-600 hover:underline">View Profiles</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <UserCog className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="font-medium">Staff On Duty</h3>
            <p className="text-2xl font-bold text-indigo-600">15</p>
            <span className="text-sm text-gray-600">Nurses & Support Staff</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <Bed className="w-6 h-6 text-teal-600 mb-2" />
            <h3 className="font-medium">Available Beds</h3>
            <p className="text-2xl font-bold text-teal-600">12</p>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">ICU: 3</span>
              <span className="text-gray-600">Regular: 9</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <UserPlus className="w-6 h-6 text-orange-600 mb-2" />
            <h3 className="font-medium">Current Patients</h3>
            <p className="text-2xl font-bold text-orange-600">32</p>
            <span className="text-sm text-gray-600">Emergency Unit Total</span>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">On-Call Medical Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Dr. Srinivas", specialty: "Emergency Medicine", status: "Available" },
              { name: "Dr. Santyajit Dutta", specialty: "Critical Care", status: "In Surgery" },
              { name: "Dr. Anuradha Ghosh", specialty: "Trauma", status: "Available" },
            ].map((doctor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    doctor.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">{doctor.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Cases</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Case #{i}</h3>
                  <p className="text-sm text-gray-600">Patient ID: #{1000 + i}</p>
                  <p className="text-sm text-gray-600">Status: In Progress</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  i === 1 ? 'bg-red-100 text-red-600' :
                  i === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {i === 1 ? 'Critical' : i === 2 ? 'High' : 'Medium'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
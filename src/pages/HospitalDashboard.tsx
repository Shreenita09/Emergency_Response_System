import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Ambulance, AlertCircle, MapPin, Clock, ChevronRight } from 'lucide-react';

export default function HospitalDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hospital Management Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-green-600 font-medium">System Online</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Cases</p>
              <p className="text-3xl font-bold">248</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-green-600">
              <span className="text-sm">+12% from last hour</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Available Ambulances</p>
              <p className="text-3xl font-bold">45</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Ambulance className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-red-600">
              <span className="text-sm">-3 units in maintenance</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Critical Cases</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-red-600">
              <span className="text-sm">4 requiring immediate attention</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Response Time</p>
              <p className="text-3xl font-bold">8.5m</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-green-600">
              <span className="text-sm">-1.2m from average</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/hospital/case-management"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Case Management</h3>
          <p className="text-gray-600">Manage and monitor all emergency cases</p>
        </Link>

        <Link
          to="/hospital/tracking"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Fleet Tracking</h3>
          <p className="text-gray-600">Track and manage ambulance fleet</p>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">System Health</h3>
          <p className="text-gray-600">All systems operational</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New emergency case assigned</p>
                  <p className="text-sm text-gray-500">Case #{1000 + i} - Critical condition</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{i}m ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
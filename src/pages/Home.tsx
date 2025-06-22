import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, Languages, MapPin, Volume as VolumeUp, AlertCircle, ArrowRight, Users, Activity, Heart, Building2 as Hospital, Ambulance, Stethoscope } from 'lucide-react';

function InterfaceCard({ title, description, image, buttonText, buttonLink, icon: Icon }: {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <div className="h-48 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ResQLink : AI-Powered Unified Emergency Response & Hospital Coordination System

            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Choose your interface below to access emergency healthcare services or manage hospital operations
            </p>
          </div>
        </div>
      </div>

      {/* Interface Selection */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          <InterfaceCard
            title="For Patients"
            description="Access emergency services, track ambulances, and get immediate medical assistance in your preferred language."
            image="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80"
            buttonText="Access Emergency Services"
            buttonLink="/emergency-response"
            icon={Heart}
          />
          <InterfaceCard
            title="For Hospitals"
            description="Manage emergency cases, track ambulance fleet, and coordinate emergency response operations."
            image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
            buttonText="Hospital Management"
            buttonLink="/hospital/dashboard"
            icon={Hospital}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Healthcare Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Emergency Response</h3>
            <p className="text-gray-600">Immediate assistance with multilingual support and real-time tracking.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
              <Ambulance className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fleet Management</h3>
            <p className="text-gray-600">Advanced tracking and coordination of emergency response vehicles.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medical Documentation</h3>
            <p className="text-gray-600">Automated documentation and case management system.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">10,000+</p>
              <p className="text-gray-600">Emergency Cases Handled</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Connected Ambulances</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600">Partner Hospitals</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">9.5/10</p>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your interface and access our emergency healthcare services now.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              to="/emergency-response"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Patient Access
            </Link>
            <Link
              to="/hospital/dashboard"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Hospital Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
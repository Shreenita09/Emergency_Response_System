import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, FileText, Languages, MapPin, Volume as VolumeUp, AlertCircle, Menu, X, Building2 as Hospital, Ambulance } from 'lucide-react';

const userNavItems = [
  { path: '/emergency-response', icon: Phone, label: 'Emergency Response' },
  { path: '/documentation', icon: FileText, label: 'Documentation' },
  { path: '/translation', icon: Languages, label: 'Translation' },
  { path: '/tracking', icon: MapPin, label: 'Track Ambulance' },
  { path: '/voice-assistance', icon: VolumeUp, label: 'Voice Assistance' },
];

const hospitalNavItems = [
  { path: '/hospital/dashboard', icon: Hospital, label: 'Dashboard' },
  { path: '/hospital/case-management', icon: AlertCircle, label: 'Case Management' },
  { path: '/hospital/tracking', icon: Ambulance, label: 'Fleet Tracking' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isHospitalSection = location.pathname.startsWith('/hospital');
  const navItems = isHospitalSection ? hospitalNavItems : userNavItems;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold">ResQLink</Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md mb-1 ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Healthcare Emergency Response System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
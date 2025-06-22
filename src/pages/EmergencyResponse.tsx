import React, { useState } from 'react';
import { Phone, MessageSquare, Volume2, AlertCircle, MapPin, X, Loader2 } from 'lucide-react';

interface EmergencyContact {
  title: string;
  number: string;
  description: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    title: 'Ambulance Services',
    number: '108',
    description: '24/7 Emergency Medical Services'
  },
  {
    title: 'Police Emergency',
    number: '100',
    description: 'Law Enforcement Emergency Response'
  },
  {
    title: 'Fire Emergency',
    number: '101',
    description: 'Fire and Rescue Services'
  }
];

export default function EmergencyResponse() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);

  const handleEmergencyCall = () => {
    setShowCallModal(true);
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => setIsConnecting(false), 2000);
  };

  const handleWhatsAppEmergency = () => {
    setShowWhatsAppModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Emergency Response System</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
          <h2 className="text-2xl font-semibold mb-4">Voice Emergency Call</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Supported Languages</h3>
                <p className="text-gray-600">Hindi, Bengali, Tamil, Telugu, Marathi, and more</p>
              </div>
            </div>
            <button 
              onClick={handleEmergencyCall}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Start Emergency Call</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
          <h2 className="text-2xl font-semibold mb-4">WhatsApp Emergency</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MessageSquare className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Quick Access</h3>
                <p className="text-gray-600">Send location and emergency details via WhatsApp</p>
              </div>
            </div>
            <button 
              onClick={handleWhatsAppEmergency}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Open WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Emergency Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <Volume2 className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Voice Guidance</h3>
                <p className="text-gray-600">
                  Receive real-time first-aid instructions in your preferred language
                  while help is on the way.
                </p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Priority System</h3>
                <p className="text-gray-600">
                  AI-powered emergency categorization ensures critical cases receive
                  immediate attention.
                </p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div 
              key={contact.title}
              onClick={() => setSelectedContact(contact)}
              className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <h3 className="font-medium">{contact.title}</h3>
              <p className="text-xl font-bold text-blue-600">{contact.number}</p>
              <p className="text-sm text-gray-600">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Emergency Call</h3>
              <button 
                onClick={() => setShowCallModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {isConnecting ? (
                <div className="text-center py-8">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Connecting to emergency services...</p>
                </div>
              ) : (
                <>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">Connected to Emergency Services</p>
                    <p className="text-sm text-green-600">Operator is ready to assist you</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Please provide:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Your current location</li>
                      <li>Nature of emergency</li>
                      <li>Number of people affected</li>
                      <li>Any immediate dangers</li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Volume2 className="w-12 h-12 text-blue-600 animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Speak clearly in your preferred language
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-600">WhatsApp Emergency</h3>
              <button 
                onClick={() => setShowWhatsAppModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-red-600" />
                <p className="text-gray-600">Sharing your current location...</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Emergency Details Form:</p>
                <textarea 
                  className="w-full border rounded-lg p-3 h-32"
                  placeholder="Describe the emergency situation..."
                />
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Send Emergency Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedContact.title}</h3>
              <button 
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{selectedContact.number}</p>
                <p className="text-gray-600">{selectedContact.description}</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedContact(null);
                  handleEmergencyCall();
                }}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
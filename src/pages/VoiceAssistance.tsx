import React, { useState } from 'react';
import { Volume2, Heart, Stethoscope, BookOpen, X, Play, Pause } from 'lucide-react';

interface Instruction {
  title: string;
  content: string;
  audioUrl: string;
}

const instructions: Instruction[] = [
  {
    title: 'CPR Procedure',
    content: 'Place hands in the center of the chest. Push hard and fast at a rate of 100-120 compressions per minute. Allow chest to fully recoil between compressions.',
    audioUrl: 'https://example.com/cpr-audio.mp3'
  },
  {
    title: 'Bleeding Control',
    content: 'Apply direct pressure to the wound using a clean cloth or sterile gauze. Maintain pressure for at least 15 minutes. If blood soaks through, add more layers without removing the original dressing.',
    audioUrl: 'https://example.com/bleeding-audio.mp3'
  },
  {
    title: 'Burn Treatment',
    content: 'Cool the burn under cool (not cold) running water for at least 10 minutes. Cover with a sterile gauze bandage. Do not apply ice, butter, or ointments.',
    audioUrl: 'https://example.com/burn-audio.mp3'
  },
  {
    title: 'Choking Response',
    content: 'Stand behind the person and perform the Heimlich maneuver by giving quick, upward thrusts to their upper abdomen. Continue until the object is expelled.',
    audioUrl: 'https://example.com/choking-audio.mp3'
  },
  {
    title: 'Fracture Care',
    content: 'Immobilize the injured area. Apply ice to reduce swelling. Do not attempt to realign the bone. Seek immediate medical attention.',
    audioUrl: 'https://example.com/fracture-audio.mp3'
  },
  {
    title: 'Seizure Management',
    content: 'Clear the area of hazards. Time the seizure. Do not restrain the person or put anything in their mouth. Turn them on their side if possible.',
    audioUrl: 'https://example.com/seizure-audio.mp3'
  }
];

interface MedicalCategory {
  title: string;
  content: string;
}

const medicalCategories: MedicalCategory[] = [
  {
    title: 'Common Medications',
    content: 'Information about frequently prescribed medications, dosages, and potential side effects.'
  },
  {
    title: 'Disease Information',
    content: 'Comprehensive database of common diseases, symptoms, and treatment options.'
  },
  {
    title: 'Preventive Care',
    content: 'Guidelines for maintaining good health and preventing common illnesses.'
  },
  {
    title: 'Emergency Procedures',
    content: 'Step-by-step guides for handling various medical emergencies.'
  }
];

export default function VoiceAssistance() {
  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MedicalCategory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handlePlayInstructions = (instruction: Instruction) => {
    setSelectedInstruction(instruction);
    setIsPlaying(true);
    // Simulate audio playing
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Voice Assistance System</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">First Aid Instructions</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Heart className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-medium">Emergency First Aid</h3>
                <p className="text-gray-600">Get voice guidance for immediate medical assistance</p>
              </div>
            </div>
            <button 
              onClick={() => setShowEmergencyModal(true)}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Start Emergency Guidance
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Medical Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Stethoscope className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Health Information</h3>
                <p className="text-gray-600">Access medical knowledge and treatment details</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCategory(medicalCategories[0])}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Medical Info
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Available Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {instructions.map((instruction) => (
            <div key={instruction.title} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <Volume2 className="w-6 h-6 text-blue-600" />
              <div className="flex-grow">
                <h3 className="font-medium">{instruction.title}</h3>
                <button 
                  onClick={() => handlePlayInstructions(instruction)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  {isPlaying && selectedInstruction?.title === instruction.title ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Play Instructions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Medical Library</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium">Voice-Assisted Medical Guide</h3>
              <p className="text-gray-600">
                Browse through our comprehensive medical library with voice commands
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(category)}
                className="p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium">{category.title}</h4>
                <p className="text-sm text-gray-600">Click to explore</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instruction Modal */}
      {selectedInstruction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedInstruction.title}</h3>
              <button 
                onClick={() => setSelectedInstruction(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedInstruction.content}</p>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Play Audio</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedCategory.title}</h3>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedCategory.content}</p>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Emergency Guidance</h3>
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Voice guidance is now active. Please speak clearly and follow the instructions:
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>State the nature of the emergency</li>
                <li>Describe the patient's condition</li>
                <li>Provide your location</li>
                <li>Follow the automated instructions</li>
              </ol>
              <div className="flex justify-center">
                <Volume2 className="w-12 h-12 text-red-600 animate-pulse" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Listening for your voice input...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
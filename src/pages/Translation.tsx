import React, { useState } from 'react';
import { Languages, Mic, Volume2, History } from 'lucide-react';

const supportedLanguages = [
  'Hindi',
  'Bengali',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'English'
];

export default function Translation() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Hindi');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Language Translation System</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Real-time Translation</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Language
                </label>
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Language
                </label>
                <select
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Mic className="w-5 h-5 mr-2" />
              Start Translation
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Translation Output</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg min-h-[150px] bg-gray-50">
              <p className="text-gray-500 italic">Translated text will appear here...</p>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
              <Volume2 className="w-5 h-5 mr-2" />
              Play Translation
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Translation Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <Languages className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium">Multi-language Support</h3>
              <p className="text-gray-600">
                Supports translation between multiple Indian languages and English
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <History className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium">Translation History</h3>
              <p className="text-gray-600">
                Access previous translations for quick reference
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Translations</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">English → Hindi</p>
                  <p className="text-sm text-gray-600">Translation #{i}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
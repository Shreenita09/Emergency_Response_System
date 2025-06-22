import React, { useState } from 'react';
import { FileText, Mic, ClipboardCheck, FileSearch, X, Play, Pause, Save, Languages, AlertCircle } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface FormData {
  patientName: string;
  age: string;
  gender: string;
  symptoms: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
}

const supportedLanguages = [
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'en', name: 'English' }
];

const recentDocuments: Document[] = [
  {
    id: 1,
    title: 'Patient Record #1',
    date: 'March 1, 2024',
    content: 'Patient presented with severe chest pain and shortness of breath...'
  },
  {
    id: 2,
    title: 'Patient Record #2',
    date: 'March 2, 2024',
    content: 'Follow-up examination for diabetes management...'
  },
  {
    id: 3,
    title: 'Patient Record #3',
    date: 'March 3, 2024',
    content: 'Routine vaccination and general health checkup...'
  }
];

const requiredFields = [
  "Patient's full name",
  "Age",
  "Gender",
  "Current symptoms",
  "Duration of symptoms",
  "Medical history",
  "Current medications",
  "Allergies (if any)"
];

export default function Documentation() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [transcribedText, setTranscribedText] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [generatedForm, setGeneratedForm] = useState<FormData | null>(null);
  const [showFormPreview, setShowFormPreview] = useState(false);

  const handleStartRecording = () => {
    setShowInstructionsModal(true);
  };

  const startActualRecording = () => {
    setIsRecording(true);
    setShowInstructionsModal(false);
    // Simulate transcription after 3 seconds
    setTimeout(() => {
      const sampleTranscription = `
Patient Name: Raj Sharma
Age: 45 years
Gender: Male
Symptoms: Severe headache and dizziness
Duration: Started 2 days ago
Medical History: Hypertension
Current Medications: Lisinopril 10mg daily
Allergies: Penicillin
Additional Notes: Patient reports the headache is worse in the morning and improves throughout the day.
`;
      setTranscribedText(sampleTranscription);
      generateFormData(sampleTranscription);
      setIsRecording(false);
    }, 3000);
  };

  const generateFormData = (text: string) => {
    // Simulate form data extraction from transcribed text
    const formData: FormData = {
      patientName: "Raj Sharma",
      age: "45",
      gender: "Male",
      symptoms: "Severe headache and dizziness",
      medicalHistory: "Hypertension",
      currentMedications: "Lisinopril 10mg daily",
      allergies: "Penicillin"
    };
    setGeneratedForm(formData);
  };

  const handleSaveDocument = () => {
    setShowSaveModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Automated Documentation System</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Voice Recording</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Languages className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Select Language</h3>
                <select
                  className="mt-2 w-full border rounded-lg p-2"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleStartRecording}
              className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2`}
              disabled={isRecording}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
              <span>{isRecording ? 'Recording...' : 'Start Voice Recording'}</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Generated Documentation</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Structured Documentation</h3>
                <p className="text-gray-600">Auto-generated from voice input</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg min-h-[200px] bg-gray-50 whitespace-pre-line">
              {transcribedText ? (
                <p className="text-gray-800">{transcribedText}</p>
              ) : (
                <p className="text-gray-500 italic">Transcribed and structured text will appear here...</p>
              )}
            </div>
            {transcribedText && (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSaveDocument}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Document</span>
                </button>
                <button 
                  onClick={() => setShowFormPreview(true)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>View Generated Form</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-6">Documentation Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <ClipboardCheck className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Automated Forms</h3>
                <p className="text-gray-600">
                  AI automatically fills standard medical forms based on voice input
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <FileSearch className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Smart Search</h3>
                <p className="text-gray-600">
                  Quickly search through patient records using natural language
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
        <div className="space-y-4">
          {recentDocuments.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-gray-600">Created: {doc.date}</p>
                </div>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recording Instructions</h3>
              <button 
                onClick={() => setShowInstructionsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
                <p className="text-gray-600">
                  Please include the following information in your recording:
                </p>
              </div>
              <ul className="space-y-2">
                {requiredFields.map((field, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>{field}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button
                  onClick={startActualRecording}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Recording
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Preview Modal */}
      {showFormPreview && generatedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Generated Medical Form</h3>
              <button 
                onClick={() => setShowFormPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    value={generatedForm.patientName}
                    className="w-full border rounded-lg p-2"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="text"
                    value={generatedForm.age}
                    className="w-full border rounded-lg p-2"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    value={generatedForm.gender}
                    className="w-full border rounded-lg p-2"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Allergies</label>
                  <input
                    type="text"
                    value={generatedForm.allergies}
                    className="w-full border rounded-lg p-2"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <textarea
                  value={generatedForm.symptoms}
                  className="w-full border rounded-lg p-2 h-20"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Medical History</label>
                <textarea
                  value={generatedForm.medicalHistory}
                  className="w-full border rounded-lg p-2 h-20"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                <textarea
                  value={generatedForm.currentMedications}
                  className="w-full border rounded-lg p-2 h-20"
                  readOnly
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <button
                  onClick={() => setShowFormPreview(false)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Form
                </button>
                <button
                  onClick={() => setShowFormPreview(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Edit Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Save Document</h3>
              <button 
                onClick={() => setShowSaveModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Title
                </label>
                <input 
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>General Consultation</option>
                  <option>Emergency Report</option>
                  <option>Follow-up Visit</option>
                  <option>Lab Results</option>
                </select>
              </div>
              <button 
                onClick={() => {
                  setShowSaveModal(false);
                  setTranscribedText('');
                  setGeneratedForm(null);
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Save Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useState, useRef, useEffect } from 'react';
// import { FileText, Mic, ClipboardCheck, FileSearch, X, Play, Pause, Save, Languages, AlertCircle } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// interface Document {
//   id: number;
//   title: string;
//   date: string;
//   content: string;
// }

// interface FormData {
//   patientName: string;
//   age: string;
//   gender: string;
//   symptoms: string;
//   medicalHistory: string;
//   currentMedications: string;
//   allergies: string;
// }

// const supportedLanguages = [
//   { code: 'hi', name: 'Hindi' },
//   { code: 'bn', name: 'Bengali' },
//   { code: 'ta', name: 'Tamil' },
//   { code: 'te', name: 'Telugu' },
//   { code: 'mr', name: 'Marathi' },
//   { code: 'gu', name: 'Gujarati' },
//   { code: 'kn', name: 'Kannada' },
//   { code: 'ml', name: 'Malayalam' },
//   { code: 'en', name: 'English' }
// ];

// const recentDocuments: Document[] = [
//   {
//     id: 1,
//     title: 'Patient Record #1',
//     date: 'March 1, 2024',
//     content: 'Patient presented with severe chest pain and shortness of breath...'
//   },
//   {
//     id: 2,
//     title: 'Patient Record #2',
//     date: 'March 2, 2024',
//     content: 'Follow-up examination for diabetes management...'
//   },
//   {
//     id: 3,
//     title: 'Patient Record #3',
//     date: 'March 3, 2024',
//     content: 'Routine vaccination and general health checkup...'
//   }
// ];

// const requiredFields = [
//   "Patient's full name",
//   "Age",
//   "Gender",
//   "Current symptoms",
//   "Duration of symptoms",
//   "Medical history",
//   "Current medications",
//   "Allergies (if any)"
// ];

// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI('AIzaSyCiKHerufVsWA2UFOCteWnU94Vtf_exzeo'); // Replace with your API key

// export default function Documentation() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [transcribedText, setTranscribedText] = useState('');
//   const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
//   const [showSaveModal, setShowSaveModal] = useState(false);
//   const [showInstructionsModal, setShowInstructionsModal] = useState(false);
//   const [generatedForm, setGeneratedForm] = useState<FormData | null>(null);
//   const [showFormPreview, setShowFormPreview] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const mediaRecorder = useRef<MediaRecorder | null>(null);
//   const audioChunks = useRef<Blob[]>([]);

//   // Speech recognition setup
//   const recognition = useRef<SpeechRecognition | null>(null);
//   useEffect(() => {
//     if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
//       recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       recognition.current.continuous = true;
//       recognition.current.interimResults = true;
//       recognition.current.lang = selectedLanguage;

//       recognition.current.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map(result => result[0].transcript)
//           .join('');
//         setTranscribedText(transcript);
//       };
//     }
//   }, [selectedLanguage]);

//   const processWithGemini = async (text: string) => {
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
//       const prompt = `
//         Act as a medical professional and analyze the following patient information.
//         identify the language they are speaking in and transcribe the text in english.
//         Create a structured medical document with the following sections:
//         1. Patient Information
//         2. Symptoms and Duration
//         3. Medical History
//         4. Current Medications
//         5. Allergies
//         6. Assessment
//         7. Recommendations

//         Here's the patient information:
//         ${text}

//         Format the response in a clear, professional medical document style.
//         Include any missing critical information that should be followed up on.
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const structuredText = response.text();
//       setTranscribedText(structuredText);
//       generateFormData(structuredText);
//     } catch (error) {
//       console.error('Error processing with Gemini:', error);
//     }
//   };

//   const handleStartRecording = () => {
//     setShowInstructionsModal(true);
//   };

//   const startActualRecording = async () => {
//     try {
//       setIsRecording(true);
//       setShowInstructionsModal(false);
      
//       if (recognition.current) {
//         recognition.current.start();
//       }
//     } catch (err) {
//       console.error('Error starting recording:', err);
//       setIsRecording(false);
//     }
//   };

//   const stopRecording = async () => {
//     if (recognition.current) {
//       recognition.current.stop();
//     }
//     setIsRecording(false);
    
//     // Process the transcribed text with Gemini
//     if (transcribedText) {
//       await processWithGemini(transcribedText);
//     }
//   };

//   const generateFormData = (text: string) => {
//     // Extract information using regex or simple string matching
//     const nameMatch = text.match(/Patient(?:'s)? Name:?\s*([^\n]+)/i);
//     const ageMatch = text.match(/Age:?\s*(\d+)/i);
//     const genderMatch = text.match(/Gender:?\s*([^\n]+)/i);
//     const symptomsMatch = text.match(/Symptoms:?\s*([^\n]+)/i);
//     const historyMatch = text.match(/Medical History:?\s*([^\n]+)/i);
//     const medicationsMatch = text.match(/Current Medications:?\s*([^\n]+)/i);
//     const allergiesMatch = text.match(/Allergies:?\s*([^\n]+)/i);

//     const formData: FormData = {
//       patientName: nameMatch?.[1] || '',
//       age: ageMatch?.[1] || '',
//       gender: genderMatch?.[1] || '',
//       symptoms: symptomsMatch?.[1] || '',
//       medicalHistory: historyMatch?.[1] || '',
//       currentMedications: medicationsMatch?.[1] || '',
//       allergies: allergiesMatch?.[1] || ''
//     };

//     setGeneratedForm(formData);
//   };

//   const handleSaveDocument = () => {
//     setShowSaveModal(true);
//   };

//   const handleFormEdit = () => {
//     setIsEditing(true);
//   };

//   const handleFormSave = () => {
//     setIsEditing(false);
//     // Here you would typically save the form data to your backend
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Automated Documentation System</h1>

//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Voice Recording</h2>
//           <div className="space-y-4">
//             <div className="flex items-start space-x-4">
//               <Languages className="w-6 h-6 text-blue-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Select Language</h3>
//                 <select
//                   className="mt-2 w-full border rounded-lg p-2"
//                   value={selectedLanguage}
//                   onChange={(e) => setSelectedLanguage(e.target.value)}
//                 >
//                   {supportedLanguages.map((lang) => (
//                     <option key={lang.code} value={lang.code}>
//                       {lang.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <button 
//               onClick={isRecording ? stopRecording : handleStartRecording}
//               className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2`}
//             >
//               <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
//               <span>{isRecording ? 'Stop Recording' : 'Start Voice Recording'}</span>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Generated Documentation</h2>
//           <div className="space-y-4">
//             <div className="flex items-start space-x-4">
//               <FileText className="w-6 h-6 text-blue-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Structured Documentation</h3>
//                 <p className="text-gray-600">Auto-generated from voice input</p>
//               </div>
//             </div>
//             <div className="border p-4 rounded-lg min-h-[200px] bg-gray-50 whitespace-pre-line">
//               {transcribedText ? (
//                 <p className="text-gray-800">{transcribedText}</p>
//               ) : (
//                 <p className="text-gray-500 italic">Transcribed and structured text will appear here...</p>
//               )}
//             </div>
//             {transcribedText && (
//               <div className="flex space-x-2">
//                 <button 
//                   onClick={handleSaveDocument}
//                   className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
//                 >
//                   <Save className="w-5 h-5" />
//                   <span>Save Document</span>
//                 </button>
//                 <button 
//                   onClick={() => setShowFormPreview(true)}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//                 >
//                   <ClipboardCheck className="w-5 h-5" />
//                   <span>View Generated Form</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-50 p-8 rounded-lg mb-12">
//         <h2 className="text-2xl font-semibold mb-6">Documentation Features</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex items-start space-x-4">
//               <ClipboardCheck className="w-6 h-6 text-blue-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Automated Forms</h3>
//                 <p className="text-gray-600">
//                   AI automatically fills standard medical forms based on voice input
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
//             <div className="flex items-start space-x-4">
//               <FileSearch className="w-6 h-6 text-blue-600 mt-1" />
//               <div>
//                 <h3 className="font-medium">Smart Search</h3>
//                 <p className="text-gray-600">
//                   Quickly search through patient records using natural language
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Recent Documents</h2>
//         <div className="space-y-4">
//           {recentDocuments.map((doc) => (
//             <div 
//               key={doc.id}
//               onClick={() => setSelectedDocument(doc)}
//               className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-medium">{doc.title}</h3>
//                   <p className="text-sm text-gray-600">Created: {doc.date}</p>
//                 </div>
//                 <FileText className="w-5 h-5 text-blue-600" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Instructions Modal */}
//       {showInstructionsModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-lg w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Recording Instructions</h3>
//               <button 
//                 onClick={() => setShowInstructionsModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-2">
//                 <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
//                 <p className="text-gray-600">
//                   Please include the following information in your recording:
//                 </p>
//               </div>
//               <ul className="space-y-2">
//                 {requiredFields.map((field, index) => (
//                   <li key={index} className="flex items-center space-x-2">
//                     <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//                     <span>{field}</span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="pt-4">
//                 <button
//                   onClick={startActualRecording}
//                   className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                 >
//                   Start Recording
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Form Preview Modal */}
//       {showFormPreview && generatedForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Generated Medical Form</h3>
//               <button 
//                 onClick={() => {
//                   setShowFormPreview(false);
//                   setIsEditing(false);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Patient Name</label>
//                   <input
//                     type="text"
//                     value={generatedForm.patientName}
//                     onChange={(e) => setGeneratedForm({...generatedForm, patientName: e.target.value})}
//                     className={`w-full border rounded-lg p-2 ${isEditing ? '' : 'bg-gray-50'}`}
//                     readOnly={!isEditing}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Age</label>
//                   <input
//                     type="text"
//                     value={generatedForm.age}
//                     onChange={(e) => setGeneratedForm({...generatedForm, age: e.target.value})}
//                     className={`w-full border rounded-lg p-2 ${isEditing ? '' : 'bg-gray-50'}`}
//                     readOnly={!isEditing}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Gender</label>
//                   <input
//                     type="text"
//                     value={generatedForm.gender}
//                     onChange={(e) => setGeneratedForm({...generatedForm, gender: e.target.value})}
//                     className={`w-full border rounded-lg p-2 ${isEditing ? '' : 'bg-gray-50'}`}
//                     readOnly={!isEditing}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Allergies</label>
//                   <input
//                     type="text"
//                     value={generatedForm.allergies}
//                     onChange={(e) => setGeneratedForm({...generatedForm, allergies: e.target.value})}
//                     className={`w-full border rounded-lg p-2 ${isEditing ? '' : 'bg-gray-50'}`}
//                     readOnly={!isEditing}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Symptoms</label>
//                 <textarea
//                   value={generatedForm.symptoms}
//                   onChange={(e) => setGeneratedForm({...generatedForm, symptoms: e.target.value})}
//                   className={`w-full border rounded-lg p-2 h-20 ${isEditing ? '' : 'bg-gray-50'}`}
//                   readOnly={!isEditing}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Medical History</label>
//                 <textarea
//                   value={generatedForm.medicalHistory}
//                   onChange={(e) => setGeneratedForm({...generatedForm, medicalHistory: e.target.value})}
//                   className={`w-full border rounded-lg p-2 h-20 ${isEditing ? '' : 'bg-gray-50'}`}
//                   readOnly={!isEditing}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Current Medications</label>
//                 <textarea
//                   value={generatedForm.currentMedications}
//                   onChange={(e) => setGeneratedForm({...generatedForm, currentMedications: e.target.value})}
//                   className={`w-full border rounded-lg p-2 h-20 ${isEditing ? '' : 'bg-gray-50'}`}
//                   readOnly={!isEditing}
//                 />
//               </div>
//               <div className="flex space-x-2 pt-4">
//                 {isEditing ? (
//                   <>
//                     <button
//                       onClick={handleFormSave}
//                       className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={() => setIsEditing(false)}
//                       className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={handleFormEdit}
//                       className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                     >
//                       Edit Form
//                     </button>
//                     <button
//                       onClick={() => setShowFormPreview(false)}
//                       className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                     >
//                       Close
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Save Modal */}
//       {showSaveModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-lg w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Save Document</h3>
//               <button 
//                 onClick={() => setShowSaveModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Document Title
//                 </label>
//                 <input 
//                   type="text"
//                   className="w-full border rounded-lg p-2"
//                   placeholder="Enter document title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select className="w-full border rounded-lg p-2">
//                   <option>General Consultation</option>
//                   <option>Emergency Report</option>
//                   <option>Follow-up Visit</option>
//                   <option>Lab Results</option>
//                 </select>
//               </div>
//               <button 
//                 onClick={() => {
//                   setShowSaveModal(false);
//                   setTranscribedText('');
//                   setGeneratedForm(null);
//                 }}
//                 className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//               >
//                 Save Document
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useCallback } from 'react';
import { XIcon } from './icons/XIcon';

interface CreateWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateWebsiteModal: React.FC<CreateWebsiteModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onCreate(name, description);
      setName('');
      setDescription('');
    }
  }, [name, description, onCreate]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-all duration-300 scale-95 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Create a New Website</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="website-name" className="block text-sm font-medium text-gray-300 mb-2">
              Website Name
            </label>
            <input
              type="text"
              id="website-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="e.g., My Personal Portfolio"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="website-description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="website-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="A brief description of your new website."
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim() || !description.trim()}
            >
              Create Website
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: scale(.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreateWebsiteModal;
   
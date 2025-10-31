
import React from 'react';
import { IWebsite } from '../types';

interface WebsiteCardProps {
  website: IWebsite;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50 flex flex-col">
      <img
        src={website.imageUrl}
        alt={website.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{website.name}</h3>
        <p className="text-gray-400 text-sm flex-grow mb-4">{website.description}</p>
        <div className="mt-auto pt-4 border-t border-gray-700">
             <p className="text-xs text-gray-500">
                Created on: {website.createdAt.toLocaleDateString()}
             </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;
   
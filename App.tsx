import React, { useState, useCallback } from 'react';
import { IWebsite, WebsiteCategory } from './types';
import WebsiteCard from './components/WebsiteCard';
import { PlusIcon } from './components/icons/PlusIcon';
import CreateWebsiteModal from './components/CreateWebsiteModal';

const categories: WebsiteCategory[] = ['노래', '아이돌', '사진', '운동'];

const initialWebsites: IWebsite[] = [
  {
    id: 1,
    name: 'K-Pop Stan Central',
    description: 'The ultimate hub for all things K-Pop. News, profiles, and music videos.',
    imageUrl: 'https://picsum.photos/seed/idol/600/400',
    createdAt: new Date('2023-10-26'),
    category: '아이돌',
  },
  {
    id: 2,
    name: 'Acoustic Covers',
    description: 'My collection of acoustic guitar covers of popular songs. Sheet music included.',
    imageUrl: 'https://picsum.photos/seed/song/600/400',
    createdAt: new Date('2023-11-15'),
    category: '노래',
  },
  {
    id: 3,
    name: 'Fitness Journey',
    description: 'Tracking my progress, sharing workout routines and healthy meal plans.',
    imageUrl: 'https://picsum.photos/seed/fitness/600/400',
    createdAt: new Date('2024-01-20'),
    category: '운동',
  },
  {
    id: 4,
    name: 'Urban Photography',
    description: 'Capturing the beauty of cityscapes and street life through my lens.',
    imageUrl: 'https://picsum.photos/seed/photo/600/400',
    createdAt: new Date('2024-02-18'),
    category: '사진',
  },
];


const App: React.FC = () => {
  const [websites, setWebsites] = useState<IWebsite[]>(initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<WebsiteCategory | 'All'>('All');

  const handleCreateWebsite = useCallback((name: string, description: string) => {
    const newWebsite: IWebsite = {
      id: Date.now(),
      name,
      description,
      imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
      createdAt: new Date(),
      category: '노래', // Default category for new websites
    };
    setWebsites(prevWebsites => [newWebsite, ...prevWebsites]);
    setIsModalOpen(false);
  }, []);

  const filteredWebsites = websites.filter(website =>
    activeCategory === 'All' || website.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <header className="bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">
            My <span className="text-cyan-400">Websites</span>
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            New Site
          </button>
        </div>
        <nav className="container mx-auto px-6 border-t border-gray-700">
            <ul className="flex items-center gap-x-8 text-sm font-medium text-gray-400">
                <li>
                    <button 
                        onClick={() => setActiveCategory('All')}
                        className={`py-3 transition-colors duration-200 ${
                            activeCategory === 'All' 
                            ? 'text-cyan-400 border-b-2 border-cyan-400' 
                            : 'hover:text-cyan-400'
                        }`}
                        aria-current={activeCategory === 'All' ? 'page' : undefined}
                    >
                        All
                    </button>
                </li>
                {categories.map(category => (
                    <li key={category}>
                        <button 
                            onClick={() => setActiveCategory(category)}
                            className={`py-3 transition-colors duration-200 ${
                                activeCategory === category 
                                ? 'text-cyan-400 border-b-2 border-cyan-400' 
                                : 'hover:text-cyan-400'
                            }`}
                            aria-current={activeCategory === category ? 'page' : undefined}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-10 flex-grow">
        {filteredWebsites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredWebsites.map(website => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold text-gray-400 mb-4">No Websites in This Category</h2>
            <p className="text-gray-500 mb-6">Try selecting a different category or create a new site.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 mx-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5" />
              Create a New Website
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} h.s3hu. All Rights Reserved.</p>
          <p className="mt-2">학교 주소 : 경기 분당구 하오개로 351번길</p>
        </div>
      </footer>

      <CreateWebsiteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateWebsite}
      />
    </div>
  );
};

export default App;
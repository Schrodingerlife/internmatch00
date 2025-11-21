
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import VacancyCard from './components/VacancyCard';
import VacancyDetail from './components/VacancyDetail';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import HomeProfile from './components/HomeProfile';
import SwipeDeck from './components/SwipeDeck';
import { Home, User, BarChart2, Bookmark, Layers, Trash2 } from 'lucide-react';
import { MOCK_VACANCIES, MOCK_USER } from './constants';
import { Vacancy, AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES);

  // Persistent State
  const [savedVacancyIds, setSavedVacancyIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedVacancyIds');
    return saved ? JSON.parse(saved) : [];
  });

  const [rejectedVacancyIds, setRejectedVacancyIds] = useState<string[]>(() => {
    const rejected = localStorage.getItem('rejectedVacancyIds');
    return rejected ? JSON.parse(rejected) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedVacancyIds', JSON.stringify(savedVacancyIds));
  }, [savedVacancyIds]);

  useEffect(() => {
    localStorage.setItem('rejectedVacancyIds', JSON.stringify(rejectedVacancyIds));
  }, [rejectedVacancyIds]);

  // Filter vacancies to exclude rejected ones for the match view
  const availableVacancies = useMemo(() => {
    return vacancies.filter(v => !rejectedVacancyIds.includes(v.id));
  }, [vacancies, rejectedVacancyIds]);

  const handleVacancyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setCurrentView('detail');
  };

  const handleApply = (id: string) => {
    // In a real app, this would be an API call
    const vacancy = vacancies.find(v => v.id === id);
    if (vacancy) {
      // Simple toast notification simulation
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl z-[100] animate-in fade-in slide-in-from-top duration-300 font-medium flex items-center gap-2';
      notification.innerHTML = `<span>Candidatura enviada para <b>${vacancy.company.name}</b>!</span>`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }

    if (!savedVacancyIds.includes(id)) {
      setSavedVacancyIds(prev => [...prev, id]);
    }
    setCurrentView('match');
    setSelectedVacancy(null);
  };

  const handleReject = (id: string) => {
    setRejectedVacancyIds(prev => [...prev, id]);
    setCurrentView('match');
    setSelectedVacancy(null);
  };

  const handleToggleSave = (id: string) => {
    setSavedVacancyIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(savedId => savedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSwipeRight = (id: string) => {
    if (!savedVacancyIds.includes(id)) {
      setSavedVacancyIds(prev => [...prev, id]);
    }
  };

  const handleSwipeLeft = (id: string) => {
    if (!rejectedVacancyIds.includes(id)) {
      setRejectedVacancyIds(prev => [...prev, id]);
    }
  };

  const resetProgress = () => {
    if (confirm('Tem certeza que deseja resetar todo o seu progresso?')) {
      setSavedVacancyIds([]);
      setRejectedVacancyIds([]);
      localStorage.removeItem('savedVacancyIds');
      localStorage.removeItem('rejectedVacancyIds');
      window.location.reload();
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeProfile
            user={MOCK_USER}
            onStartMatching={() => setCurrentView('match')}
            onViewSaved={() => setCurrentView('saved')}
            onViewDashboard={() => setCurrentView('dashboard')}
            onViewProfile={() => setCurrentView('profile')}
            savedCount={savedVacancyIds.length}
          />
        );
      case 'match':
        return (
          <SwipeDeck
            vacancies={availableVacancies}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            savedIds={savedVacancyIds}
            onGoBack={() => setCurrentView('home')}
          />
        );
      case 'detail':
        return selectedVacancy ? (
          <VacancyDetail
            vacancy={selectedVacancy}
            onBack={() => setCurrentView('match')}
            onApply={handleApply}
            onReject={handleReject}
            isSaved={savedVacancyIds.includes(selectedVacancy.id)}
            onToggleSave={handleToggleSave}
          />
        ) : null;
      case 'dashboard':
        return <Dashboard />;
      case 'saved':
        const savedVacancies = vacancies.filter(v => savedVacancyIds.includes(v.id));
        return (
          <div className="p-6 pb-32">
            <div className="mb-6 flex items-center gap-3">
              <button onClick={() => setCurrentView('home')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Home size={24} className="text-gray-600" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-textDark">Vagas Salvas</h2>
                <p className="text-base text-textLight">{savedVacancies.length} vaga(s) salva(s)</p>
              </div>
            </div>
            {savedVacancies.length > 0 ? (
              <div className="space-y-4">
                {savedVacancies.map(v => (
                  <VacancyCard
                    key={v.id}
                    vacancy={v}
                    onClick={() => handleVacancyClick(v)}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Bookmark size={64} className="mb-4 opacity-20" />
                <p className="text-lg">Nenhuma vaga salva ainda.</p>
                <button
                  onClick={() => setCurrentView('match')}
                  className="mt-6 text-primary font-bold text-base hover:underline"
                >
                  Ir para o Match
                </button>
              </div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-full pb-32 p-8 text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-6 border-4 border-white shadow-lg">
              <img
                src={`https://ui-avatars.com/api/?name=${MOCK_USER.name.replace(' ', '+')}&background=3F51B5&color=fff&size=256`}
                alt={MOCK_USER.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-3xl font-bold text-textDark mb-2">{MOCK_USER.name}</h2>
            <p className="text-xl text-textLight mb-8">{MOCK_USER.university}</p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={() => setCurrentView('home')}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Voltar ao Início
              </button>
              <button
                onClick={resetProgress}
                className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Resetar Progresso
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const showNav = currentView !== 'detail' && currentView !== 'home' && currentView !== 'match';
  const showHeader = currentView !== 'detail' && currentView !== 'home' && currentView !== 'match';

  return (
    <div className="bg-neutral min-h-screen flex justify-center font-sans overflow-hidden">
      {/* Increased max-w to 500px approx for Pro Max feel, or just rely on full width if on mobile */}
      <div className="w-full max-w-[500px] bg-gray-50 h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {showHeader && <Header title={currentView === 'saved' ? 'Favoritos' : 'InternMatch'} />}

        <main className={`flex-1 ${currentView === 'detail' || currentView === 'match' ? 'overflow-hidden h-full' : 'overflow-y-auto no-scrollbar'}`}>
          {renderContent()}
        </main>

        {showNav && (
          <nav className="bg-white border-t border-gray-200 flex justify-around py-4 px-2 sticky bottom-0 z-40 pb-8">
            <button
              onClick={() => setCurrentView('match')}
              className={`flex flex-col items-center p-2 rounded-xl w-20 transition-colors ${currentView === 'match' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Layers size={28} />
              <span className="text-xs mt-1.5 font-medium">Vagas</span>
            </button>

            <button
              onClick={() => setCurrentView('saved')}
              className={`flex flex-col items-center p-2 rounded-xl w-20 transition-colors ${currentView === 'saved' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Bookmark size={28} fill={currentView === 'saved' ? "currentColor" : "none"} />
              <span className="text-xs mt-1.5 font-medium">Salvas</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center p-2 rounded-xl w-20 transition-colors ${currentView === 'dashboard' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <BarChart2 size={28} />
              <span className="text-xs mt-1.5 font-medium">Painel</span>
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center p-2 rounded-xl w-20 transition-colors ${currentView === 'profile' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <User size={28} />
              <span className="text-xs mt-1.5 font-medium">Perfil</span>
            </button>
          </nav>
        )}

        {(currentView === 'match' || currentView === 'detail') && (
          <ChatAssistant currentVacancyTitle={selectedVacancy?.title} />
        )}
      </div>
    </div>
  );
};

export default App;

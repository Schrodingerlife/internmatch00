
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import VacancyCard from './components/VacancyCard';
import VacancyDetail from './components/VacancyDetail';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import HomeProfile from './components/HomeProfile';
import SwipeDeck from './components/SwipeDeck';
import MatchModal from './components/MatchModal';
import ResumeUpload from './components/ResumeUpload';
import { Home, User, BarChart2, Bookmark, Layers, Trash2, Search, Loader2, Menu, Bell, Settings, LogOut, FileText, Zap } from 'lucide-react';
import { MOCK_VACANCIES, MOCK_USER } from './constants';
import { Vacancy, AppView, UserProfile } from './types';
import { fetchVacancies } from './services/vacancyService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);

  // New Feature States
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedVacancy, setMatchedVacancy] = useState<Vacancy | null>(null);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

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

  // Load custom vacancies when entering match view if none exist or on explicit refresh
  useEffect(() => {
    if (currentView === 'match' && vacancies.length <= MOCK_VACANCIES.length) {
      handleRealTimeSearch();
    }
  }, [currentView]);

  const handleRealTimeSearch = async () => {
    setIsSearching(true);
    try {
      // Simulate network delay for "Real-time" feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newVacancies = await fetchVacancies(userProfile);
      if (newVacancies.length > 0) {
        // Merge with existing, avoiding duplicates
        setVacancies(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const uniqueNew = newVacancies.filter(v => !existingIds.has(v.id));
          return [...uniqueNew, ...prev];
        });
      }
    } catch (error) {
      console.error("Failed to fetch vacancies", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Filter vacancies to exclude rejected ones for the match view and apply search
  const availableVacancies = useMemo(() => {
    return vacancies.filter(v => {
      const isRejected = rejectedVacancyIds.includes(v.id);
      const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase());
      return !isRejected && matchesSearch;
    });
  }, [vacancies, rejectedVacancyIds, searchTerm]);

  const handleVacancyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setCurrentView('detail');
  };

  const handleApply = (id: string) => {
    const vacancy = vacancies.find(v => v.id === id);
    if (vacancy) {
      // Show Match Modal instead of simple toast
      setMatchedVacancy(vacancy);
      setShowMatchModal(true);
    }

    if (!savedVacancyIds.includes(id)) {
      setSavedVacancyIds(prev => [...prev, id]);
    }
    // Don't change view immediately, let modal handle it
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
    const vacancy = vacancies.find(v => v.id === id);
    if (vacancy) {
      setMatchedVacancy(vacancy);
      setShowMatchModal(true);
    }
  };

  const handleSwipeLeft = (id: string) => {
    if (!rejectedVacancyIds.includes(id)) {
      setRejectedVacancyIds(prev => [...prev, id]);
    }
  };

  const handleProfileUpdate = (newProfile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
    // Trigger a new search with updated profile
    handleRealTimeSearch();
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
            user={userProfile}
            onStartMatching={() => setCurrentView('match')}
            onViewSaved={() => setCurrentView('saved')}
            onViewDashboard={() => setCurrentView('dashboard')}
            onViewProfile={() => setCurrentView('profile')}
            savedCount={savedVacancyIds.length}
            onUploadResume={() => setShowResumeUpload(true)}
            onToggleMenu={toggleMenu}
            onToggleNotifications={toggleNotifications}
          />
        );
      case 'match':
        return (
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 bg-white shadow-sm z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar vagas, empresas..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {isSearching && availableVacancies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Loader2 size={48} className="animate-spin text-primary mb-4" />
                  <p className="font-bold text-lg text-textDark">Buscando vagas ideais...</p>
                  <p className="text-sm">Analisando seu perfil com IA</p>
                </div>
              ) : (
                <SwipeDeck
                  vacancies={availableVacancies}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  savedIds={savedVacancyIds}
                  onGoBack={() => setCurrentView('home')}
                />
              )}
            </div>
          </div>
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
        return (
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <button onClick={() => setCurrentView('home')} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                <Home size={20} className="text-gray-600" />
              </button>
            </div>
            <Dashboard />
          </div>
        );
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
            <div className="w-32 h-32 bg-gray-200 rounded-[2rem] mb-6 border-4 border-white shadow-lg overflow-hidden">
              <img
                src={`https://ui-avatars.com/api/?name=${userProfile.name.replace(' ', '+')}&background=3F51B5&color=fff&size=256`}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-textDark mb-2">{userProfile.name}</h2>
            <p className="text-xl text-textLight mb-8">{userProfile.university}</p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={() => setShowResumeUpload(true)}
                className="w-full py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 hover:bg-emerald-600 transition-colors"
              >
                Atualizar Currículo
              </button>
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
    <div className="bg-[#eef2f6] min-h-screen flex justify-center items-center font-sans overflow-hidden p-0 sm:p-4">
      {/* Main App Container - Mobile First but centered on desktop */}
      <div className="w-full max-w-[480px] bg-neutral h-[100dvh] sm:h-[90vh] sm:rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-white ring-1 ring-gray-200">

        {/* Status Bar Area (Visual only) */}
        <div className="absolute top-0 left-0 w-full h-6 bg-white/50 backdrop-blur-sm z-50 pointer-events-none sm:rounded-t-[2.5rem]"></div>

        {showHeader && (
          <Header
            title={currentView === 'saved' ? 'Favoritos' : 'InternMatch'}
            onToggleMenu={toggleMenu}
            onToggleNotifications={toggleNotifications}
            onNavigate={handleNavigate}
          />
        )}

        <main className={`flex-1 ${currentView === 'detail' || currentView === 'match' ? 'overflow-hidden h-full' : 'overflow-y-auto no-scrollbar'}`}>
          {renderContent()}
        </main>

        {showNav && (
          <nav className="bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-6 sticky bottom-0 z-40 pb-6 sm:pb-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => setCurrentView('match')}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${currentView === 'match' ? 'text-primary bg-primary/10 scale-110' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <Layers size={24} strokeWidth={currentView === 'match' ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-bold tracking-wide">Vagas</span>
            </button>

            <button
              onClick={() => setCurrentView('saved')}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${currentView === 'saved' ? 'text-primary bg-primary/10 scale-110' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <Bookmark size={24} fill={currentView === 'saved' ? "currentColor" : "none"} strokeWidth={currentView === 'saved' ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-bold tracking-wide">Salvas</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${currentView === 'dashboard' ? 'text-primary bg-primary/10 scale-110' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <BarChart2 size={24} strokeWidth={currentView === 'dashboard' ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-bold tracking-wide">Painel</span>
            </button>

            <button
              onClick={() => setCurrentView('profile')}
              className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${currentView === 'profile' ? 'text-primary bg-primary/10 scale-110' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <User size={24} strokeWidth={currentView === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-bold tracking-wide">Perfil</span>
            </button>
          </nav>
        )}

        {(currentView === 'match' || currentView === 'detail') && (
          <ChatAssistant currentVacancyTitle={selectedVacancy?.title} />
        )}

        {/* Modals */}
        {showMatchModal && matchedVacancy && (
          <MatchModal
            vacancy={matchedVacancy}
            onClose={() => {
              setShowMatchModal(false);
              setMatchedVacancy(null);
              setCurrentView('match');
            }}
            onSendMessage={() => {
              setShowMatchModal(false);
              // In a real app, this would open the chat with specific context
            }}
          />
        )}

        {showResumeUpload && (
          <ResumeUpload
            onClose={() => setShowResumeUpload(false)}
            onProfileUpdate={handleProfileUpdate}
          />
        )}

        {/* Side Menu (Drawer) */}
        {isMenuOpen && (
          <div className="absolute inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu}></div>
            <div className="relative w-3/4 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">IM</div>
                <span className="font-extrabold text-2xl text-textDark tracking-tight">InternMatch</span>
              </div>

              <nav className="space-y-2 flex-1">
                <button onClick={() => handleNavigate('home')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 hover:text-primary text-gray-600 font-medium transition-colors">
                  <Home size={20} /> Início
                </button>
                <button onClick={() => handleNavigate('profile')} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                  <User size={20} /> Meu Perfil
                </button>
                <button onClick={() => { setShowResumeUpload(true); setIsMenuOpen(false); }} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                  <FileText size={20} /> Currículo
                </button>
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                  <Settings size={20} /> Configurações
                </button>
              </nav>

              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 text-error font-bold transition-colors mt-auto">
                <LogOut size={20} /> Sair
              </button>
            </div>
          </div>
        )}

        {/* Notifications Popover */}
        {showNotifications && (
          <div className="absolute top-20 right-6 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-textDark">Notificações</h3>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">3 Novas</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Zap size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-textDark">Novo Match!</p>
                    <p className="text-xs text-textLight mt-0.5">A empresa TechCorp gostou do seu perfil.</p>
                    <span className="text-[10px] text-gray-400 mt-2 block">Há 2 horas</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 text-center">
              <button onClick={toggleNotifications} className="text-xs font-bold text-primary hover:underline">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

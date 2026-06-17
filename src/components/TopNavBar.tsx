import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDqmk8qQdMe_OQEIlVDiaklJlNuBKsiOZLDwuDwX3nq4IUAXR4ij0ZynFKXN8-rNknGtI5oYJOTvyAZRwW_sIyz1v3ST7d7B7nuS0tE9e_uJBWnnVlVXI6kaI69rCVw7KD3pkaZQr56t6b-mp5dwwpxspI4DHTLjihFgxkf3X56KgwTymTXW7UYW9KE1EXbqs9BU30D6PiqCsEREF0By7EdgyZJUHqeNkNDILNcQXx9lnqbLPPOdf1YJzM8vWbE5-OKX8ntdIk"

interface TopNavBarProps {
  activeSection?: string
}

const TopNavBar: React.FC<TopNavBarProps> = ({ activeSection }) => {
  const { isLoggedIn, userName, logout } = useAuth()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-surface/95 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-4">
          <img alt="SANA CARGO Logo" className="h-12 w-auto" src={LOGO_URL} />
          <span className="hidden lg:block text-headline-md font-headline-md font-bold text-primary">
            SANA <span className="text-secondary">CARGO</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8" id="main-nav">
          <Link to="/" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'accueil' ? ' active' : ''}`}>Accueil</Link>
          <Link to="/#transport" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'transport' ? ' active' : ''}`}>Transport</Link>
          <Link to="/#processus-expedition" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'processus' ? ' active' : ''}`}>Processus</Link>
          <Link to="/suivi" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'suivi' ? ' active' : ''}`}>Suivi</Link>
          <Link to="/#tarifs" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'tarifs' ? ' active' : ''}`}>Tarifs</Link>
          <Link to="/#contact" className={`nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent${activeSection === 'contact' ? ' active' : ''}`}>Contact</Link>
        </nav>

        <div className="flex items-center gap-4 relative" id="nav-user-area">
          {/* Notifications */}
          <div className="relative" id="notification-dropdown-container">
            <button
              className="p-2 hover:bg-surface-container rounded-full transition-all relative text-outline hover:text-primary"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-outline-variant shadow-xl rounded-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-outline-variant flex justify-between items-center">
                  <span className="font-bold text-primary">Notifications</span>
                  <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full">3 NOUVELLES</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <a className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/50 cursor-pointer" href="#">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Colis arrivé à Ouagadougou</p>
                      <p className="text-xs text-outline">Il y a 2 heures</p>
                    </div>
                  </a>
                  <a className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/50 cursor-pointer" href="#">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-sm">description</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Nouvelle facture disponible</p>
                      <p className="text-xs text-outline">Hier</p>
                    </div>
                  </a>
                  <a className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer" href="#">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-sm">update</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Mise à jour de statut</p>
                      <p className="text-xs text-outline">Il y a 2 jours</p>
                    </div>
                  </a>
                </div>
                <div className="px-4 py-2 text-center border-t border-outline-variant">
                  <button className="text-xs font-bold text-secondary hover:underline" onClick={() => setNotifOpen(false)}>Tout marquer comme lu</button>
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown */}
          {isLoggedIn && (
            <div className="relative group" id="user-profile-nav">
              <button className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container rounded-xl transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-label-sm text-outline uppercase leading-none mb-1">Espace Client</p>
                  <p className="font-bold text-primary leading-none">{userName || 'Abdoulwalyoulahe SANA'}</p>
                </div>
                <span className="material-symbols-outlined text-outline">expand_more</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-outline-variant shadow-xl rounded-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-50">
                <Link to="/profil" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-outline">account_circle</span>
                  Mon profil
                </Link>
                <Link to="/expeditions" className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-outline">local_shipping</span>
                  Mes expéditions
                </Link>
                <hr className="my-2 border-outline-variant" />
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-error-container hover:text-error text-on-surface transition-colors">
                  <span className="material-symbols-outlined">logout</span>
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopNavBar

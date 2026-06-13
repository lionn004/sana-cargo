import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Accueil from './pages/Accueil'
import MesExpeditions from './pages/MesExpeditions'
import NouvelleExpedition from './pages/NouvelleExpedition'
import Recapitulatif from './pages/Recapitulatif'
import SuiviColis from './pages/SuiviColis'
import MonProfil from './pages/MonProfil'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/expeditions" element={<MesExpeditions />} />
        <Route path="/nouvelle-expedition" element={<NouvelleExpedition />} />
        <Route path="/recapitulatif" element={<Recapitulatif />} />
        <Route path="/suivi" element={<SuiviColis />} />
        <Route path="/profil" element={<MonProfil />} />
        <Route path="*" element={<Accueil />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopNavBar from '../components/TopNavBar'

const MonProfil: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [saved, setSaved] = React.useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-background font-body-md text-on-surface selection:bg-secondary-container/30">
      <TopNavBar />

      <main className="min-h-[calc(100vh-80px-400px)] py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl">account_circle</span>
              Mon Profil
            </h1>
            <p className="text-on-surface-variant mt-2 max-w-xl mx-auto">Gérez vos informations personnelles et vos préférences de compte logistique pour une expérience personnalisée.</p>
          </div>

          {/* Profile Card */}
          <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="h-2 bg-secondary-container w-full"></div>
            <div className="p-8 md:p-12">
              <form className="space-y-10" onSubmit={handleSave}>

                {/* Avatar */}
                <div className="flex flex-col items-center gap-4 pb-8 border-b border-outline-variant">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full ring-4 ring-surface-container-high overflow-hidden shadow-lg">
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white">
                        <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>account_circle</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-title-md font-title-md text-on-surface">Abdoulwalyoulahe SANA</h2>
                    <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Logistics Coordinator</p>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Prénom</label>
                    <input className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md outline-none"
                      placeholder="Prénom" type="text" defaultValue="Abdoulwalyoulahe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Nom</label>
                    <input className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md outline-none"
                      placeholder="Nom" type="text" defaultValue="SANA" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Email Professionnel</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">mail</span>
                      <input className="w-full pl-11 pr-3 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md outline-none"
                        placeholder="email@entreprise.com" type="email" defaultValue="abdoulwalyoulahe.sana@logistics-pro.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Téléphone</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-xl">call</span>
                      <input className="w-full pl-11 pr-3 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md outline-none"
                        placeholder="+226 00 00 00 00" type="tel" defaultValue="+33 6 12 34 56 78" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">Langue préférée</label>
                    <div className="relative">
                      <select className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md appearance-none outline-none">
                        <option value="fr">Français (France)</option>
                        <option value="en">English (Global)</option>
                        <option value="es">Español</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline pointer-events-none">expand_more</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    className="w-full sm:flex-1 bg-secondary-container text-on-secondary-container py-4 px-8 rounded-lg font-bold text-body-md shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span className="material-symbols-outlined">save</span>
                    {saved ? 'Modifications enregistrées !' : 'Enregistrer les modifications'}
                  </button>
                  <button
                    className="w-full sm:w-auto px-10 py-4 bg-surface-container-high text-on-surface-variant rounded-lg font-bold text-body-md hover:bg-surface-variant transition-colors"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant mt-0">
        <div className="max-w-max-width mx-auto px-margin-desktop py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-white">rocket_launch</span>
                </div>
                <span className="font-headline-lg text-headline-lg font-bold text-primary tracking-tight">SANA CARGO</span>
              </div>
              <p className="text-on-surface-variant max-w-sm mb-8 leading-relaxed">SANA CARGO est le leader de la logistique connectée, offrant des solutions de transport mondiales rapides, sécurisées et fiables.</p>
              <div className="flex gap-4">
                {['language', 'public', 'alternate_email'].map(icon => (
                  <a key={icon} className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all text-on-surface-variant" href="#">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-8 uppercase text-xs tracking-widest text-primary">Liens utiles</h4>
              <ul className="space-y-4">
                {["Centre d'aide", 'Tarification', 'Blog logistique', 'Carrières'].map(l => (
                  <li key={l}><a className="text-on-surface-variant hover:text-primary transition-colors text-body-md" href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-8 uppercase text-xs tracking-widest text-primary">Support</h4>
              <ul className="space-y-4">
                {['Contactez-nous', 'FAQ', 'Suivi en temps réel', 'Réclamations'].map(l => (
                  <li key={l}><a className="text-on-surface-variant hover:text-primary transition-colors text-body-md" href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-outline-variant mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-on-surface-variant text-sm">© 2024 SANA CARGO. Tous droits réservés.</p>
            <div className="flex gap-8">
              {['Mentions légales', 'Politique de confidentialité', 'Cookies'].map(l => (
                <a key={l} className="text-on-surface-variant hover:text-primary transition-colors text-sm underline decoration-outline-variant underline-offset-8" href="#">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MonProfil

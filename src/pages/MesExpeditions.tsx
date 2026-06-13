import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopNavBar from '../components/TopNavBar'
import { FooterContact } from './Accueil'

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDqmk8qQdMe_OQEIlVDiaklJlNuBKsiOZLDwuDwX3nq4IUAXR4ij0ZynFKXN8-rNknGtI5oYJOTvyAZRwW_sIyz1v3ST7d7B7nuS0tE9e_uJBWnnVlVXI6kaI69rCVw7KD3pkaZQr56t6b-mp5dwwpxspI4DHTLjihFgxkf3X56KgwTymTXW7UYW9KE1EXbqs9BU30D6PiqCsEREF0By7EdgyZJUHqeNkNDILNcQXx9lnqbLPPOdf1YJzM8vWbE5-OKX8ntdIk"

const expeditions = [
  { id: 'SC-2026-001254', date: '10 Juin 2026', dest: 'Ouagadougou, BF', status: 'En transit', statusClass: 'bg-orange-100 text-orange-800 border-orange-200' },
  { id: 'SC-2026-001190', date: '05 Juin 2026', dest: 'Bobo-Dioulasso, BF', status: 'Livré', statusClass: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'SC-2026-001288', date: '12 Juin 2026', dest: 'Ouagadougou, BF', status: 'En attente', statusClass: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'SC-2026-001042', date: '01 Juin 2026', dest: 'Paris, FR', status: 'Livré', statusClass: 'bg-green-100 text-green-800 border-green-200' },
]

const MesExpeditions: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      <TopNavBar />
      <main className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-base md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 items-end">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Mes Expéditions</h1>
            <p className="text-on-surface-variant font-body-md">Gérez et suivez vos envois en temps réel à travers le monde.</p>
          </div>
          <Link to="/nouvelle-expedition" className="flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-title-md text-body-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined">add_circle</span>
            Nouvelle Expédition
          </Link>
          <div className="mt-4 w-full md:w-72">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant focus:border-primary focus:ring-primary font-body-md bg-surface" placeholder="Rechercher une expédition..." type="text" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            { label: 'Total des colis', value: '12', color: 'text-primary', bar: 'bg-primary', w: 'w-full' },
            { label: 'En transit', value: '3', color: 'text-secondary', bar: 'bg-secondary-container', w: 'w-1/4', extra: 'border-l-4 border-l-secondary-container' },
            { label: 'En attente', value: '2', color: 'text-on-primary-fixed-variant', bar: 'bg-primary-container', w: 'w-[16%]' },
            { label: 'Livrés', value: '7', color: 'text-green-700', bar: 'bg-green-500', w: 'w-[58%]' },
          ].map(s => (
            <div key={s.label} className={`bg-surface border border-outline-variant p-6 rounded-xl flex flex-col gap-1 tracking-card${s.extra ? ' ' + s.extra : ''}`}>
              <span className="text-on-surface-variant font-label-sm">{s.label}</span>
              <span className={`font-display-lg text-[32px] ${s.color}`}>{s.value}</span>
              <div className="mt-2 h-1 w-full bg-surface-container-high rounded-full">
                <div className={`h-full ${s.bar} ${s.w} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-surface-container-low p-4 md:p-6 rounded-2xl mb-6 border border-outline-variant">
          <div className="flex bg-surface p-1 rounded-xl border border-outline-variant inline-flex">
            <button className="px-4 py-2 rounded-lg text-label-sm font-semibold bg-primary text-on-primary transition-all">Tout</button>
            <button className="px-4 py-2 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all">En transit</button>
            <button className="px-4 py-2 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all">En attente</button>
            <button className="px-4 py-2 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all">Livré</button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface border border-outline-variant rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-wider">N° Suivi</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {expeditions.map((exp, i) => (
                  <tr key={exp.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    style={{ opacity: 1, transform: 'translateY(0px)', transition: '0.4s' }}
                    onClick={() => navigate('/suivi')}>
                    <td className="px-6 py-5 font-label-sm text-primary font-bold">{exp.id}</td>
                    <td className="px-6 py-5 text-body-md text-on-surface-variant">{exp.date}</td>
                    <td className="px-6 py-5 text-body-md font-medium">{exp.dest}</td>
                    <td className="px-6 py-5">
                      <span className={`status-badge ${exp.statusClass}`}>{exp.status}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-primary font-semibold text-body-md hover:underline inline-flex items-center gap-1">
                        Détails <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
            <span className="text-label-sm text-on-surface-variant">Affichage de 1-4 sur 12 expéditions</span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-outline-variant disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container-high">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim border-t border-outline-variant w-full py-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-max-width mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-title-md text-title-md text-primary font-bold">SANA CARGO</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 SANA CARGO. Precision in Motion.</p>
          </div>
          <div className="flex gap-8">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Terms of Service</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-all" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MesExpeditions

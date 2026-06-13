import React from 'react'
import TopNavBar from '../components/TopNavBar'
import { FooterContact } from './Accueil'

const SuiviColis: React.FC = () => {
  const [copied, setCopied] = React.useState(false)

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('SANA-CH-BF-99283471').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <TopNavBar activeSection="suivi" />

      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg">
        {/* Header */}
        <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-1">Suivi d'expédition en direct</h1>
            <p className="text-on-surface-variant">Surveillez le transit de votre cargaison avec la précision SANA CARGO.</p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-label-sm font-label-sm text-outline uppercase">Numéro de suivi</span>
            <span
              className="font-tracking-number text-tracking-number text-white bg-primary px-3 py-1 rounded shadow-sm cursor-pointer"
              title="Cliquez pour copier"
              onClick={handleCopyTracking}
              style={{ backgroundColor: copied ? '#16a34a' : '#002294' }}
            >
              {copied ? 'COPIÉ !' : 'SANA-CH-BF-99283471'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* Timeline Column */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            {/* Status Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl">
              <div className="flex items-center justify-between mb-stack-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>local_shipping</span>
                  <span className="font-bold text-primary">En Transit</span>
                </div>
                <span className="text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">Air Prioritaire</span>
              </div>
              <div className="space-y-1">
                <p className="text-label-sm text-outline uppercase">Arrivée estimée</p>
                <p className="text-headline-md font-headline-md text-primary">24 oct. 2024</p>
                <p className="text-body-md text-on-surface-variant">Arrivée à l'Aéroport International de Ouagadougou (OUA)</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl">
              <h3 className="font-bold text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-outline">history</span>
                Progression de l'expédition
              </h3>
              <div className="relative space-y-8 pl-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">

                {/* Step: pending future */}
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-outline-variant z-10"></div>
                  <p className="font-bold text-on-surface-variant">En cours de livraison (Ouagadougou)</p>
                  <p className="text-label-sm text-outline">En attente</p>
                </div>

                {/* Step: current */}
                <div className="relative">
                  <div className="absolute -left-8 top-1 w-6 h-6 rounded-full border-2 z-10 active-dot" style={{ backgroundColor: '#fe8438', borderColor: '#fe8438' }}></div>
                  <p className="font-bold text-primary">Arrivée aux Douanes du Burkina Faso</p>
                  <p className="text-label-sm font-bold" style={{ color: '#fe8438' }}>En cours • 21 oct., 14:20</p>
                </div>

                {/* Steps: completed */}
                {[
                  { label: 'Transit International', detail: 'Terminé • 19 oct., 09:15' },
                  { label: 'Départ du Port/Aéroport', detail: 'Guangzhou Baiyun • 18 oct., 22:00' },
                  { label: 'Enlevé chez le fournisseur', detail: 'Hub logistique de Dongguan • 17 oct., 11:30' },
                  { label: 'Commande confirmée (Chine)', detail: 'Vérifié • 16 oct., 16:45' },
                ].map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-white text-[16px]">check</span>
                    </div>
                    <p className="font-bold text-primary">{step.label}</p>
                    <p className="text-label-sm text-on-surface-variant">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Actions Column */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            {/* Map Widget */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden h-[400px] relative shadow-sm">
              <div className="absolute inset-0 bg-[#e3e8ec] flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  {/* Continent shapes (simplified) */}
                  <path d="M500,100 Q650,50 750,150 T650,300 Q550,350 450,250 Z" fill="#cfd8dc" opacity="0.5" />
                  <path d="M100,150 Q150,100 300,150 T350,350 Q200,450 50,300 Z" fill="#cfd8dc" opacity="0.5" />
                  {/* Route line */}
                  <path className="route-line" d="M680,180 Q400,100 250,280" fill="none" stroke="#2c4de1" strokeWidth="3" />
                  {/* Origin marker */}
                  <circle cx="680" cy="180" fill="#2c4de1" r="6" />
                  {/* Destination marker */}
                  <circle cx="250" cy="280" fill="#fe8438" r="8" />
                  {/* Animated position */}
                  <circle cx="340" cy="190" fill="#fe8438" r="4">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="4;8;4" />
                    <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0.2;1" />
                  </circle>
                </svg>

                {/* Origin label */}
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm border border-outline-variant">
                  <p className="text-label-sm text-outline font-bold">Origine</p>
                  <p className="text-body-md font-bold text-primary">Guangzhou, CN</p>
                </div>

                {/* Destination label */}
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm border border-outline-variant">
                  <p className="text-label-sm text-outline font-bold">Destination</p>
                  <p className="text-body-md font-bold text-primary">Ouagadougou, BF</p>
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-primary text-white text-label-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> POSITION EN DIRECT
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-primary p-stack-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-stack-md shadow-lg">
              <div className="flex items-center gap-stack-md">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">notifications_active</span>
                </div>
                <div>
                  <p className="text-on-primary font-bold">Alertes de statut activées</p>
                  <p className="text-primary-fixed-dim text-body-md">Recevez des mises à jour par SMS à chaque étape.</p>
                </div>
              </div>
              <div className="flex gap-stack-sm">
                <button className="px-6 py-2 bg-secondary text-white font-bold rounded-lg hover:scale-95 transition-transform">
                  Télécharger la facture
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary mt-auto">
        <div className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-container-max mx-auto text-on-primary">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-headline-md text-headline-md text-white block">SANA CARGO</span>
            </div>
            <p className="text-primary-fixed-dim text-body-md">Connecter la Chine et l'Afrique de l'Ouest avec le réseau logistique premium de SANA CARGO.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Ressources</h4>
            <ul className="space-y-2 text-primary-fixed-dim text-body-md">
              {['Routes maritimes', 'Horaires des ports', "Guides d'importation"].map(l => (
                <li key={l}><a className="hover:text-white transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-primary-fixed-dim text-body-md">
              {["Conditions d'utilisation", 'Politique de confidentialité'].map(l => (
                <li key={l}><a className="hover:text-white transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Support Opérationnel</h4>
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined">call</span>
              <span className="font-bold">+226 25 30 00 00</span>
            </div>
            <button className="bg-white text-primary py-2 rounded-lg font-bold hover:bg-secondary transition-colors hover:text-white">
              Contactez-nous
            </button>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
          <p className="text-primary-fixed-dim text-label-sm">© 2024 Logistique SANA CARGO. Passage Chine-Burkina Faso. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default SuiviColis

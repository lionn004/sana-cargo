import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopNavBar from '../components/TopNavBar'

const Recapitulatif: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [termsChecked, setTermsChecked] = React.useState(false)
  const [infoChecked, setInfoChecked] = React.useState(false)
  const [confirming, setConfirming] = React.useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  const handleConfirm = () => {
    if (!termsChecked) {
      alert('Veuillez accepter les conditions générales avant de confirmer.')
      return
    }
    setConfirming(true)
    setTimeout(() => {
      navigate('/expeditions')
    }, 2000)
  }

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
      <TopNavBar />
      <main className="max-w-max-width mx-auto px-margin-desktop py-12">

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {/* Step 1 - completed */}
            <div className="flex flex-col items-center gap-2 flex-1 relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center step-completed">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary">Produit</span>
              <div className="absolute top-5 left-1/2 w-full h-[2px] bg-primary"></div>
            </div>
            {/* Step 2 - completed */}
            <div className="flex flex-col items-center gap-2 flex-1 relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center step-completed">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary">Itinéraire</span>
              <div className="absolute top-5 left-1/2 w-full h-[2px] bg-outline-variant"></div>
            </div>
            {/* Step 3 - active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center step-active">
                <span className="font-bold">3</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">Récapitulatif</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">inventory_2</span>
                  Détails de l'Expédition
                </h2>
                <button className="text-primary hover:underline text-sm font-medium" onClick={() => navigate('/nouvelle-expedition')}>Modifier</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Produit</p>
                  <p className="font-body-lg text-body-lg text-on-surface font-semibold">Textiles Industriels</p>
                </div>
                <div className="space-y-1">
                  <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Mode de Transport</p>
                  <p className="font-body-lg text-body-lg text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">flight</span>
                    Fret Aérien
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Poids Total</p>
                  <p className="font-body-lg text-body-lg text-on-surface">50 kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Valeur Déclarée</p>
                  <p className="font-body-lg text-body-lg text-on-surface">$1,500.00</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-[2px] h-12 bg-outline-variant"></div>
                    <div className="w-3 h-3 border-2 border-primary rounded-full"></div>
                  </div>
                  <div className="flex flex-col justify-between h-20">
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">ORIGINE</p>
                      <p className="font-body-md text-body-md text-on-surface font-bold">Guangzhou, Chine (CAN)</p>
                    </div>
                    <div>
                      <p className="text-label-sm font-label-sm text-on-surface-variant">DESTINATION</p>
                      <p className="font-body-md text-body-md text-on-surface font-bold">Ouagadougou, Burkina Faso (OUA)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3">
              <input
                className="mt-1 w-5 h-5 rounded border-outline text-primary focus:ring-primary cursor-pointer"
                id="terms"
                type="checkbox"
                checked={termsChecked}
                onChange={e => setTermsChecked(e.target.checked)}
              />
              <label className="text-body-md text-on-surface-variant" htmlFor="terms">
                Je confirme que les informations fournies sont exactes et j'accepte les{' '}
                <a className="text-primary font-bold hover:underline" href="#">Conditions Générales de Vente</a>{' '}
                et la politique de confidentialité de SANA CARGO.
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <button
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary-fixed-dim transition-all active:scale-95 flex items-center gap-2"
                onClick={() => navigate('/nouvelle-expedition')}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Précédent
              </button>
              <button
                className="flex-1 px-8 py-3 rounded-lg bg-secondary-container text-on-secondary-container font-bold text-lg hover:bg-secondary transition-all hover:text-white shadow-md active:scale-95 flex items-center justify-center gap-3"
                onClick={handleConfirm}
                disabled={confirming}
              >
                {confirming ? 'Traitement en cours...' : (
                  <>Confirmer l'expédition <span className="material-symbols-outlined">rocket_launch</span></>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Important Info */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 space-y-4 sticky top-24">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">info</span>
                <h3 className="font-title-md text-title-md font-bold">Information Importante</h3>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Veuillez noter que l'expédition de votre colis ne débutera qu'après sa réception à notre siège en Chine et la vérification des informations renseignées. Une facture vous sera alors envoyée par notification : vous devrez vous reconnecter sur la plateforme pour la valider. Une fois la facture validée, un numéro d'identification vous sera attribué pour suivre votre colis en temps réel et recevoir les alertes d'arrivée.
              </p>
              <div className="flex items-start gap-3 mb-4">
                <input
                  className="mt-1 w-5 h-5 rounded border-outline text-primary focus:ring-primary cursor-pointer"
                  id="info-read"
                  type="checkbox"
                  checked={infoChecked}
                  onChange={e => setInfoChecked(e.target.checked)}
                />
                <label className="text-body-md text-on-surface-variant" htmlFor="info-read">
                  J'ai lu et j'approuve ces conditions d'expédition
                </label>
              </div>
              <div className="pt-4 border-t border-outline-variant">
                <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary uppercase">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Sécurité &amp; Conformité</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high mt-20 border-t border-outline-variant">
        <div className="max-w-max-width mx-auto px-margin-desktop py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="col-span-1 md:col-span-1">
              <span className="font-headline-lg text-headline-lg font-bold text-primary block mb-4">SANA CARGO</span>
              <p className="text-body-md text-on-surface-variant">L'efficacité au cœur de vos échanges internationaux. Votre partenaire logistique de confiance.</p>
            </div>
            {[
              { title: 'Solutions', items: ['Fret Aérien', 'Fret Maritime', 'Transport Routier', 'Douanes'] },
              { title: 'Support', items: ["Centre d'aide", 'Suivre un colis', 'Documents', 'Contact'] },
              { title: 'Légal', items: ['Confidentialité', "Conditions d'utilisation", 'Mentions légales'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-on-surface mb-4">{col.title}</h4>
                <ul className="space-y-2 text-on-surface-variant">
                  {col.items.map(item => <li key={item}><a className="hover:text-primary" href="#">{item}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 SANA CARGO. Tous droits réservés.</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">language</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">share</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">mail</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Recapitulatif

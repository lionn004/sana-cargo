import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopNavBar from '../components/TopNavBar'

const NouvelleExpedition: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <div className="font-body-md text-on-surface" style={{ backgroundColor: '#f7f9fb' }}>
      <TopNavBar />
      <main className="pt-12 pb-stack-lg px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* Main Form Column */}
          <div className="lg:col-span-8">
            <div className="mb-stack-lg">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Nouvelle expédition</h1>
              <p className="text-on-surface-variant">Complétez les détails du manifeste pour générer votre passage de suivi SANA CARGO.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center mb-stack-lg bg-white p-6 rounded-xl border border-outline-variant card-shadow">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-label-sm" style={{ backgroundColor: '#ff6600', color: '#fff' }}>01</span>
                <span className="text-body-md">Produit</span>
              </div>
              <div className="stepper-line active"></div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center text-label-sm">02</span>
                <span className="text-body-md">Itinéraire</span>
              </div>
              <div className="stepper-line"></div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center text-label-sm">03</span>
                <span className="text-body-md">Récapitulatif</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl border border-outline-variant p-stack-lg card-shadow">
              <form className="space-y-stack-lg" id="shippingForm">

                {/* Section 1: Product */}
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-gutter flex items-center gap-2 font-bold">
                    <span className="material-symbols-outlined text-secondary">inventory_2</span>
                    Spécifications du produit
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Nom du produit</label>
                      <input className="bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="ex: Textiles Industriels" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Le colis contient-il une batterie ?</label>
                      <select className="bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary outline-none transition-all">
                        <option>Non</option>
                        <option>Oui</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Poids (kg)</label>
                      <input className="font-tracking-number text-tracking-number bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary outline-none" type="number" defaultValue="50" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Valeur déclarée ($)</label>
                      <input className="font-tracking-number text-tracking-number bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary outline-none" placeholder="USD" type="number" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-container transition-all shadow-lg" type="button"
                      style={{ backgroundColor: '#ff6600' }}>
                      <span className="material-symbols-outlined">check_circle</span>
                      Valider les spécifications
                    </button>
                  </div>
                </div>

                <hr className="border-outline-variant my-stack-lg" />

                {/* Section 2: Route */}
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-gutter flex items-center gap-2 font-bold">
                    <span className="material-symbols-outlined text-secondary">distance</span>
                    Itinéraire &amp; Logistique
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-md">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Origine (Chine)</label>
                      <select className="bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary outline-none">
                        <option>Entrepôt de Guangzhou (Hub A)</option>
                        <option>Centre de consolidation de Yiwu</option>
                        <option>Terminal portuaire de Shenzhen</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Destination (Burkina Faso)</label>
                      <select className="bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-primary outline-none">
                        <option>Terminal central de Ouagadougou</option>
                        <option>Hub logistique de Bobo-Dioulasso</option>
                        <option>Dépôt de Koudougou</option>
                      </select>
                    </div>
                  </div>

                  <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-4">Mode d'expédition</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    {/* Air */}
                    <label className="relative cursor-pointer group">
                      <input defaultChecked className="peer sr-only" name="shipping" type="radio" />
                      <div className="p-4 border-2 border-outline-variant rounded-xl group-hover:border-primary transition-all peer-checked:border-secondary peer-checked:bg-secondary/10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="material-symbols-outlined text-primary text-3xl">flight</span>
                          <div className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase" style={{ backgroundColor: '#ff6600' }}>Plus rapide</div>
                        </div>
                        <p className="font-bold text-primary">Fret Aérien</p>
                        <p className="text-sm text-on-surface-variant">5-7 jours ouvrables</p>
                      </div>
                    </label>
                    {/* Sea */}
                    <label className="relative cursor-pointer group">
                      <input className="peer sr-only" name="shipping" type="radio" />
                      <div className="p-4 border-2 border-outline-variant rounded-xl group-hover:border-primary transition-all peer-checked:border-secondary peer-checked:bg-secondary/10">
                        <div className="flex justify-between items-start mb-2">
                          <span className="material-symbols-outlined text-primary text-3xl">directions_boat</span>
                        </div>
                        <p className="font-bold text-primary">Fret Maritime</p>
                        <p className="text-sm text-on-surface-variant">35-45 jours ouvrables</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-gutter">
                  <button
                    className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-all shadow-lg"
                    type="button"
                    onClick={() => navigate('/recapitulatif')}
                  >
                    Continuer vers le récapitulatif
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Ads */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-gutter gap-6">
              {[
                {
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvj2ZfmAp4ai0d2NeXyYsayVzJ4hmQw_j9JZvnM2wOnaYhm8wSf9eWtqwxXC1xj2j_AMAg3TFCkfy3SjQV780Tcm4Z_JH0MQXeqDJlKfpStJ_cjgDUEXGbDJC1jC664AAfhnJjJPUW5H9R4bo1SYYV10_GBQPfROt7IAYhHxcZR8p51bkWKshyqtN9vQK54RoAgbEABtivCDmcmgmaBUvb7-pGjqp_9ZAY9C9DqF_Mk4KDlhyzFIqc6EAnvauyz9yii70KTCk",
                  badge: 'Partenaire de confiance', alt: 'SANA CARGO Advertisement',
                  desc: 'Votre pont logistique direct entre la Chine et le Burkina Faso.'
                },
                {
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEHOp-MKV1Fp9EV4V0IZki0Rz5Zh6DbiL5klGm5jpboM5XwTDO7Sylp0XpTJg_iGgdThzUVIqRCHVG4u57d4weO15qQc-Ixzp6oqpSLtebS7NdWkAVCrniEm0QnuLAIjT8XJJoCBIhnFWgPpyDrUrNaVJpFk-drxd2BI_f2bKkixgGPzspwUab8Y_17H3XrfqlCboEc0JMPwO0CNNjocnYZQTZDYA5mHpg_MSi4rv4JQAPb9rTrwnpnARcWZT7hKyLPmq2j0E",
                  badge: 'Fret Maritime', alt: 'SANA CARGO Maritime',
                  desc: 'Fret Maritime Sécurisé - Des solutions économiques pour vos volumes importants.'
                },
                {
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY6Ysxnla2v6tuzVHAtnxMP0PhDTPF71rfQFfJBYUI02XdWZQq3TOj0uOYwidS5i7MBByv4zrSBnBrevAdLoDImQr7tHWVpY8otH-RkP5P9r4A8D76idpVk5CIFHSs2I0WtD-5AaPNn6_MBJM4_uqpNawGijeFtWjtTKViG8e9nTNwAfIBaiJRMflUMIt0sHDKpQRaMAa5QqSS0PUkn2rY2CO50KN7i3jYoCjxWwqvwTJJpwFfrGLvCjXm2OCPywsrA-SeZKk",
                  badge: 'Entreposage', alt: 'SANA CARGO Warehouse',
                  desc: 'Stockage & Logistique - Une gestion rigoureuse de vos marchandises dans nos entrepôts.'
                },
              ].map((ad, i) => (
                <div key={i} className="bg-white rounded-xl border border-outline-variant overflow-hidden card-shadow">
                  <div className="relative">
                    <img alt={ad.alt} className="w-full h-auto object-cover" src={ad.img} />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                      <span className="text-white text-[10px] px-2 py-1 rounded font-bold uppercase" style={{ backgroundColor: '#ff6600' }}>{ad.badge}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-primary mb-1">SANA CARGO</p>
                    <p className="text-sm text-on-surface-variant">{ad.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-on-primary py-stack-lg px-margin-desktop mt-20">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="space-y-4">
            <p className="text-sm text-on-primary-container opacity-80">Le premier pont logistique entre la Chine et le Burkina Faso. Fiable, suivi et résilient.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-fixed">Liens Rapides</h4>
            <nav className="flex flex-col gap-2">
              {["Itinéraires d'expédition", 'Horaires des ports', 'Suivre une expédition'].map(l => (
                <a key={l} className="text-sm text-on-primary-container hover:text-secondary-fixed transition-colors" href="#">{l}</a>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-fixed">Conformité</h4>
            <nav className="flex flex-col gap-2">
              {["Conditions d'utilisation", 'Politique de confidentialité', 'Déclarations douanières'].map(l => (
                <a key={l} className="text-sm text-on-primary-container hover:text-secondary-fixed transition-colors" href="#">{l}</a>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-secondary-fixed">Support</h4>
            <p className="text-sm text-on-primary-container">contact@sanacargo-express.com</p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined">face_nod</span>
              <span className="material-symbols-outlined">public</span>
              <span className="material-symbols-outlined">mail</span>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-on-primary-container/20 text-center text-xs text-on-primary-container">
          © 2024 SANA CARGO Express Logistics. Passage Chine-Burkina Faso.
        </div>
      </footer>
    </div>
  )
}

export default NouvelleExpedition

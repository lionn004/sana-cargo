import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TopNavBar from '../components/TopNavBar'

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDqmk8qQdMe_OQEIlVDiaklJlNuBKsiOZLDwuDwX3nq4IUAXR4ij0ZynFKXN8-rNknGtI5oYJOTvyAZRwW_sIyz1v3ST7d7B7nuS0tE9e_uJBWnnVlVXI6kaI69rCVw7KD3pkaZQr56t6b-mp5dwwpxspI4DHTLjihFgxkf3X56KgwTymTXW7UYW9KE1EXbqs9BU30D6PiqCsEREF0By7EdgyZJUHqeNkNDILNcQXx9lnqbLPPOdf1YJzM8vWbE5-OKX8ntdIk"

const Accueil: React.FC = () => {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login')
  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPass, setLoginPass] = React.useState('')
  const [regFname, setRegFname] = React.useState('')
  const [regLname, setRegLname] = React.useState('')
  const [regTel, setRegTel] = React.useState('')
  const [regEmail, setRegEmail] = React.useState('')
  const [regPass, setRegPass] = React.useState('')
  const [regPassConf, setRegPassConf] = React.useState('')
  const [passMatchError, setPassMatchError] = React.useState(false)
  const [calcWeight, setCalcWeight] = React.useState('')
  const [calcBattery, setCalcBattery] = React.useState('non')
  const [showCalcResults, setShowCalcResults] = React.useState(false)
  const [showPass, setShowPass] = React.useState(false)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login('Jean Dupont')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (regPass !== regPassConf) {
      setPassMatchError(true)
      return
    }
    setPassMatchError(false)
    login(`${regFname} ${regLname}`)
  }

  const calcPrice = () => {
    const w = parseFloat(calcWeight) || 0
    const base = calcBattery === 'oui' ? 5500 : 4200
    return Math.round(w * base).toLocaleString('fr-FR')
  }

  // ─── CONNECTED STATE ──────────────────────────────────────────────────────
  if (isLoggedIn) {
    return (
      <div className="bg-background text-on-background font-body-md">
        <TopNavBar activeSection="accueil" />
        <main>
          {/* Hero - connected */}
          <section className="relative h-auto lg:h-[85vh] flex items-center overflow-hidden py-12 lg:py-0 transition-all duration-700 opacity-100 translate-y-0" id="accueil">
            <div className="absolute inset-0 z-0">
              <img alt="Connectivité logistique Chine vers Afrique" className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8f2WizD4aLLzTpXahQB18ef5-jLQuukPO4v4rsXqsRHSkyy43S6K7LfGGSlHGPt-KyevLH3mfgpq8YdMhbeuC403Vvr5GjrRsjxG6YC2WKL_nqLyGprfKa9KPhjaHYSt-Re8q342v1QY-pgJn2WFmwHY5sXKYP6Hj4YIIP_VnNH2DHjDZaJk5q377mR__MTL6aEaWbpDSr5eeJu1TZGBkUxD3rsAuI6WHNGCroWmIlDq87rYLxsUL8QLn-CwwU-bkbDi_I84" />
              <div className="absolute inset-0 hero-gradient"></div>
            </div>
            <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop w-full">
              <div className="grid lg:grid-cols-2 gap-gutter items-center">
                <div className="max-w-2xl text-white mx-auto text-center">
                  <h1 className="font-display-lg text-display-lg mb-6 leading-tight">Votre Pont Logistique de la Chine au Burkina Faso</h1>
                  <p className="font-body-lg text-body-lg text-surface-container-lowest mb-10 opacity-90">Optimisez votre chaîne d'approvisionnement avec SANA CARGO. On transporte toutes vos marchandises de la Chine vers le Burkina Faso.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="px-8 py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                      onClick={() => navigate('/nouvelle-expedition')}
                    >
                      Nouvelle expédition<span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
              <span className="material-symbols-outlined text-4xl">expand_more</span>
            </div>
          </section>

          <ServiceHighlights />
          <TransportSection />
          <ProcessusSection />
          <SuiviSection />
          <TarifsSection calcWeight={calcWeight} setCalcWeight={setCalcWeight} calcBattery={calcBattery} setCalcBattery={setCalcBattery} showCalcResults={showCalcResults} setShowCalcResults={setShowCalcResults} calcPrice={calcPrice} />
        </main>
        <FooterContact />
      </div>
    )
  }

  // ─── DISCONNECTED STATE ───────────────────────────────────────────────────
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container" data-mode="connect">
      {/* Header non connecté */}
      <header className="bg-surface/95 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-4">
            <img alt="SANA CARGO Logo" className="h-12 w-auto" src={LOGO_URL} />
            <span className="hidden lg:block text-headline-md font-headline-md font-bold text-primary">SANA <span className="text-secondary">CARGO</span></span>
          </div>
          <nav className="hidden md:flex gap-8" id="main-nav">
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent" href="#accueil">Accueil</a>
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent" href="#transport">Transport</a>
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent" href="#processus-expedition">Processus</a>
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent" href="#suivi">Suivi</a>
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent" href="#tarifs">Tarifs</a>
            <a className="nav-link font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors pb-1 border-b-2 border-transparent active" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-4" id="nav-user-area"></div>
        </div>
      </header>

      <main>
        {/* Hero - non connecté */}
        <section className="relative h-auto lg:h-[85vh] flex items-center overflow-hidden py-12 lg:py-0 transition-all duration-700 opacity-100 translate-y-0" id="accueil">
          <div className="absolute inset-0 z-0">
            <img alt="Connectivité logistique Chine vers Afrique" className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8f2WizD4aLLzTpXahQB18ef5-jLQuukPO4v4rsXqsRHSkyy43S6K7LfGGSlHGPt-KyevLH3mfgpq8YdMhbeuC403Vvr5GjrRsjxG6YC2WKL_nqLyGprfKa9KPhjaHYSt-Re8q342v1QY-pgJn2WFmwHY5sXKYP6Hj4YIIP_VnNH2DHjDZaJk5q377mR__MTL6aEaWbpDSr5eeJu1TZGBkUxD3rsAuI6WHNGCroWmIlDq87rYLxsUL8QLn-CwwU-bkbDi_I84" />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop w-full">
            <div className="grid lg:grid-cols-2 gap-gutter items-center">
              <div className="max-w-2xl text-white">
                <h1 className="font-display-lg text-display-lg mb-6 leading-tight">Votre Pont Logistique de la Chine au Burkina Faso</h1>
                <p className="font-body-lg text-body-lg text-surface-container-lowest mb-10 opacity-90">Optimisez votre chaîne d'approvisionnement avec SANA CARGO. On transporte toutes vos marchandises de la Chine vers le Burkina Faso.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                    onClick={() => { const el = document.getElementById('tarifs'); el?.scrollIntoView({ behavior: 'smooth' }) }}>
                    Nouvelle expédition<span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Auth Card */}
              <div className="flex justify-center lg:justify-end" id="auth-card-container">
                <div className="glass-card p-8 rounded-2xl shadow-xl w-full max-w-[450px] text-on-surface form-transition" id="auth-card">
                  {authMode === 'login' ? (
                    <div id="login-state">
                      <h2 className="text-headline-md font-headline-md text-primary mb-2">Connexion Client</h2>
                      <p className="text-body-md text-on-surface-variant mb-6">Accédez à votre espace pour suivre vos expéditions.</p>
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Adresse e-mail</label>
                          <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                            value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="exemple@domaine.com" required type="email" />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Mot de passe</label>
                          <div className="relative">
                            <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                              value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="••••••••" required type={showPass ? 'text' : 'password'} />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary" type="button" onClick={() => setShowPass(!showPass)}>
                              <span className="material-symbols-outlined">visibility</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center gap-2 cursor-pointer"><input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" /><span>Se souvenir de moi</span></label>
                          <a className="text-secondary font-bold hover:underline" href="#">Mot de passe oublié ?</a>
                        </div>
                        <button className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold hover:bg-secondary transition-all shadow-lg" type="submit">Se connecter</button>
                      </form>
                      <div className="mt-6 pt-6 border-t border-outline-variant text-center">
                        <p className="text-body-md text-on-surface-variant">Vous n'avez pas de compte ? <button className="text-secondary font-bold hover:underline" onClick={() => setAuthMode('register')}>Créer un compte</button></p>
                      </div>
                    </div>
                  ) : (
                    <div id="register-state">
                      <h2 className="text-headline-md font-headline-md text-primary mb-2">Créer un compte</h2>
                      <p className="text-body-md text-on-surface-variant mb-6">Rejoignez SANA CARGO pour gérer vos envois.</p>
                      <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Prénom</label>
                            <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                              value={regFname} onChange={e => setRegFname(e.target.value)} placeholder="Jean" required type="text" />
                          </div>
                          <div>
                            <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Nom</label>
                            <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                              value={regLname} onChange={e => setRegLname(e.target.value)} placeholder="Dupont" required type="text" />
                          </div>
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Contact téléphonique</label>
                          <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                            value={regTel} onChange={e => setRegTel(e.target.value)} placeholder="+226 00 00 00 00" required type="tel" />
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Adresse e-mail</label>
                          <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                            value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="exemple@domaine.com" required type="email" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Mot de passe</label>
                            <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                              value={regPass} onChange={e => setRegPass(e.target.value)} placeholder="••••••••" required type="password" />
                          </div>
                          <div>
                            <label className="block font-label-sm text-label-sm text-outline mb-1 uppercase">Confirmation</label>
                            <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary"
                              value={regPassConf} onChange={e => setRegPassConf(e.target.value)} placeholder="••••••••" required type="password" />
                          </div>
                        </div>
                        {passMatchError && <p className="text-error text-xs">Les mots de passe ne correspondent pas.</p>}
                        <button className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold hover:bg-secondary transition-all shadow-lg mt-2" type="submit">Créer mon compte</button>
                      </form>
                      <div className="mt-6 pt-6 border-t border-outline-variant text-center">
                        <p className="text-body-md text-on-surface-variant">Déjà inscrit ? <button className="text-secondary font-bold hover:underline" onClick={() => setAuthMode('login')}>Se connecter</button></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
            <span className="material-symbols-outlined text-4xl">expand_more</span>
          </div>
        </section>

        <ServiceHighlights />
        <TransportSection />
        <ProcessusSection />
        <SuiviSection />
        <TarifsSection calcWeight={calcWeight} setCalcWeight={setCalcWeight} calcBattery={calcBattery} setCalcBattery={setCalcBattery} showCalcResults={showCalcResults} setShowCalcResults={setShowCalcResults} calcPrice={calcPrice} />
      </main>
      <FooterContact />
    </div>
  )
}

// ─── SUB-SECTIONS ──────────────────────────────────────────────────────────

const ServiceHighlights: React.FC = () => (
  <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
    <div className="grid lg:grid-cols-3 gap-gutter">
      {[
        { icon: 'bolt', title: 'Vitesse Record', desc: 'Des liaisons directes de Guangzhou à Ouagadougou. Réduisez vos délais d\'attente de 30% grâce à notre logistique optimisée.' },
        { icon: 'verified_user', title: 'Sécurité Maximale', desc: 'Suivi en temps réel par GPS et assurance cargo complète incluse. Votre marchandise est entre de bonnes mains.' },
        { icon: 'hub', title: 'Routes Directes', desc: 'Évitez les transbordements inutiles. Nous possédons nos propres entrepôts à Yiwu, Guangzhou et Ouagadougou.' },
      ].map(item => (
        <div key={item.title} className="p-stack-lg border border-outline-variant rounded-2xl bg-surface-container-lowest hover:bg-white transition-all hover:shadow-lg group">
          <div className="w-14 h-14 bg-secondary-container rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <span className="material-symbols-outlined text-on-secondary-container text-3xl">{item.icon}</span>
          </div>
          <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
          <p className="text-on-surface-variant">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
)

const TransportSection: React.FC = () => (
  <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto transition-all duration-700 opacity-100 translate-y-0" id="transport">
    <div className="text-center mb-16">
      <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Transport</h2>
      <div className="w-24 h-1.5 bg-secondary-container mx-auto rounded-full"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <div className="md:col-span-8 group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-auto h-[400px] border border-outline-variant hover:border-secondary transition-colors">
        <img alt="Terminal de fret aérien" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwV3wokJOCQxhfbOfj0ybs2dBPQOnSWfg9tOBhQYO2-1fOmhIvwVUzqOU0KZo1xtVrwT3wwFVJ4NpFzP2JM-x-0O5-ucg0guOJP02hfDxVwmdZP25_rOydQ2YGwZgt4fWdK8my0yMEhk7n8Q2uM8jDyG885rDgCKEnuzhqJ9sjdPvR_SjC3lQK7bXbqDsllQI6C2NhbQWx3WklVBhZE-L7U3RylqhaxwpV3NJVcTEM_ygNeLnFm-iD9eGkoorWDJSeJthuXMc" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-stack-lg text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary-fixed-dim">flight_takeoff</span>
            <h3 className="text-2xl font-bold">Fret Aérien</h3>
          </div>
          <p className="max-w-md opacity-80 mb-6">Livraison ultra-rapide en 5 à 7 jours. Idéal pour les marchandises de haute valeur et urgentes.</p>
          <button className="text-secondary-fixed-dim font-bold flex items-center gap-2 hover:underline">En savoir plus <span className="material-symbols-outlined text-sm">open_in_new</span></button>
        </div>
      </div>
      <div className="md:col-span-4 group relative overflow-hidden rounded-2xl h-[400px] border border-outline-variant hover:border-secondary transition-colors">
        <img alt="Conteneurs de fret maritime" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuZb5flCTxJYf0NM40vi0JT-O11ksLHUaqNpXUGnT8jbbrU6lm9tuvrEJFW_bYtlpSwbHzv3iAAtbKJOKMUPqt4A96j613FXCd7jQfUCeiVlsuVolWNzA-WvxJH8sXQnWVGMgXcMe-1Rw9LX1Ok2sGi6_Z8mtkAvJloEhPQIfM4sSaXqvoe78dzjbX2oLvvWgAj6yZfeGaro7esWOwqYwEy3zWLBZs9pIIBsbJGIu7JLHXJwGhQ-lbnmYeyF3hlC5vkCyP61Q" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-stack-lg text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary-fixed-dim">directions_boat</span>
            <h3 className="text-xl font-bold">Fret Maritime</h3>
          </div>
          <p className="opacity-80 mb-6">Conteneurs complets (FCL) pour vos importations massives.</p>
          <button className="text-secondary-fixed-dim font-bold flex items-center gap-2 hover:underline">Détails</button>
        </div>
      </div>
      <div className="md:col-span-12 group relative overflow-hidden rounded-2xl h-[250px] border border-outline-variant hover:border-secondary transition-colors bg-primary-container">
        <div className="flex flex-col md:flex-row h-full">
          <div className="p-stack-lg flex-1 text-white flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary-fixed-dim">widgets</span>
              <h3 className="text-2xl font-bold">Groupage (LCL)</h3>
            </div>
            <p className="max-w-xl opacity-80">Partagez l'espace d'un conteneur et réduisez vos coûts. Solution flexible pour les petites et moyennes entreprises.</p>
          </div>
          <div className="hidden md:block w-1/3 relative">
            <img alt="Logistique d'entrepôt" className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLA1vc1p7uaFtOLoW5vO1ZNObBVWHodk6zV-Kh5HMhXoeGPgszlpU8be2pHx3HavwZ95_PZLxd6wue_Xf6Rt3aIxfNGg0RdWLX8-Mpk1kv_M_7u0qN8xABP562DMReJani9FKN_5mwLCaY3EKeFr3om7SMfU74zmD1Nd-T08K9afX5i13OGheThGjtPGU9ow0--rlVhgThkn6EKSIGqEP_0Cwy4wwgpT0EPmxZp7IuiyOUgAVHvFPpficJtQB7vEcJJj57a6Q" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const ProcessusSection: React.FC = () => (
  <section className="py-stack-lg bg-surface-container-lowest border-y border-outline-variant transition-all duration-700 opacity-100 translate-y-0" id="processus-expedition">
    <div className="max-w-container-max mx-auto px-margin-desktop">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Processus d'Expédition</h2>
        <div className="w-24 h-1.5 bg-secondary-container mx-auto rounded-full"></div>
        <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">Suivez le parcours de vos marchandises, de l'entrepôt de votre fournisseur jusqu'à notre siège à Ouagadougou.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { n: 1, icon: 'shopping_cart', title: 'Commande fournisseur', desc: 'Vous passez commande auprès de votre fournisseur en Chine.' },
          { n: 2, icon: 'local_shipping', title: 'Livraison SANA (Chine)', desc: 'Le fournisseur livre vos colis à notre entrepôt de Guangzhou ou Yiwu.' },
          { n: 3, icon: 'inventory_2', title: 'Stockage & Attente', desc: 'Vérification, emballage et consolidation en attente du prochain départ.' },
          { n: 4, icon: 'flight_takeoff', title: 'Transit International', desc: 'Expédition par voie aérienne ou maritime selon votre choix.' },
          { n: 5, icon: 'local_shipping', title: 'Acheminement routier', desc: 'Transport sécurisé par camion vers Ouagadougou.' },
          { n: 6, icon: 'gavel', title: 'Dédouanement', desc: 'Formalités douanières et arrivée finale à notre siège au Burkina.' },
          { n: 7, icon: 'package_2', title: 'Mise à disposition', desc: 'Vous êtes notifié pour le retrait de votre marchandise ou livraison locale.', wide: true },
        ].map(step => (
          <div key={step.n} className={`relative p-6 border border-outline-variant rounded-2xl bg-surface hover:shadow-md transition-all group${step.wide ? ' lg:col-span-2' : ''}`}>
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold z-10">{step.n}</div>
            <div className="w-12 h-12 bg-secondary-container/10 rounded-xl flex items-center justify-center mb-4 text-secondary">
              <span className="material-symbols-outlined">{step.icon}</span>
            </div>
            <h3 className="font-bold text-primary mb-2">{step.title}</h3>
            <p className="text-sm text-on-surface-variant">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const SuiviSection: React.FC = () => (
  <section className="py-stack-lg bg-surface border-b border-outline-variant transition-all duration-700 opacity-100 translate-y-0" id="suivi">
    <div className="max-w-container-max mx-auto px-margin-desktop">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Suivez votre colis en temps réel</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">Entrez votre numéro de suivi pour connaître l'état actuel de votre expédition.</p>
      </div>
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 p-2 bg-surface-container-low rounded-2xl border border-outline-variant shadow-sm">
          <div className="flex-1 flex items-center px-4 gap-3">
            <span className="material-symbols-outlined text-outline">search</span>
            <input className="w-full bg-transparent border-none focus:ring-0 font-tracking-number text-primary placeholder:text-outline" placeholder="Entrez votre numéro de suivi" type="text" />
          </div>
          <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-md flex items-center justify-center gap-2">Suivant &gt;</button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white border border-outline-variant rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary/5 p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-xs font-label-sm text-outline uppercase mb-1">Numéro de suivi</p>
            <p className="font-tracking-number font-bold text-primary">SC-2026-001254</p>
          </div>
          <div>
            <p className="text-xs font-label-sm text-outline uppercase mb-1">Statut</p>
            <p className="font-bold text-secondary">Expédition en cours</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-label-sm text-outline uppercase mb-1">Dernière mise à jour</p>
            <p className="text-body-md">10 juin 2026 à 14h35</p>
          </div>
        </div>
        <div className="p-8">
          <div className="relative">
            <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-highest z-0"></div>
            <div className="absolute top-5 left-0 w-1/2 h-1 bg-secondary-container z-0"></div>
            <div className="relative z-10 flex justify-between">
              {[
                { label: 'Colis enregistré', done: true },
                { label: 'Colis reçu', done: true },
                { label: 'Contrôle et préparation', done: true },
                { label: 'Expédition en cours', active: true },
                { label: 'Arrivé destination', pending: true },
                { label: 'En cours de livraison', pending: true },
                { label: 'Livré', pending: true },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  {s.done && (
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  )}
                  {s.active && (
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md ring-4 ring-secondary-container/20">
                      <span className="material-symbols-outlined text-sm">local_shipping</span>
                    </div>
                  )}
                  {s.pending && (
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest text-outline flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-outline/30"></div>
                    </div>
                  )}
                  <span className={`text-[10px] font-bold text-center max-w-[80px]${s.done ? ' text-primary' : s.active ? ' text-secondary' : ' text-outline'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

interface TarifsProps {
  calcWeight: string; setCalcWeight: (v: string) => void
  calcBattery: string; setCalcBattery: (v: string) => void
  showCalcResults: boolean; setShowCalcResults: (v: boolean) => void
  calcPrice: () => string
}
const TarifsSection: React.FC<TarifsProps> = ({ calcWeight, setCalcWeight, calcBattery, setCalcBattery, showCalcResults, setShowCalcResults, calcPrice }) => (
  <section className="py-stack-lg bg-surface-container-low border-y border-outline-variant relative overflow-hidden transition-all duration-700 opacity-100 translate-y-0" id="tarifs">
    <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
      <div className="grid lg:grid-cols-2 gap-gutter items-center max-w-4xl mx-auto">
        <div className="text-center lg:text-left">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Simulateur de Tarifs en Temps Réel</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Obtenez une estimation précise instantanément. Nos tarifs sont basés sur le marché actuel pour vous garantir le meilleur prix.</p>
          <ul className="space-y-4 inline-block text-left">
            <li className="flex items-center gap-3 text-primary font-bold"><span className="material-symbols-outlined text-secondary">check_circle</span>Transparence totale, sans frais cachés</li>
            <li className="flex items-center gap-3 text-primary font-bold"><span className="material-symbols-outlined text-secondary">check_circle</span>Mise à jour hebdomadaire des taux</li>
          </ul>
        </div>
        <div className="glass-card p-stack-lg rounded-2xl shadow-xl border-outline-variant">
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-outline mb-2 uppercase">Poids du colis (kg)</label>
                <input className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 font-tracking-number focus:ring-2 focus:ring-primary text-on-surface"
                  value={calcWeight} onChange={e => setCalcWeight(e.target.value)} placeholder="0.00" step="0.01" type="number" />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-outline mb-2 uppercase">Le colis contient-il une batterie ?</label>
                <select className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 font-body-md focus:ring-2 focus:ring-primary text-on-surface"
                  value={calcBattery} onChange={e => setCalcBattery(e.target.value)}>
                  <option value="non">Non</option>
                  <option value="oui">Oui</option>
                </select>
              </div>
              <button className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold hover:bg-secondary transition-all shadow-lg"
                onClick={() => setShowCalcResults(true)} type="button">Calculer le tarif</button>
              {showCalcResults && (
                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-2">
                  <p className="text-body-md"><strong>Poids :</strong> {calcWeight || '-'} kg</p>
                  <p className="text-body-md"><strong>Batterie :</strong> {calcBattery === 'oui' ? 'Oui' : 'Non'}</p>
                  <p className="text-headline-md text-primary"><strong>Tarif estimé :</strong> {calcPrice()} FCFA</p>
                </div>
              )}
              <p className="text-center text-xs text-outline italic mt-4">Ce tarif est fourni à titre indicatif. Le montant définitif sera confirmé après réception et vérification du colis.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
)

export const FooterContact: React.FC = () => (
  <footer className="bg-primary text-on-primary mt-20 transition-all duration-700 opacity-100 translate-y-0" id="contact">
    <div className="w-full py-stack-lg px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-container-max mx-auto">
      <div className="space-y-6">
        <h3 className="font-headline-md text-headline-md text-primary-fixed">SANA CARGO</h3>
        <p className="opacity-70 text-body-md">Le leader de la logistique spécialisée entre la Chine et le Burkina Faso. Excellence, Rapidité, Intégrité.</p>
        <div className="flex gap-4">
          <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary-container hover:text-on-secondary-container transition-all" href="#">
            <span className="material-symbols-outlined">face_nod</span>
          </a>
          <a className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary-container hover:text-on-secondary-container transition-all" href="#">
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Services</h4>
        <ul className="space-y-4 opacity-70">
          {['Fret Aérien Express', 'Fret Maritime Complet', 'Groupage Maritime', 'Dédouanement'].map(s => (
            <li key={s}><a className="hover:text-secondary-fixed transition-colors" href="#">{s}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Liens Utiles</h4>
        <ul className="space-y-4 opacity-70">
          {["Routes d'Expédition", 'Planning des Ports', 'Conditions Générales', 'Politique de Confidentialité'].map(s => (
            <li key={s}><a className="hover:text-secondary-fixed transition-colors" href="#">{s}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Contact</h4>
        <ul className="space-y-4 opacity-70">
          <li className="flex items-start gap-3"><span className="material-symbols-outlined text-secondary-fixed">location_on</span>Ouagadougou, Zone Industrielle</li>
          <li className="flex items-start gap-3"><span className="material-symbols-outlined text-secondary-fixed">phone</span>+226 25 33 XX XX</li>
          <li className="flex items-start gap-3"><span className="material-symbols-outlined text-secondary-fixed">mail</span>contact@sanacargo.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 py-6 text-center opacity-50 text-sm">
      <p>© 2024 SANA CARGO Logistics. China-Burkina Faso Passage.</p>
    </div>
  </footer>
)

export default Accueil

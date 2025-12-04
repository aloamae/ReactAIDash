import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Calendar, CheckCircle, AlertCircle, Users, Target, Clock, 
  TrendingUp, DollarSign, Award, Shield, Zap
} from 'lucide-react';

// Données du projet MAIROLAB extraites du PRD
const projectData = {
  projectName: "MAIROLAB",
  subtitle: "Plateforme Collaborative d'Intelligence Collective",
  version: "1.0",
  status: "En cours - Phase 1 MVP",
  
  // Vision et objectifs stratégiques
  vision: "Rendre l'intelligence collective accessible, structurée et efficace pour tous les ateliers collaboratifs",
  
  // Métriques clés sur 3 ans
  metrics: [
    { year: 'Année 1\n(2025)', clients: 100, arr: 500, workshops: 12000, users: 2500, nps: 50 },
    { year: 'Année 2\n(2026)', clients: 500, arr: 2000, workshops: 60000, users: 12500, nps: 60 },
    { year: 'Année 3\n(2027)', clients: 1500, arr: 5000, workshops: 180000, users: 37500, nps: 70 }
  ],
  
  // Phases du projet
  phases: [
    {
      id: 'phase0',
      name: 'Phase 0: Discovery & Design',
      period: 'Q4 2024',
      duration: '3 mois',
      budget: '60K€',
      team: 3,
      status: 'completed',
      progress: 100,
      objectives: [
        'Valider le problème et le marché',
        'Finaliser les spécifications fonctionnelles',
        'Créer les maquettes Figma finales',
        'Définir l\'architecture technique'
      ]
    },
    {
      id: 'phase1',
      name: 'Phase 1: MVP Core',
      period: 'Q1-Q2 2025',
      duration: '6 mois',
      budget: '500K€',
      team: 8,
      status: 'inProgress',
      progress: 35,
      objectives: [
        'Lancer la plateforme avec 3 modules core',
        'Acquérir 100 organisations clientes',
        'Atteindre un NPS > 50',
        'Sécuriser 1000+ workshops réalisés'
      ]
    },
    {
      id: 'phase2',
      name: 'Phase 2: Growth Features',
      period: 'Q3-Q4 2025',
      duration: '6 mois',
      budget: '600K€',
      team: 12,
      status: 'notStarted',
      progress: 0,
      objectives: [
        'Passer à 500 organisations clientes',
        'Lancer modules avancés',
        'Intégrer IA générative',
        'Réduire le churn < 8%'
      ]
    },
    {
      id: 'phase3',
      name: 'Phase 3: Scale & Enterprise',
      period: '2026',
      duration: '12 mois',
      budget: '1500K€',
      team: 20,
      status: 'notStarted',
      progress: 0,
      objectives: [
        'Expansion à 1500 clients',
        'Certifier ISO 27001 et SOC 2',
        'Offre Enterprise + On-Premise',
        'ARR 5M€'
      ]
    }
  ],
  
  // Milestones Phase 1 (détaillées)
  milestones: [
    {
      id: 'M1',
      name: 'Infrastructure & Auth',
      phase: 'Phase 1',
      period: 'M1-M2',
      status: 'completed',
      progress: 100,
      priority: 'P0',
      team: ['2 Backend Dev', '1 DevOps'],
      deliverables: [
        'Setup infrastructure (Docker + Kubernetes)',
        'Backend Fastify + PostgreSQL + Redis',
        'Authentification OAuth 2.0 (Keycloak)',
        'Multi-tenancy',
        'CI/CD (GitHub Actions)'
      ]
    },
    {
      id: 'M2',
      name: 'Module Créativité',
      phase: 'Phase 1',
      period: 'M2-M3',
      status: 'inProgress',
      progress: 60,
      priority: 'P0',
      team: ['2 Frontend Dev', '1 Backend Dev', '1 QA'],
      deliverables: [
        'Frontend Angular (Standalone Components)',
        'Création colonnes personnalisées',
        'Mode drag & drop + clic-clic',
        'Synchronisation temps réel (Yjs CRDT)',
        'Phases progressives (individuel → collectif)'
      ]
    },
    {
      id: 'M3',
      name: 'Module Vote',
      phase: 'Phase 1',
      period: 'M3-M4',
      status: 'notStarted',
      progress: 0,
      priority: 'P0',
      team: ['2 Frontend Dev', '1 Backend Dev', '1 Data Viz'],
      deliverables: [
        'Configuration critères de vote',
        'Interface de vote (étoiles, slider)',
        'Calcul résultats (moyennes pondérées)',
        'Visualisations avancées (radar, nuages)',
        'Export PDF'
      ]
    },
    {
      id: 'M4',
      name: 'Module Matrice',
      phase: 'Phase 1',
      period: 'M4-M5',
      status: 'notStarted',
      progress: 0,
      priority: 'P0',
      team: ['2 Frontend Dev', '1 Backend Dev'],
      deliverables: [
        'Création de matrices (colonnes × lignes)',
        '5 types de cellules (choix, date, texte)',
        'Personnalisation visuelle',
        'Indentation et hiérarchie',
        'Export Excel'
      ]
    },
    {
      id: 'M5',
      name: 'Poste de Pilotage & Exports',
      phase: 'Phase 1',
      period: 'M5-M6',
      status: 'notStarted',
      progress: 0,
      priority: 'P0',
      team: ['1 Frontend Dev', '1 Backend Dev', '1 Tech Writer'],
      deliverables: [
        'Dashboard administrateur centralisé',
        'Gestion des droits (granulaire)',
        'Mode asynchrone',
        'Exports multi-formats (PDF, Excel, PPT)',
        'Documentation utilisateur'
      ]
    },
    {
      id: 'M6',
      name: 'Beta Privée & Launch',
      phase: 'Phase 1',
      period: 'M6',
      status: 'notStarted',
      progress: 0,
      priority: 'P0',
      team: ['Toute l\'équipe', '1 Marketing', '1 Customer Success'],
      deliverables: [
        'Beta privée : 30 facilitateurs',
        'Audit sécurité (pentest)',
        'Audit accessibilité (WCAG 2.1 AA)',
        'Launch public',
        'NPS > 50'
      ]
    }
  ],
  
  // Différenciateurs clés (justification des features)
  differentiators: [
    { name: 'Accessibilité', value: 95, justification: 'Mode clic-clic, WCAG 2.1 AA - 30% des participants galèrent avec drag & drop' },
    { name: 'CRDT (Yjs)', value: 90, justification: 'Zéro conflit avec 25 participants simultanés - vs Excel partagé qui perd des données' },
    { name: 'Workflows', value: 85, justification: 'Processus guidés - vs Miro "canvas vide intimidant" où 80% des idées sont perdues' },
    { name: 'Visualisations', value: 80, justification: 'Graphiques automatiques - Facilitateurs perdent 2h à compiler résultats' },
    { name: 'Sécurité', value: 88, justification: 'AES-256, OAuth 2.0, RGPD native - Critère essentiel pour 75% des entreprises' }
  ],
  
  // KPIs de succès (mesurabilité)
  kpis: [
    { category: 'Adoption', metrics: [
      { name: 'MAU', target: '2 500', current: '450', unit: 'users' },
      { name: 'Workshops/mois', target: '1 000', current: '180', unit: '' },
      { name: 'Taux activation', target: '60%', current: '42%', unit: '' }
    ]},
    { category: 'Engagement', metrics: [
      { name: 'Contributions/participant', target: '15', current: '12', unit: '' },
      { name: 'Durée session', target: '45min', current: '38min', unit: '' },
      { name: 'Taux complétion', target: '85%', current: '72%', unit: '' }
    ]},
    { category: 'Qualité', metrics: [
      { name: 'NPS', target: '>50', current: '48', unit: '' },
      { name: 'CSAT', target: '4.5/5', current: '4.2/5', unit: '' },
      { name: 'Taux erreur', target: '<2%', current: '3.1%', unit: '' }
    ]},
    { category: 'Business', metrics: [
      { name: 'MRR', target: '42K€', current: '18K€', unit: '' },
      { name: 'ARR', target: '500K€', current: '216K€', unit: '' },
      { name: 'Churn', target: '<10%', current: '12%', unit: '' }
    ]}
  ],
  
  // Risques et mitigations
  risks: [
    { 
      name: 'Mauvaise adéquation produit-marché', 
      probability: 'Faible', 
      impact: 'Critique',
      status: 'mitigated',
      mitigation: 'Beta privée 3 mois + Feedback continu NPS/CSAT'
    },
    { 
      name: 'Complexité perçue', 
      probability: 'Moyenne', 
      impact: 'Fort',
      status: 'monitoring',
      mitigation: 'Tests utilisateurs + Mode clic-clic + Onboarding interactif'
    },
    { 
      name: 'Bugs critiques en production', 
      probability: 'Moyenne', 
      impact: 'Fort',
      status: 'monitoring',
      mitigation: 'Couverture tests >80% + Monitoring 24/7'
    },
    { 
      name: 'Acquisition clients lente', 
      probability: 'Moyenne', 
      impact: 'Fort',
      status: 'active',
      mitigation: 'Partenariats cabinets conseil + Freemium agressif'
    }
  ]
};

const COLORS = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#a855f7',
  pink: '#ec4899',
  teal: '#14b8a6',
  indigo: '#6366f1',
  completed: '#22c55e',
  inProgress: '#3b82f6',
  notStarted: '#e5e7eb'
};

const Dashboard = () => {
  const [selectedPhase, setSelectedPhase] = useState('phase1');
  const [view, setView] = useState('overview'); // overview, roadmap, kpis, risks

  // Calculs dérivés
  const currentPhase = projectData.phases.find(p => p.id === selectedPhase);
  const phaseMilestones = projectData.milestones.filter(m => m.phase === currentPhase?.name);
  
  const overallProgress = useMemo(() => {
    const completedMilestones = projectData.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completedMilestones / projectData.milestones.length) * 100);
  }, []);

  const budgetData = projectData.phases.map(p => ({
    name: p.name.split(':')[1]?.trim() || p.name,
    budget: parseInt(p.budget.replace('K€', '')) * 1000,
    team: p.team
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header Exécutif */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {projectData.projectName}
              </h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {projectData.status}
              </span>
            </div>
            <p className="text-xl text-slate-600 mb-4">{projectData.subtitle}</p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-slate-700 italic font-medium">
                <span className="text-blue-600 font-bold">Vision:</span> {projectData.vision}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500 mb-2">Version {projectData.version}</div>
            <div className="text-sm text-slate-500">Mis à jour: 3 Déc 2025</div>
          </div>
        </div>
      </div>

      {/* Navigation des vues */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-6 flex gap-2">
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: Target },
          { id: 'roadmap', label: 'Roadmap & Actions', icon: Calendar },
          { id: 'kpis', label: 'KPIs & Mesures', icon: TrendingUp },
          { id: 'risks', label: 'Risques & Décisions', icon: AlertCircle }
        ].map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
              view === v.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <v.icon className="w-5 h-5" />
            {v.label}
          </button>
        ))}
      </div>

      {/* Vue d'ensemble */}
      {view === 'overview' && (
        <>
          {/* Métriques Clés */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-600">Progression Globale</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">{overallProgress}%</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                  style={{width: `${overallProgress}%`}}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-600">Budget Phase 1</h3>
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800">500K€</div>
              <div className="text-sm text-slate-500">6 mois • 8 personnes</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-600">Objectif ARR An 1</h3>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800">500K€</div>
              <div className="text-sm text-green-600 font-medium">↗ 100 clients actifs</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-600">Objectif NPS</h3>
                <Award className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800">&gt;50</div>
              <div className="text-sm text-slate-500">Actuel: 48 (proche)</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-600">Différenciation</h3>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-slate-800">5</div>
              <div className="text-sm text-slate-500">Avantages clés</div>
            </div>
          </div>

          {/* Métriques 3 ans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Croissance sur 3 ans (Business Plan)
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={projectData.metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#64748b" style={{fontSize: '12px'}} />
                  <YAxis stroke="#64748b" style={{fontSize: '12px'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="clients" stroke="#3b82f6" strokeWidth={3} name="Clients" />
                  <Line type="monotone" dataKey="arr" stroke="#a855f7" strokeWidth={3} name="ARR (K€)" />
                  <Line type="monotone" dataKey="nps" stroke="#22c55e" strokeWidth={3} name="NPS" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Différenciateurs (Justification Features)
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={projectData.differentiators}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" style={{fontSize: '11px'}} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Impact" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value, name, props) => [
                      <div key="tooltip">
                        <div className="font-semibold">{value}%</div>
                        <div className="text-xs text-slate-600 mt-1 max-w-xs">{props.payload.justification}</div>
                      </div>
                    ]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timeline des phases */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Roadmap Stratégique (4 Phases)
            </h2>
            <div className="space-y-4">
              {projectData.phases.map((phase, idx) => (
                <div key={phase.id} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'inProgress' ? 'bg-blue-500' :
                        'bg-slate-300'
                      }`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{phase.name}</h3>
                          <p className="text-sm text-slate-500">{phase.period} • {phase.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">{phase.budget}</div>
                          <div className="text-sm text-slate-500">{phase.team} personnes</div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progression</span>
                          <span className="font-semibold text-slate-800">{phase.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              phase.status === 'completed' ? 'bg-green-500' :
                              phase.status === 'inProgress' ? 'bg-blue-500' :
                              'bg-slate-300'
                            }`}
                            style={{width: `${phase.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {phase.objectives.map((obj, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              phase.status === 'completed' ? 'text-green-500' :
                              phase.status === 'inProgress' ? 'text-blue-500' :
                              'text-slate-300'
                            }`} />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {idx < projectData.phases.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Budget par phase */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Budget & Ressources (Aide à la Décision)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#64748b" style={{fontSize: '12px'}} />
                <YAxis stroke="#64748b" style={{fontSize: '12px'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => [`${(value / 1000).toFixed(0)}K€`, 'Budget']}
                />
                <Legend />
                <Bar dataKey="budget" fill="#3b82f6" name="Budget (€)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="team" fill="#a855f7" name="Équipe (personnes)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Vue Roadmap & Actions */}
      {view === 'roadmap' && (
        <>
          {/* Sélecteur de phase */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex gap-2">
              {projectData.phases.map(phase => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedPhase === phase.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <div className="text-sm font-bold">{phase.name.split(':')[0]}</div>
                  <div className="text-xs opacity-80">{phase.period}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Détails de la phase sélectionnée */}
          {currentPhase && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentPhase.name}</h2>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {currentPhase.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {currentPhase.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {currentPhase.team} personnes
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600 mb-1">{currentPhase.progress}%</div>
                  <div className="text-sm text-slate-500">Progression</div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                <h3 className="font-semibold text-blue-900 mb-3">Objectifs Stratégiques</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentPhase.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-blue-800">
                      <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Milestones détaillés */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Actions & Livrables (Priorisation MVP vs Post-MVP)
            </h2>
            <div className="space-y-4">
              {phaseMilestones.map(milestone => (
                <div key={milestone.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">{milestone.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          milestone.priority === 'P0' ? 'bg-red-100 text-red-700' :
                          milestone.priority === 'P1' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {milestone.priority} - Critique
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                          milestone.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {milestone.status === 'completed' ? 'Terminé' :
                           milestone.status === 'inProgress' ? 'En cours' :
                           'À venir'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 mb-3">{milestone.period}</div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                        <Users className="w-4 h-4" />
                        <span>{milestone.team.join(' • ')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-800 mb-1">{milestone.progress}%</div>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'inProgress' ? 'bg-blue-500' :
                            'bg-slate-300'
                          }`}
                          style={{width: `${milestone.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Livrables clés:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {milestone.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm bg-slate-50 p-2 rounded">
                          <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            milestone.status === 'completed' ? 'text-green-500' :
                            milestone.status === 'inProgress' ? 'text-blue-500' :
                            'text-slate-300'
                          }`} />
                          <span className="text-slate-700">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vue KPIs */}
      {view === 'kpis' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              KPIs de Succès (Mesurabilité Précise)
            </h2>
            <div className="space-y-6">
              {projectData.kpis.map(category => (
                <div key={category.category}>
                  <h3 className="text-md font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.metrics.map(metric => {
                      const current = parseFloat(metric.current.replace(/[^\d.]/g, ''));
                      const target = parseFloat(metric.target.replace(/[^\d.]/g, ''));
                      const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
                      
                      return (
                        <div key={metric.name} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="text-sm text-slate-600 mb-2">{metric.name}</div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-bold text-slate-800">{metric.current}</span>
                            <span className="text-sm text-slate-500">/ {metric.target}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                            <div 
                              className={`h-2 rounded-full ${
                                progress >= 80 ? 'bg-green-500' :
                                progress >= 50 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{width: `${progress}%`}}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-500">
                            {progress >= 80 ? '✓ Sur la bonne voie' :
                             progress >= 50 ? '⚠ Nécessite attention' :
                             '⚠ Action requise'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tableau de synthèse */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Évolution Métriques Business (3 ans)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Métrique</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Année 1 (2025)</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Année 2 (2026)</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Année 3 (2027)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Clients actifs</td>
                    <td className="text-center py-3 px-4">100</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">500</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">1 500</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">ARR (K€)</td>
                    <td className="text-center py-3 px-4">500</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">2 000</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">5 000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Workshops/mois</td>
                    <td className="text-center py-3 px-4">1 000</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">5 000</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">15 000</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">Utilisateurs</td>
                    <td className="text-center py-3 px-4">2 500</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">12 500</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">37 500</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium">NPS</td>
                    <td className="text-center py-3 px-4">&gt;50</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">&gt;60</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">&gt;70</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Churn</td>
                    <td className="text-center py-3 px-4">&lt;10%</td>
                    <td className="text-center py-3 px-4 text-blue-600 font-semibold">&lt;8%</td>
                    <td className="text-center py-3 px-4 text-purple-600 font-semibold">&lt;5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Vue Risques */}
      {view === 'risks' && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Gestion des Risques & Aide à la Décision
            </h2>
            <div className="space-y-4">
              {projectData.risks.map((risk, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        risk.status === 'mitigated' ? 'bg-green-100' :
                        risk.status === 'monitoring' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <AlertCircle className={`w-6 h-6 ${
                          risk.status === 'mitigated' ? 'text-green-600' :
                          risk.status === 'monitoring' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{risk.name}</h3>
                      <div className="flex gap-4 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          risk.probability === 'Faible' ? 'bg-green-100 text-green-700' :
                          risk.probability === 'Moyenne' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          Probabilité: {risk.probability}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          risk.impact === 'Critique' || risk.impact === 'Fort' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          Impact: {risk.impact}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          risk.status === 'mitigated' ? 'bg-green-100 text-green-700' :
                          risk.status === 'monitoring' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {risk.status === 'mitigated' ? '✓ Mitigé' :
                           risk.status === 'monitoring' ? '⚠ Surveillance' :
                           '⚠ Action requise'}
                        </span>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                        <div className="text-sm font-semibold text-blue-900 mb-1">Stratégie de mitigation:</div>
                        <div className="text-sm text-blue-800">{risk.mitigation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matrice risques */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Matrice Risques (Probabilité vs Impact)</h2>
            <div className="grid grid-cols-3 gap-4 h-96">
              <div className="row-span-3 flex items-end justify-center text-sm font-semibold text-slate-600 -rotate-90">
                Impact
              </div>
              <div className="col-span-2 flex justify-center items-center bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="font-semibold text-red-800 mb-2">CRITIQUE</div>
                  <div className="text-xs text-red-600">
                    {projectData.risks.filter(r => r.impact === 'Critique').map(r => r.name.split(' ')[0]).join(', ')}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-center items-center bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="font-semibold text-yellow-800 mb-2">FORT</div>
                  <div className="text-xs text-yellow-600">
                    {projectData.risks.filter(r => r.impact === 'Fort').map(r => r.name.split(' ')[0]).join(', ')}
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-center items-center bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="font-semibold text-green-800 mb-2">FAIBLE</div>
                  <div className="text-xs text-green-600">Acceptable</div>
                </div>
              </div>
              <div className="col-span-3 flex justify-center items-center text-sm font-semibold text-slate-600">
                Probabilité
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2 px-16">
              <span>Faible</span>
              <span>Moyenne</span>
              <span>Élevée</span>
            </div>
          </div>
        </>
      )}

      {/* Footer avec légende */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Alignement Équipe
            </h3>
            <p className="text-sm text-slate-600">
              Vision claire partagée par tous les stakeholders : facilitateurs, participants, décideurs
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Priorisation
            </h3>
            <p className="text-sm text-slate-600">
              Features MVP (P0) vs Post-MVP clairement identifiées avec justification business
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Mesurabilité
            </h3>
            <p className="text-sm text-slate-600">
              KPIs précis pour suivre le succès (NPS, ARR, Churn, Adoption) avec cibles quantifiées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
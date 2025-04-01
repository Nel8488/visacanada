import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Menu, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), formData);
      alert('Message envoyé avec succès!');
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'procedures', label: 'Procédures' },
    { id: 'eligibilite', label: 'Éligibilité' },
    { id: 'conseils', label: 'Conseils' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
    { id: 'ressources', label: 'Ressources' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'procedures':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Procédures de Demande</h2>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">1. Évaluation Initiale</h3>
                <p className="text-gray-600">Commencez par évaluer votre admissibilité en fonction de vos qualifications et de vos objectifs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">2. Préparation des Documents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Passeport valide</li>
                  <li>Diplômes et relevés de notes</li>
                  <li>Certificats de travail</li>
                  <li>Résultats de tests linguistiques</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">3. Soumission de la Demande</h3>
                <p className="text-gray-600">Suivez notre guide étape par étape pour soumettre votre demande en ligne.</p>
              </div>
            </div>
          </div>
        );

      case 'eligibilite':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Critères d&apos;Éligibilité</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Visa de Travail</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Offre d&apos;emploi valide d&apos;un employeur canadien</li>
                  <li>EIMT positive</li>
                  <li>Qualifications requises pour le poste</li>
                  <li>Fonds suffisants pour l&apos;installation</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Visa d&apos;Études</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Lettre d&apos;acceptation d&apos;une institution canadienne</li>
                  <li>Preuve de capacité financière</li>
                  <li>Compétences linguistiques</li>
                  <li>Casier judiciaire vierge</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'conseils':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Conseils et Astuces</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Préparation</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Commencez tôt la préparation</li>
                  <li>Organisez vos documents</li>
                  <li>Vérifiez les délais de traitement</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Documents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Utilisez des traductions certifiées</li>
                  <li>Conservez des copies</li>
                  <li>Respectez les formats demandés</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Entrevue</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Préparez vos réponses</li>
                  <li>Soyez ponctuel</li>
                  <li>Apportez tous les documents</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Nos Coordonnées</h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" />
                    Montréal, QC, Canada
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    +2250586682267
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    contact@visaguide.ca
                  </p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Hero Section */}
            <div 
              className="relative bg-cover bg-center py-32" 
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
              }}
            >
              <div className="container mx-auto px-4 text-center text-white">
                <h1 className="text-5xl font-bold mb-6">Votre Voyage au Canada Commence Ici</h1>
                <p className="text-xl mb-8">
                  Simplifiez votre processus d&apos;immigration avec notre guide expert des visas canadiens. 
                  Nous vous accompagnons à chaque étape.
                </p>
                <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300">
                  Commencer Maintenant
                </button>
              </div>
            </div>

            {/* Visa Types Section */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Types de Visa</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Visa de Travail',
                      description: 'Pour les professionnels souhaitant travailler au Canada',
                      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                      title: "Visa d&apos;Études",
                      description: 'Pour les étudiants internationaux',
                      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    },
                    {
                      title: 'Résidence Permanente',
                      description: "Pour s&apos;établir définitivement au Canada",
                      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }
                  ].map((visa, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img src={visa.image} alt={visa.title} className="w-full h-48 object-cover"/>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{visa.title}</h3>
                        <p className="text-gray-600">{visa.description}</p>
                        <button className="mt-4 text-red-600 font-semibold hover:text-red-700">
                          En savoir plus →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Processus de Demande</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { step: 1, title: 'Évaluation', description: 'Vérifiez votre éligibilité' },
                    { step: 2, title: 'Documentation', description: 'Rassemblez vos documents' },
                    { step: 3, title: 'Soumission', description: 'Déposez votre demande' },
                    { step: 4, title: 'Suivi', description: 'Suivez votre dossier' }
                  ].map((process, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {process.step}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-bold">Visa Canada</a>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-red-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`hover:text-gray-200 ${activeTab === item.id ? 'font-semibold' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 ${
                      activeTab === item.id ? 'bg-red-700' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">À propos</h3>
              <p className="text-gray-400">
                VisaGuide Canada vous accompagne dans votre processus d&apos;immigration au Canada avec 
                des informations fiables et actualisées.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> Montréal, QC, Canada</p>
                <p className="flex items-center"><Phone className="w-5 h-5 mr-2" /> +2250586682267</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-2" /> contact@visaguide.ca</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleTabClick('accueil')} className="hover:text-white">Accueil</button></li>
                <li><button onClick={() => handleTabClick('procedures')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => handleTabClick('faq')} className="hover:text-white">FAQ</button></li>
                <li><button onClick={() => handleTabClick('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-red-600"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="hover:text-red-600"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="hover:text-red-600"><Linkedin className="w-6 h-6" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 VisaGuide Canada. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
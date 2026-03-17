const villaImg = 'https://images.unsplash.com/photo-1650519876461-c516be8be76c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHN3aW1taW5nJTIwcG9vbCUyMHRyb3BpY2FsfGVufDF8fHx8MTc3MjM3NjI3Mnww&ixlib=rb-4.1.0&q=80&w=600';
const apartmentImg = 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcyMzEyODQ1fDA&ixlib=rb-4.1.0&q=80&w=600';
const penthouseImg = 'https://images.unsplash.com/photo-1744368092994-86779aeed0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBjaXR5JTIwdmlldyUyMGJlZHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzcyMzc2Mjc1fDA&ixlib=rb-4.1.0&q=80&w=600';
const houseImg = 'https://images.unsplash.com/photo-1616970972068-4fe847e642da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGZhY2FkZSUyMGFyY2hpdGVjdHVyZSUyMGRha2FyfGVufDF8fHx8MTc3MjM3NjI3NXww&ixlib=rb-4.1.0&q=80&w=600';
const officeImg = 'https://images.unsplash.com/photo-1742156524915-f72d6332f38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjM3NjI3NXww&ixlib=rb-4.1.0&q=80&w=600';
const luxuryImg = 'https://images.unsplash.com/photo-1746458258536-b9ee5db20a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MjI5Mjc3N3ww&ixlib=rb-4.1.0&q=80&w=600';

export interface Property {
  id: number;
  title: string;
  price: number;
  priceLabel: string;
  location: string;
  zone: string;
  surface: number;
  surfaceLabel: string;
  bedrooms: number;
  bathrooms: number;
  type: 'Vente' | 'Location';
  category: string;
  img: string;
  badge: string;
  featured: boolean;
  description: string;
  descriptionFull: string;
  features: string[];
  images: string[];
  yearBuilt?: number;
  parking?: number;
  floor?: number;
  availableFrom?: string;
}

export const allProperties: Property[] = [
  {
    id: 1,
    title: 'Villa Moderne Almadies',
    price: 250000000,
    priceLabel: '250 000 000 FCFA',
    location: 'Les Almadies, Dakar',
    zone: 'Almadies',
    surface: 350,
    surfaceLabel: '350 m²',
    bedrooms: 5,
    bathrooms: 3,
    type: 'Vente',
    category: 'Villa',
    img: villaImg,
    badge: 'Nouveau',
    featured: true,
    description: 'Magnifique villa moderne situated dans le quartier prisé des Almadies. Cette propriété d\'exception offre des finitions haut de gamme, une piscine privée et un jardin tropical.',
    descriptionFull: `Bienvenue dans cette villa d'exception nichée au cœur des Almadies, l'un des quartiers les plus prisés de Dakar. Construite en 2022 sur un terrain de 600 m², cette résidence de prestige de 350 m² habitables allie architecture contemporaine et art de vivre à la dakaroise.

Dès l'entrée, vous serez séduit par les volumes généreux du séjour-salle à manger baigné de lumière naturelle grâce aux baies vitrées donnant sur la terrasse et la piscine. Le plan de cuisine ouvert, entièrement équipé d'appareils haut de gamme, ravira les amateurs de gastronomie.

À l'étage, la suite parentale de 45 m² dispose d'une salle de bain en marbre, d'un dressing sur mesure et d'un balcon privé. Quatre chambres supplémentaires, toutes dotées de salles d'eau attenantes, accueillent famille et invités dans un confort optimal.

L'extérieur est un véritable havre de paix : piscine chauffée entourée d'une vaste terrasse en teck, jardin paysager avec palmiers et bougainvilliers, espace barbecue couvert. La villa bénéficie d'un système de surveillance complet et d'un groupe électrogène automatique pour une sécurité et un confort sans interruption.

Titre foncier en règle. Accès facile aux plages des Almadies, aux restaurants et aux grandes enseignes commerciales.`,
    features: [
      'Piscine privée chauffée avec terrasse',
      'Cuisine équipée haut de gamme',
      'Système de sécurité & vidéosurveillance 24/7',
      'Climatisation centrale dans toutes les pièces',
      'Jardin paysager 200 m² avec arrosage auto',
      'Garage fermé pour 2 véhicules',
      'Groupe électrogène automatique',
      'Titre foncier en règle',
      'Internet fibre optique',
      'Domotique : volets, éclairage, alarme',
    ],
    images: [villaImg, luxuryImg, apartmentImg],
    yearBuilt: 2022,
    parking: 2,
    availableFrom: 'Immédiat',
  },
  {
    id: 2,
    title: 'Appartement Luxe Plateau',
    price: 850000,
    priceLabel: '850 000 FCFA/mois',
    location: 'Plateau, Dakar',
    zone: 'Plateau',
    surface: 120,
    surfaceLabel: '120 m²',
    bedrooms: 3,
    bathrooms: 2,
    type: 'Location',
    category: 'Appartement',
    img: apartmentImg,
    badge: 'Disponible',
    featured: true,
    description: 'Appartement standing au cœur du Plateau, quartier d\'affaires de Dakar. Lumineux et spacieux, il dispose de toutes les commodités modernes.',
    descriptionFull: `Situé au 4ème étage d'une résidence sécurisée en plein cœur du Plateau, cet appartement de 120 m² conjugue élégance, fonctionnalité et emplacement stratégique. Entièrement rénové en 2023, il bénéficie de finitions premium et d'équipements dernière génération.

Le vaste séjour-salon de 40 m² est le cœur de cet appartement : parquet en bois exotique, grandes fenêtres avec vue dégagée sur la ville, faux plafond avec éclairage LED ambiant. La cuisine semi-ouverte, équipée d'appareils encastrés (plaque à induction, four, réfrigérateur américain), est idéale pour recevoir.

Les trois chambres, dont une suite avec salle de bain et dressing, offrent confort et intimité. La deuxième salle de bain, carrelée de marbre, comprend douche à l'italienne et baignoire balnéo.

L'immeuble dispose d'un ascenseur, d'un gardien 24h/24, d'un parking sécurisé et d'un générateur de secours. L'eau chaude et l'électricité sont incluses dans le loyer. La connexion fibre optique est déjà installée.

À quelques pas des ministères, de l'Assemblée nationale, des hôtels et restaurants de renom, cet appartement est idéal pour un cadre ou une famille désirant vivre au cœur de Dakar.`,
    features: [
      'Appartement entièrement meublé et équipé',
      'Balcon avec vue dégagée sur la ville',
      'Immeuble sécurisé avec gardien 24h/24',
      'Ascenseur moderne et fiable',
      'Parking privé sécurisé',
      'Eau, électricité et charges incluses',
      'Internet fibre optique très haut débit',
      'Climatisation réversible dans chaque pièce',
      'Parquet bois dans les chambres',
      'Générateur de secours automatique',
    ],
    images: [apartmentImg, penthouseImg, houseImg],
    yearBuilt: 2020,
    floor: 4,
    parking: 1,
    availableFrom: '1er avril 2026',
  },
  {
    id: 3,
    title: 'Penthouse Vue Mer',
    price: 380000000,
    priceLabel: '380 000 000 FCFA',
    location: 'Corniche Ouest, Dakar',
    zone: 'Corniche',
    surface: 280,
    surfaceLabel: '280 m²',
    bedrooms: 4,
    bathrooms: 3,
    type: 'Vente',
    category: 'Penthouse',
    img: penthouseImg,
    badge: 'Premium',
    featured: true,
    description: 'Penthouse exceptionnel avec vue panoramique sur l\'océan Atlantique. Ce bien d\'exception offre un standing rare à Dakar avec des prestations luxueuses.',
    descriptionFull: `Perché au 12ème et dernier étage d'une tour résidentielle d'exception sur la Corniche Ouest, ce penthouse de 280 m² est sans conteste l'adresse la plus exclusive de Dakar. Vue à 270° sur l'océan Atlantique, l'île de Gorée et les lumières de la ville — un panorama époustouflant à toute heure du jour et de la nuit.

Le salon principal de 60 m², en double hauteur sous plafond de 4 m, offre une scénographie architecturale saisissante. La baie vitrée coulissante de 12 m donne accès à la terrasse principale de 80 m², véritable 5ème pièce à vivre avec coin repas, salon extérieur et spa avec jacuzzi vue mer.

La cuisine entièrement intégrée, de conception italienne sur mesure (marque Boffi), dispose d'équipements professionnels et d'une cave à vin climatisée pour 200 bouteilles. La suite parentale de 50 m² est une parenthèse de luxe absolu : dressing de 15 m², salle de bain en onyx, douche hammam et baignoire îlot.

Le penthouse est entièrement domotisé (Lutron), avec contrôle intégré de l'éclairage, des stores motorisés, de la climatisation et du système audio multi-zones Sonos. Deux places de parking privatives et un concierge de résidence complètent cette offre d'exception.`,
    features: [
      'Vue panoramique à 270° sur l\'océan Atlantique',
      'Terrasse privée de 80 m² avec spa et jacuzzi',
      'Cuisine italienne Boffi sur mesure',
      'Domotique complète Lutron (éclairage, stores, clima)',
      'Salle de sport privée avec équipements Technogym',
      'Cave à vin climatisée pour 200 bouteilles',
      '2 parkings couverts sécurisés',
      'Concierge de luxe 24h/24',
      'Système audio multi-zones Sonos',
      'Titre foncier — prestations rares à Dakar',
    ],
    images: [penthouseImg, luxuryImg, villaImg],
    yearBuilt: 2023,
    floor: 12,
    parking: 2,
    availableFrom: 'Immédiat',
  },
  {
    id: 4,
    title: 'Maison Familiale Fann',
    price: 135000000,
    priceLabel: '135 000 000 FCFA',
    location: 'Fann Hock, Dakar',
    zone: 'Fann',
    surface: 200,
    surfaceLabel: '200 m²',
    bedrooms: 4,
    bathrooms: 2,
    type: 'Vente',
    category: 'Maison',
    img: houseImg,
    badge: 'Disponible',
    featured: false,
    description: 'Charmante maison familiale située à Fann Hock, quartier calme et résidentiel. Parfaite pour une famille, elle offre de beaux espaces de vie et un jardin.',
    descriptionFull: `Au cœur de Fann Hock, l'un des quartiers résidentiels les plus appréciés de Dakar pour son calme et sa verdure, cette maison familiale de 200 m² sur un terrain de 300 m² est une opportunité rare à ce prix.

Le rez-de-chaussée s'articule autour d'un grand salon-salle à manger ouvert sur la terrasse et le jardin. La cuisine entièrement équipée (réfrigérateur, cuisinière, hotte) est fonctionnelle et lumineuse. Une chambre d'invités avec salle d'eau complète ce niveau.

À l'étage, trois chambres dont une suite parentale avec placard intégré et accès à un balcon privatif. La salle de bain principale, entièrement carrelée, comporte douche et baignoire. Climatisation individuelle dans chaque chambre.

Le jardin arboré, agrémenté d'arbres fruitiers (manguiers, citronniers), offre un cadre verdoyant pour profiter des soirées dakaroises. La terrasse couverte est idéale pour les repas en famille ou entre amis.

La maison bénéficie d'un titre foncier en règle, d'un branchement SENELEC triphasé et d'un forage d'eau propre. Proximité de l'école française, du lycée Mariama Bâ, des marchés et des grands axes.`,
    features: [
      'Jardin arboré avec arbres fruitiers',
      'Grand salon-séjour de 35 m²',
      'Cuisine moderne entièrement équipée',
      'Terrasse couverte pour repas en plein air',
      'Parking sécurisé pour 2 voitures',
      'Quartier résidentiel calme et sécurisé',
      'Proche écoles françaises et commerces',
      'Titre foncier en règle',
      'Branchement SENELEC triphasé',
      'Forage d\'eau propre',
    ],
    images: [houseImg, villaImg, apartmentImg],
    yearBuilt: 2018,
    parking: 2,
    availableFrom: 'Immédiat',
  },
  {
    id: 5,
    title: 'Bureau Commercial Plateau',
    price: 1200000,
    priceLabel: '1 200 000 FCFA/mois',
    location: 'Plateau, Dakar',
    zone: 'Plateau',
    surface: 180,
    surfaceLabel: '180 m²',
    bedrooms: 0,
    bathrooms: 2,
    type: 'Location',
    category: 'Bureau',
    img: officeImg,
    badge: 'Nouveau',
    featured: false,
    description: 'Espace de bureau moderne et lumineux au cœur du Plateau. Idéal pour une entreprise ou un cabinet, avec toutes les commodités nécessaires.',
    descriptionFull: `Situé au 3ème étage d'un immeuble de bureaux à architecture contemporaine en plein centre du Plateau — le quartier d'affaires de référence à Dakar — cet espace professionnel de 180 m² a été entièrement réaménagé pour répondre aux exigences des entreprises modernes.

L'espace principal de 120 m² est organisé en open space modulable, avec cloisons amovibles permettant de créer 4 à 6 bureaux fermés selon vos besoins. Deux salles de réunion entièrement équipées (écran interactif, système de vidéoconférence, climatisation) complètent l'offre.

Une kitchenette fonctionnelle avec réfrigérateur, micro-ondes et machine à café, ainsi que des sanitaires séparés femmes/hommes, assurent le confort quotidien de vos collaborateurs. L'accès sécurisé par badge permet une gestion fine des droits d'entrée.

La connexion fibre optique symétrique 1 Gbit/s est déjà installée. Le bâtiment dispose d'un groupe électrogène haute puissance garantissant la continuité d'activité lors des délestages.

3 places de parking visiteurs incluses. Possibilité de louer des places supplémentaires. Bail commercial 3-6-9 ans, possibilité de bail précaire. Disponible à partir du 15 mars 2026 — visite sur rendez-vous.`,
    features: [
      'Open space modulable en bureau fermés',
      'Salles de réunion équipées (vidéoconférence)',
      'Climatisation centralisée et régulée',
      'Fibre optique symétrique 1 Gbit/s',
      'Kitchenette avec équipements complets',
      'Sanitaires séparés et modernes',
      '3 places de parking visiteurs incluses',
      'Accès sécurisé par badge',
      'Groupe électrogène haute puissance',
      'Accès PMR — ascenseur récent',
    ],
    images: [officeImg, apartmentImg, penthouseImg],
    yearBuilt: 2021,
    floor: 3,
    parking: 3,
    availableFrom: '15 mars 2026',
  },
  {
    id: 6,
    title: 'Villa Prestige Mermoz',
    price: 420000000,
    priceLabel: '420 000 000 FCFA',
    location: 'Mermoz, Dakar',
    zone: 'Mermoz',
    surface: 500,
    surfaceLabel: '500 m²',
    bedrooms: 6,
    bathrooms: 4,
    type: 'Vente',
    category: 'Villa',
    img: luxuryImg,
    badge: 'Exclusif',
    featured: true,
    description: 'Villa de prestige exceptionnelle à Mermoz. Architecture contemporaine, finitions luxueuses et prestations haut de gamme. Piscine à débordement, home cinéma.',
    descriptionFull: `Cette villa de prestige de 500 m² habitables, érigée sur un terrain clos de 900 m² à Mermoz — quartier recherché par l'élite dakaroise et la communauté diplomatique — représente le summum de l'art de vivre au Sénégal.

L'architecture est signée par un cabinet d'architectes international : façades en béton brossé et pierres de taille, menuiseries aluminium thermolaquées, terrasses en bois composite traité, et verrière centrale baignant les espaces de jour d'une lumière zénithale exceptionnelle.

Le rez-de-chaussée abrite un salon de réception de 80 m², une salle à manger de 40 m², une cuisine professionnelle entièrement équipée (marque Sub-Zero & Wolf), un bureau privatif avec bibliothèque intégrée, et une chambre de service avec salle de bain. Un home cinéma de 30 places, une salle de sport avec équipements professionnels et une cave à vin complètent ce niveau.

À l'étage, la suite parentale de 80 m² comprend un dressing de 20 m², une salle de bain spa avec hammam et baignoire îlot, et un balcon privatif. Cinq autres chambres, chacune avec salle de bain et dressing, accueillent la famille.

La piscine à débordement chauffée, la terrasse de 150 m², le jardin paysager irrigué automatiquement, le système solaire de 20 kWc et la domotique complète font de cette villa une propriété unique sur le marché dakarois.`,
    features: [
      'Piscine à débordement chauffée (12 × 5 m)',
      'Home cinéma privé 30 places équipé',
      'Salle de sport avec équipements professionnels',
      'Domotique complète (éclairage, sécurité, clima)',
      'Cuisine professionnelle Sub-Zero & Wolf',
      'Suite parentale 80 m² avec hammam privé',
      'Garage fermé pour 3 véhicules + 2 extérieurs',
      'Système solaire autonome 20 kWc',
      'Jardin paysager 400 m² avec arrosage automatique',
      'Générateur industriel — groupe électrogène',
    ],
    images: [luxuryImg, villaImg, penthouseImg],
    yearBuilt: 2023,
    parking: 3,
    availableFrom: 'Immédiat',
  },
  {
    id: 7,
    title: 'Studio Meublé Liberté 6',
    price: 350000,
    priceLabel: '350 000 FCFA/mois',
    location: 'Liberté 6, Dakar',
    zone: 'Liberté',
    surface: 45,
    surfaceLabel: '45 m²',
    bedrooms: 1,
    bathrooms: 1,
    type: 'Location',
    category: 'Studio',
    img: apartmentImg,
    badge: 'Disponible',
    featured: false,
    description: 'Studio meublé moderne à Liberté 6, idéal pour un célibataire ou un jeune couple. Proche de toutes commodités et bien desservi par les transports.',
    descriptionFull: `Niché au 2ème étage d'un immeuble sécurisé à Liberté 6, ce studio de 45 m² entièrement meublé et équipé est une solution idéale pour un professionnel, un étudiant ou un jeune couple souhaitant vivre dans l'un des quartiers les plus dynamiques et bien desservis de Dakar.

L'espace de vie principal de 25 m² est optimisé avec un lit double escamotable de qualité, un canapé convertible, une table à manger 4 couverts, et un bureau intégré parfait pour le télétravail. La kitchenette ouverte, entièrement équipée (plaque à induction, mini-four, réfrigérateur, micro-ondes), permet de cuisiner en toute autonomie.

La salle d'eau privative avec douche italienne, lavabo et WC est carrelée de façon moderne. La climatisation réversible assure un confort thermique toute l'année. La connexion Wi-Fi fibre est incluse dans le loyer.

L'immeuble dispose d'un gardien présent la nuit et d'un éclairage de sécurité dans les parties communes. La charge mensuelle comprend l'eau, l'électricité (dans une limite raisonnable) et la connexion internet.

À 5 minutes à pied du marché HLM, des pharmacies, des boulangeries et des restaurants. Accès direct aux lignes Dakar Dem Dikk. Disponible immédiatement — visite sans rendez-vous.`,
    features: [
      'Studio entièrement meublé et équipé',
      'Kitchenette moderne avec appareils encastrés',
      'Salle d\'eau avec douche à l\'italienne',
      'Climatisation réversible',
      'Wi-Fi fibre inclus dans le loyer',
      'Immeuble sécurisé avec gardien de nuit',
      'Eau et électricité incluses (limite raisonnable)',
      'Proche transports, marchés et commerces',
      'Bureau intégré — idéal télétravail',
      'Disponible immédiatement',
    ],
    images: [apartmentImg, penthouseImg, houseImg],
    yearBuilt: 2019,
    floor: 2,
    parking: 0,
    availableFrom: 'Immédiat',
  },
  {
    id: 8,
    title: 'Duplex Moderne Ouakam',
    price: 180000000,
    priceLabel: '180 000 000 FCFA',
    location: 'Ouakam, Dakar',
    zone: 'Ouakam',
    surface: 220,
    surfaceLabel: '220 m²',
    bedrooms: 4,
    bathrooms: 3,
    type: 'Vente',
    category: 'Duplex',
    img: houseImg,
    badge: 'Réduction',
    featured: false,
    description: 'Duplex moderne à Ouakam, quartier résidentiel proche de la mer. Bel agencement avec espace jour au rez-de-chaussée et chambres à l\'étage.',
    descriptionFull: `Ce duplex contemporain de 220 m² à Ouakam représente une opportunité d'acquisition exceptionnelle dans l'un des quartiers résidentiels les plus prisés de la presqu'île du Cap-Vert, à seulement 800 mètres de la mer.

Le niveau inférieur (rez-de-chaussée) est dédié aux espaces de vie : un double séjour lumineux de 50 m² avec accès direct à la terrasse, une cuisine américaine entièrement équipée, une salle à manger, et une chambre d'invités avec douche. Les grandes ouvertures vitrées font entrer généreusement la lumière naturelle et créent une continuité intérieur-extérieur appréciable.

À l'étage, trois chambres dont une suite parentale avec dressing, salle de bain privative et balcon avec vue sur le quartier. Une salle de bain familiale et un bureau complètent ce niveau. La circulation intérieure est fluide grâce à un escalier en béton ciré avec garde-corps en acier brossé.

La terrasse de toit de 80 m² est une véritable 5ème pièce à vivre : pergola, salon de jardin et espace pour un futur spa. Le parking sécurisé accueille 2 véhicules. Le bien bénéficie d'un titre foncier en règle.

Prix négociable. Visite disponible 7j/7 sur rendez-vous.`,
    features: [
      'Double séjour de 50 m² — lumineux et ouvert',
      'Cuisine américaine entièrement équipée',
      'Terrasse de toit de 80 m² (pergola)',
      'Suite parentale avec dressing et balcon',
      'Buanderie équipée avec lave-linge',
      'Climatisation dans toutes les pièces',
      'Parking sécurisé pour 2 véhicules',
      'À 800 m de la plage d\'Ouakam',
      'Titre foncier — prix négociable',
      'Quartier calme et bien desservi',
    ],
    images: [houseImg, villaImg, apartmentImg],
    yearBuilt: 2020,
    parking: 2,
    availableFrom: 'Négociable',
  },
  {
    id: 9,
    title: 'Appartement Haut Standing Point E',
    price: 650000,
    priceLabel: '650 000 FCFA/mois',
    location: 'Point E, Dakar',
    zone: 'Point E',
    surface: 95,
    surfaceLabel: '95 m²',
    bedrooms: 2,
    bathrooms: 1,
    type: 'Location',
    category: 'Appartement',
    img: penthouseImg,
    badge: 'Disponible',
    featured: false,
    description: 'Appartement haut standing à Point E, résidence récente avec toutes les commodités modernes. Quartier calme, sécurisé et très bien situé.',
    descriptionFull: `Situé au 3ème étage d'une résidence haut standing construite en 2021 à Point E — quartier résidentiel et diplomatique par excellence — cet appartement de 95 m² offre un cadre de vie élégant, calme et sécurisé.

Le séjour de 30 m², prolongé d'un balcon spacieux de 12 m² avec vue sur les jardins de la résidence, est le cœur de cet appartement. Parquet en chêne massif, moulures au plafond, peintures satinées soignées : les finitions sont à la hauteur du standing de la résidence. La cuisine ouverte, entièrement équipée, intègre tous les appareils électroménagers nécessaires.

Les deux chambres, lumineuses et bien dimensionnées, bénéficient de placards intégrés et de la climatisation. La salle de bain principale, en marbre blanc, dispose d'une douche à l'italienne et d'une baignoire. Un WC séparé préserve l'intimité des occupants.

La résidence propose un gardiennage 24h/24, un ascenseur récent, un parking sécurisé, et un générateur de secours assurant la continuité de l'alimentation électrique. La connexion Internet fibre est incluse dans les charges mensuelles.

Point E est à deux pas de l'UCAD, du Marché Kermel, du quartier diplomatique et des principales administrations. Disponible à partir du 1er avril 2026.`,
    features: [
      'Résidence haut standing de construction récente',
      'Ascenseur et accès PMR',
      'Grand balcon de 12 m² avec vue jardin',
      'Cuisine entièrement équipée (électroménager inclus)',
      'Parquet massif dans les chambres',
      'Gardiennage 24h/24 et vidéosurveillance',
      'Parking sécurisé en sous-sol',
      'Générateur de secours automatique',
      'Internet fibre inclus dans les charges',
      'Proche UCAD, ambassades et administrations',
    ],
    images: [penthouseImg, apartmentImg, luxuryImg],
    yearBuilt: 2021,
    floor: 3,
    parking: 1,
    availableFrom: '1er avril 2026',
  },
];

export const categories = ['Tous', 'Appartement', 'Villa', 'Maison', 'Studio', 'Bureau', 'Penthouse', 'Duplex'];
export const zones = ['Toutes', 'Almadies', 'Plateau', 'Corniche', 'Fann', 'Mermoz', 'Liberté', 'Ouakam', 'Point E'];

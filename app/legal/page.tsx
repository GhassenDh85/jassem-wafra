import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentions légales | WAFRA',
  robots: { index: false },
};

export default function LegalPage() {
  return (
    <main className="section">
      <div className="container legal">
        <Link className="text-link" href="/">
          <ArrowLeft size={16} /> Retour à l’accueil
        </Link>
        <span className="eyebrow" style={{ display: 'block', margin: '28px 0 12px' }}>
          WAFRA
        </span>
        <h1>Mentions légales</h1>

        <h3>Éditeur du site</h3>
        <p>
          WAFRA — Commerce pour l’industrie. Les coordonnées complètes de l’entité
          exploitante (raison sociale, numéro d’immatriculation, adresse du siège et
          contact) sont disponibles sur demande via le formulaire de contact.
        </p>

        <h3>Objet du site</h3>
        <p>
          Ce site présente l’activité d’achat de WAFRA : machines, équipements, stocks,
          matériaux et actifs professionnels. Il permet aux entreprises et aux
          professionnels de soumettre une demande de rachat.
        </p>

        <h3>Hébergement</h3>
        <p>
          Le site est hébergé par un prestataire technique. Les informations d’hébergement
          sont communiquées sur demande.
        </p>

        <h3>Propriété intellectuelle</h3>
        <p>
          La marque WAFRA, le logo et les contenus de ce site sont protégés. Toute
          reproduction sans autorisation écrite est interdite.
        </p>

        <h3>Responsabilité</h3>
        <p>
          Les informations publiées sont fournies à titre indicatif. WAFRA ne saurait être
          tenue responsable d’une utilisation erronée de ces informations. Aucun paiement
          n’est demandé sur ce site.
        </p>
      </div>
    </main>
  );
}

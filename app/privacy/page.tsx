import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | WAFRA',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="section">
      <div className="container legal">
        <Link className="text-link" href="/">
          <ArrowLeft size={16} /> Retour à l’accueil
        </Link>
        <span className="eyebrow" style={{ display: 'block', margin: '28px 0 12px' }}>
          WAFRA
        </span>
        <h1>Politique de confidentialité</h1>

        <h3>Données collectées</h3>
        <p>
          Lorsque vous utilisez le formulaire de contact, nous collectons les informations
          que vous nous transmettez : nom, entreprise, adresse e-mail, téléphone, type de
          produit, message et, le cas échéant, la pièce jointe (photo ou PDF).
        </p>

        <h3>Finalité du traitement</h3>
        <p>
          Ces données sont utilisées uniquement pour traiter votre demande de rachat et vous
          recontacter. Elles ne sont ni revendues ni utilisées à des fins publicitaires.
        </p>

        <h3>Transmission par e-mail</h3>
        <p>
          Les demandes envoyées via le formulaire sont transmises par e-mail à l’équipe
          WAFRA au moyen d’un prestataire d’envoi d’e-mails. Aucune donnée n’est stockée
          dans une base de données sur ce site.
        </p>

        <h3>Conservation</h3>
        <p>
          Les demandes sont conservées le temps nécessaire au traitement de votre projet,
          puis archivées ou supprimées conformément aux obligations applicables.
        </p>

        <h3>Vos droits</h3>
        <p>
          Vous pouvez demander l’accès, la rectification ou la suppression de vos données en
          nous contactant via le formulaire de contact ou à l’adresse contact@wafra.tn.
        </p>
      </div>
    </main>
  );
}

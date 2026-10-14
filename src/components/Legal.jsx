import { Eyebrow, Title } from './Reveal.jsx';
import { SUPPORT_EMAIL } from '../data/site.js';

const UPDATED = 'October 15, 2026';

const FAQ = [
  {
    q: 'How do my steps affect a chest?',
    a: 'Stepforge reads your step count from Apple Health. Every day brings a chest; your steps open higher rarity possibilities at 2,501, 5,001, 7,501, and 10,000 steps. A lower-step day still keeps its chest and can reveal a Common weapon.',
  },
  {
    q: 'Does Stepforge write anything to Apple Health?',
    a: 'No. Stepforge requests read access to steps, walking and running distance, and active energy. It does not write Health records. You can change permissions in the Apple Health app at any time.',
  },
  {
    q: 'Can I play without Pro?',
    a: 'Yes. The daily chest, the Armory, and Chapter I are available without a subscription. Pro is optional and adds extra daily chests, Chapter II, and widgets.',
  },
  {
    q: 'What do the Monthly and Lifetime plans include?',
    a: 'Monthly adds one extra chest on each active Pro day. Lifetime is a one-time purchase and adds three extra chests each day. Both plans include the same Pro Quest and widget features. Collection backup is free for everyone.',
  },
  {
    q: 'How do I cancel Monthly or restore a purchase?',
    a: 'Manage or cancel a Monthly subscription in your Apple Account subscription settings; deleting the app does not cancel it. Use Restore Purchases in Stepforge Settings to recover eligible purchases made with the same Apple Account. Lifetime does not renew.',
  },
  {
    q: 'How does collection backup work?',
    a: 'Backup is optional, free, and started by you in Settings. It stores collection information in your private iCloud account, not Apple Health readings. Sign in to iCloud to restore it on another device.',
  },
  {
    q: 'Is Stepforge a health or medical app?',
    a: 'No. Stepforge is a game that uses activity data for gameplay. It is not medical advice, a diagnostic tool, or a substitute for guidance from a qualified health professional.',
  },
];

function DocumentSection({ id, eyebrow, title, headingAs = 'h2', children }) {
  return (
    <section className="legal__section" id={id} aria-label={title}>
      <div className="wrap legal__wrap">
        <header className="legal__head">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title as={headingAs} className="legal__title">{title}</Title>
        </header>
        <div className="legal__copy">
          <p className="legal__updated">Last updated {UPDATED}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SupportSection({ headingAs = 'h2' } = {}) {
  return (
    <section className="legal__section legal__support" id="support" aria-label="Support and frequently asked questions">
      <div className="wrap legal__wrap">
        <header className="legal__head">
          <Eyebrow>Wayfarer’s help desk</Eyebrow>
          <Title as={headingAs} className="legal__title">Support &amp; FAQ</Title>
          <p className="legal__lede">Quick answers for your walk, your collection, and your purchases.</p>
        </header>
        <div className="legal__faq" aria-label="Frequently asked questions">
          {FAQ.map(({ q, a }, index) => (
            <details className="legal__question" key={q}>
              <summary><span>{q}</span><span className="legal__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a className="legal__contact" href={`mailto:${SUPPORT_EMAIL}?subject=Stepforge%20Support`}>
          <span>Still need a hand?</span>
          <strong>{SUPPORT_EMAIL}</strong>
        </a>
      </div>
    </section>
  );
}

export function PrivacyPolicySection({ headingAs = 'h2' } = {}) {
  return (
      <DocumentSection id="privacy" eyebrow="Your walk. Your data." title="Privacy Policy" headingAs={headingAs}>
        <h3>Information Stepforge uses</h3>
        <p>With your permission, Stepforge reads step count, walking and running distance, and active energy from Apple Health. These readings support activity displays and game progress. Stepforge does not write data to Apple Health. You can change or revoke Health access in Apple Health settings.</p>
        <p>Your collection, preferences, and Health-derived progress are stored on your device. A small activity snapshot is shared locally with Stepforge widgets. The app does not require a Stepforge account and does not use advertising, analytics, or cross-app tracking.</p>

        <h3>Optional iCloud collection backup</h3>
        <p>If you choose Back Up in Settings, Stepforge saves collection details—such as weapon identifiers, copy counts, discovery dates, showcase selection, and used forge identifiers—to your private iCloud account. Backup is user-initiated and available to everyone. It does not include step readings, distance, active energy, activity receipts, or purchase entitlements. You can delete the saved collection backup from Settings. Restoring a backup merges collection items and does not replace newer local discoveries.</p>

        <h3>Purchases, reminders, and Apple services</h3>
        <p>Apple processes in-app purchases through the App Store. Stepforge receives transaction information needed to verify access to Pro, but does not receive your payment card details. Optional reminders are scheduled as local notifications. Apple’s handling of Health, iCloud, App Store, and notification data is also governed by Apple’s own privacy terms.</p>

        <h3>Retention and your choices</h3>
        <p>To remove local Stepforge data, delete the app and its widgets. This does not delete your Apple Health records or cancel an active subscription. To remove an iCloud collection backup, use Delete iCloud Backup in Settings. You can manage Health permissions in Apple Health and Monthly subscriptions in your Apple Account settings.</p>

        <h3>Website and contact</h3>
        <p>This website does not ask you to create an account. If you email support, we use the information in your message to respond and help resolve your request. Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with privacy questions or requests.</p>
      </DocumentSection>
  );
}

export function TermsOfServiceSection({ headingAs = 'h2' } = {}) {
  return (
      <DocumentSection id="terms" eyebrow="The rules of the road" title="Terms of Service" headingAs={headingAs}>
        <h3>Using Stepforge</h3>
        <p>Stepforge is a walking game for iPhone. By using the app or this website, you agree to use them lawfully and not to interfere with their operation, misrepresent activity data, or attempt to disrupt other users’ access. You must have permission to use the Apple Account and device associated with your purchases.</p>

        <h3>Health and activity information</h3>
        <p>Stepforge is for entertainment and general activity awareness only. It is not a medical service and does not provide medical advice. Activity readings depend on Apple Health, your device, and connected sources; they may be delayed, incomplete, or unavailable. Do not use the app to diagnose or treat a health condition.</p>

        <h3>Optional purchases</h3>
        <p>Stepforge’s core daily chest, Armory, and Chapter I are available for free. Pro is optional. Monthly is an auto-renewing subscription that adds one extra chest per active Pro day; it also unlocks Chapter II and Pro widgets. Lifetime is a one-time purchase that adds three extra chests each day and includes the same Quest and widget benefits as Monthly. Collection backup remains free.</p>
        <p>Prices and billing terms are shown by the App Store before purchase and may vary by region. Monthly renews unless canceled through your Apple Account subscription settings before the renewal date. Deleting Stepforge does not cancel a subscription. Lifetime is not recurring. Apple handles payment processing, subscription management, and refund requests. Restore eligible purchases in the app using the same Apple Account.</p>

        <h3>Content and availability</h3>
        <p>Stepforge’s name, artwork, story, game content, and software are owned by or licensed to the Stepforge developer and are protected by applicable intellectual-property laws. You may use the app for personal, non-commercial play. Features, content, and availability may change as the game is maintained and expanded.</p>

        <h3>Disclaimers</h3>
        <p>Stepforge and this website are provided on an “as available” basis. To the extent permitted by law, the developer is not responsible for indirect loss arising from interruptions, unavailable third-party services, or inaccurate activity data. Nothing in these terms limits rights that cannot legally be excluded under the laws that apply to you.</p>

        <h3>Questions</h3>
        <p>For questions about these terms, contact <a href={`mailto:${SUPPORT_EMAIL}?subject=Stepforge%20Terms`}>{SUPPORT_EMAIL}</a>.</p>
      </DocumentSection>
  );
}

export function LegalPage({ page }) {
  const views = {
    privacy: { title: 'Privacy Policy', description: 'How Stepforge handles Apple Health activity, on-device game data, optional iCloud collection backup, and support requests.', component: PrivacyPolicySection },
    terms: { title: 'Terms of Service', description: 'Terms for using Stepforge, including activity data, free features, and optional Pro purchases.', component: TermsOfServiceSection },
    support: { title: 'Support & FAQ', description: 'Answers about Stepforge steps, chests, Apple Health, Pro plans, purchases, and iCloud collection backup.', component: SupportSection },
  };
  const selected = views[page] ?? views.support;
  const PageContent = selected.component;

  return (
    <div className="legal-page">
      <header className="legal-site-header">
        <a className="legal-site-brand" href="/" aria-label="Stepforge home">
          <img src="/app-icon.png" width="42" height="42" alt="" />
          <span>Stepforge</span>
        </a>
        <nav aria-label="Site navigation">
          <a href="/">Home</a>
          <a href="/support">Support</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </header>
      <main className="legal">
        <PageContent headingAs="h1" />
      </main>
      <footer className="legal-site-footer">
        <span>© {new Date().getFullYear()} Stepforge</span>
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </footer>
      <div className="grain" aria-hidden="true" />
    </div>
  );
}

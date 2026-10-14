import Icon from './Icon.jsx';
import { APP_STORE_URL } from '../data/site.js';

export default function AppStoreButton({ size = 'md', className = '' }) {
  const live = Boolean(APP_STORE_URL);
  const content = (
    <>
      <Icon name="apple" size={size === 'sm' ? 18 : 24} />
      <span className="store__text">
        <small>{live ? 'Download on the' : 'Coming soon to the'}</small>
        <strong>App Store</strong>
      </span>
    </>
  );
  const cls = `store store--${size} ${live ? '' : 'store--soon'} ${className}`;
  return live ? (
    <a className={cls} href={APP_STORE_URL} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <span className={cls} role="note">
      {content}
    </span>
  );
}

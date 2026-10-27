import { content } from '../content/index.js';

// Link que abre em nova aba, avisando leitores de tela sobre isso.
export default function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {content.ui.newTab}</span>
    </a>
  );
}

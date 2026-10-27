// Estrutura comum das seções: número, rótulo, título e (opcional) um texto de abertura.
export default function Section({ id, index, eyebrow, title, lead, children, className = '' }) {
  const titleId = `${id}-titulo`;

  return (
    <section id={id} className={`section ${className}`} aria-labelledby={titleId}>
      <div className="container">
        <header className="section__head">
          <p className="section__index">
            <span>{String(index).padStart(2, '0')}</span>
            {eyebrow}
          </p>
          <h2 id={titleId} className="section__title">
            {title}
          </h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

import { content } from '../content/index.js';
import './ArchitectureDiagram.css';

const t = content.ui.project;

// Diagrama da arquitetura feito com HTML e CSS (não é uma captura de tela).
export default function ArchitectureDiagram({ architecture }) {
  const { layers, integrations = [] } = architecture;

  return (
    <figure className="arch">
      <figcaption className="label">{t.architecture}</figcaption>

      <ol className="arch__layers">
        {layers.map((layer) => (
          <li key={layer.name} className="arch__layer">
            <div className="arch__node">
              <span className="label">{layer.name}</span>
              <strong className="arch__tech">{layer.tech}</strong>
              <span className="arch__detail">{layer.detail}</span>
            </div>
            {layer.connector && (
              <span className="arch__connector">
                <span>{layer.connector}</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      {integrations.length > 0 && (
        <div className="arch__integrations">
          <span className="label">{t.integrations}</span>
          <ul>
            {integrations.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong> {item.detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}

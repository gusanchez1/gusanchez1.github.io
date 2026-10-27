// Caminho de um arquivo da pasta public/ respeitando o endereço base do site
// (no GitHub Pages sem domínio próprio, o site fica em /nome-do-repositorio/).
export function asset(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}

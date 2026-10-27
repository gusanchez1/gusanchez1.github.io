// Contato e perfis. Estes endereços aparecem no topo, na seção de contato, no rodapé
// e nos metadados de SEO — para mudar um link no site inteiro, basta alterar aqui.
export const links = {
  email: 'gustavoavelino07@gmail.com',
  github: 'https://github.com/gusanchez1',
  linkedin: 'https://www.linkedin.com/in/gustavo-avelino-sanchez-5a799aa1/',
  instagram: 'https://www.instagram.com/uguhz/',

  // Currículo em PDF (opcional). Coloque o arquivo na pasta public/ e informe o nome,
  // por exemplo: 'curriculo-gustavo-avelino-sanchez.pdf'. Com null, o botão não aparece.
  resume: null,
};

// Monta o link "mailto:" com um assunto já preenchido.
export function mailto(subject) {
  return subject ? `mailto:${links.email}?subject=${encodeURIComponent(subject)}` : `mailto:${links.email}`;
}

// "https://www.instagram.com/uguhz/" -> "uguhz"
export function handleFromUrl(url) {
  return new URL(url).pathname.split('/').filter(Boolean).pop();
}

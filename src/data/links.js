// Contato e perfis. Estes endereços aparecem no topo, na seção de contato, no rodapé
// e nos metadados de SEO — para mudar um link no site inteiro, basta alterar aqui.
export const links = {
  email: 'gustavoavelino07@gmail.com',
  github: 'https://github.com/gusanchez1',
  linkedin: 'https://www.linkedin.com/in/gustavo-avelino-sanchez-5a799aa1/',
  instagram: 'https://www.instagram.com/uguhz/',

  // Currículos em PDF, um por idioma, na pasta public/resume/. Para atualizar, substitua o arquivo
  // mantendo o nome. `downloadName` é o nome com que o arquivo é salvo no computador de quem baixa.
  // Com a lista vazia ([]), os botões de currículo não aparecem.
  resume: [
    { lang: 'pt-BR', path: 'resume/gustavo-avelino-sanchez-pt.pdf', downloadName: 'Gustavo_Avelino_Sanchez_Curriculo_PT.pdf' },
    { lang: 'en', path: 'resume/gustavo-avelino-sanchez-en.pdf', downloadName: 'Gustavo_Avelino_Sanchez_Resume_EN.pdf' },
  ],
};

// Monta o link "mailto:" com um assunto já preenchido.
export function mailto(subject) {
  return subject ? `mailto:${links.email}?subject=${encodeURIComponent(subject)}` : `mailto:${links.email}`;
}

// "https://www.instagram.com/uguhz/" -> "uguhz"
export function handleFromUrl(url) {
  return new URL(url).pathname.split('/').filter(Boolean).pop();
}

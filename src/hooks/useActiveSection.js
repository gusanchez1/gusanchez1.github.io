import { useEffect, useState } from 'react';

// Descobre qual seção está no meio da tela, para destacar o item certo do menu.
// `ids` precisa ser um array estável (definido fora do componente).
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Uma faixa fina no meio da tela: a seção que passa por ela é a "ativa"
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

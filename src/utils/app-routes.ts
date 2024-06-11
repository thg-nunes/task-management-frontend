/**
 * @namespace routes - lista contendo todas as rotas da aplicação e usada para
 * compor a navbar de forma dinamica
 */
export const routes: Array<{ title: string; href: string }> = [
  {
    title: 'home',
    href: '/home',
  },
  {
    title: 'Configuração',
    href: '/usuario/configuracao',
  },
]

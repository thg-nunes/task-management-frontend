'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { IoIosSettings } from 'react-icons/io'

import { RenderPrivateRouter } from '@context/userIsLogged'

import { routes } from '@utils/app-routes'

import { Logo } from '@components/logo'
import { LinkIcon, LinkRoot } from '@components/link'

/**
 * @namespace LIST_STYLES - objeto contendo os dois possiveis estilos dos items da listagem
 * de links na navbar
 * @property {string} LIST_STYLES.active - sequencia de classes para o link que estiver ativo
 * @property {string} LIST_STYLES.default - sequencia de classes para o link que estiver inativo
 */
const LIST_STYLES = {
  active: 'rounded-md duration-75 bg-slate-600 border border-slate-500',
  default: 'rounded-md duration-75 hover:bg-slate-600',
}

export default function PrivatePagesRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()

  return (
    <RenderPrivateRouter>
      <nav className="grid grid-cols-2 bg-slate-700 px-6 py-4 text-white md:hidden md:h-screen md:w-[260px] md:grid-cols-1 lg:fixed lg:top-0">
        <Logo className="col-start-1 mx-0 md:h-max" />
        <ul className="col-span-2 h-screen py-3">
          {routes.map(({ href, title }) => (
            <li
              className={
                pathname.includes(href) ? LIST_STYLES.active : LIST_STYLES.default
              }
              key={href}
            >
              <LinkRoot href={href}>
                <LinkIcon Icon={IoIosSettings} />
                {title}
              </LinkRoot>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </RenderPrivateRouter>
  )
}

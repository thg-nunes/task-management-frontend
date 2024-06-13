import Image from 'next/image'
import { FaUserAlt } from 'react-icons/fa'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type UserPhotoProps = {
  src: string | StaticImport
}

/**
 * @namespace USER_PHOTO_CONTAINER_STYLE - esse objeto contém duas keys com os possíveis estilos
 * para a dive que serve de container da imagem do usuário
 * @property {string} USER_PHOTO_CONTAINER_STYLE.default - estilo caso o usuário tenha um avatar
 * @property {string} USER_PHOTO_CONTAINER_STYLE.empty - estilo caso o usuário não tenha um avatar
 */
const USER_PHOTO_CONTAINER_STYLE = {
  default: 'w-max overflow-hidden rounded-full border-2 border-white md:size-44',
  empty:
    'flex w-max items-center justify-center bg-zinc-500 overflow-hidden rounded-full border-2 border-white md:size-44',
}

/**
 * @function UserPhoto - função que exibe o avatar do usuário
 * @param {string} UserPhoto.src - endereço da imagem a ser exibida
 */
export const UserPhoto = ({ src }: UserPhotoProps): JSX.Element => {
  return (
    <div
      className={
        src ? USER_PHOTO_CONTAINER_STYLE.default : USER_PHOTO_CONTAINER_STYLE.empty
      }
    >
      {src ? (
        <Image
          src={src}
          width={176}
          height={176}
          className="min-h-[172px] min-w-[172px]"
          alt="foto do usuário ou imagem padrão caso nao tenha uma foto"
        />
      ) : (
        <FaUserAlt size={40} className="md:size-10" />
      )}
    </div>
  )
}

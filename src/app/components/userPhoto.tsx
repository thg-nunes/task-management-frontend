import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type UserPhotoProps = {
  src: string | StaticImport
}

/**
 * @function UserPhoto - função que exibe o avatar do usuário
 * @param {string} UserPhoto.src - endereço da imagem a ser exibida
 */
export const UserPhoto = ({ src }: UserPhotoProps): JSX.Element => {
  return (
    <div className="w-max overflow-hidden rounded-full border-2 border-white">
      <Image
        src={src}
        width={176}
        height={176}
        className="md:size-44"
        alt="foto do usuário ou imagem padrão caso nao tenha uma foto"
      />
    </div>
  )
}

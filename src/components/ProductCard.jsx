import { Link } from 'react-router-dom'
import FavButton from './ui/FavButton'
import { calcDiscount } from '../utils/calcDiscount'
import { formatPrice } from '../utils/formatPrice'

export default function ProductCard({ id, images, price, title, discount }) {
  return (
    <>
      <figure className="hover:shadox-xl relative w-full rounded-xl px-3 py-3 shadow-md duration-500 md:w-64">
        <Link
          to={`/product/id/${id}`}
          className="flex h-full w-full cursor-pointer md:block"
        >
          <div className="rounded-t-xl bg-white md:border-b-2">
            <span
              aria-label="Descuento"
              className="absolute right-0 hidden rounded-bl-xl rounded-tr-xl bg-primary-500 px-3 text-lg font-bold text-white md:flex"
            >
              {discount}%
            </span>
            <div className="absolute right-2 hidden md:left-2 md:flex">
              <FavButton id={id} />
            </div>
            <img
              alt="Product image"
              className="m-auto flex h-32 w-max rounded-t-xl object-contain p-3 md:h-56"
              src={images}
            />
          </div>
          <figcaption className="rounded-b-xl bg-white text-slate-700">
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              {discount && (
                <>
                  <p className="flex gap-2 text-2xl md:gap-0">
                    ${discount && calcDiscount(price, discount)}
                    <div className="z-10 right-2 md:left-2 md:hidden">
                      <FavButton id={id} />
                    </div>
                  </p>
                  <p className="text-gray-500 line-through">
                    {discount && '$'}
                    {formatPrice(price)}
                  </p>
                </>
              )}
              {!discount && <p className="text-2xl">${formatPrice(price)}</p>}
            </div>
            <p className="text-start text-green-600">Envío gratis</p>
            <h2 className="text-start font-bold">{title}</h2>
          </figcaption>
        </Link>
      </figure>
    </>
  )
}

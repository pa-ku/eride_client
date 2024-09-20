import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function AllProducts() {
  const [itemsData, setItemsData] = useState([])
  const [productBrands, setProductBrands] = useState([])
  const [dataFiltered, setDataFiltered] = useState(itemsData)

  async function fetchAllScooters() {
    try {
      const res = await fetch(`http://localhost:5000/api/scooters`)
      if (!res.ok) {
        throw new Error('Recurso no encontrado', res.status)
      }
      const data = await res.json()
      const getUniqueBrands = [...new Set(data.map((item) => item.brand))]
      setProductBrands(getUniqueBrands)
      setItemsData(data)
      setDataFiltered(data)
    } catch (err) {
      console.error('¡Hubo un problema con la solicitud!', err)
    }
  }

  useEffect(() => {
    fetchAllScooters()
  }, [])

  function filterByBrand(brandSelected) {
    if (brandSelected === 'todas') {
      setDataFiltered(itemsData)
    } else {
      const filteredBrands = itemsData.filter(
        (item) => item.brand === brandSelected,
      )
      setDataFiltered(filteredBrands)
    }
  }

  function handlePrice(value) {
    let sortedData
    if (value === 'sortMinPrice') {
      sortedData = [...dataFiltered].sort((a, b) => a.price - b.price)
    }
    if (value === 'sortMaxPrice') {
      sortedData = [...dataFiltered].sort((a, b) => b.price - a.price)
    }
    setDataFiltered(sortedData)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <aside className="flex w-full flex-col gap-5 py-10 pl-3 md:h-screen md:w-48 md:items-center">
          <div className="flex flex-wrap space-y-1 md:block">
            <h3 className="text-xl font-bold">Marcas</h3>
            <div className="flex flex-wrap gap-4 md:block md:space-y-1">
              <FilterButton
                defaultChecked
                onChange={(e) => filterByBrand(e.target.value)}
                name={'brands'}
                value={'todas'}
              >
                Todas
              </FilterButton>
              {productBrands.map((brand) => (
                <FilterButton
                  key={brand}
                  onChange={(e) => filterByBrand(e.target.value)}
                  name={'brands'}
                  value={brand}
                  featured
                >
                  {brand}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold">Precio</h3>
            <div className="flex md:block md:space-y-1">
              <FilterButton
                onChange={(e) => handlePrice(e.target.value)}
                name={'price'}
                value={'sortMinPrice'}
              >
                Más bajo
              </FilterButton>
              <FilterButton
                onChange={(e) => handlePrice(e.target.value)}
                name={'price'}
                value={'sortMaxPrice'}
              >
                Más Alto
              </FilterButton>
            </div>
          </div>
        </aside>
        <div className="w-full py-10 md:py-20">
          <h1 className="pb-10 text-center text-4xl">Monopatines</h1>

          <section className="flex w-full flex-wrap justify-center gap-4">
            {itemsData &&
              dataFiltered.map(
                ({ title, price, discount, _id: id, images }) => (
                  <ProductCard
                    key={id}
                    title={title}
                    price={price}
                    discount={discount}
                    id={id}
                    images={images[0]}
                  />
                ),
              )}
          </section>
        </div>
      </div>
    </>
  )
}

function FilterButton({ children, name, defaultChecked, onChange, value }) {
  return (
    <div className="relative flex w-fit items-center justify-center">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer absolute h-full w-full cursor-pointer appearance-none"
        onChange={onChange}
      />
      <p className="pointer-events-none rounded-md px-2 peer-checked:bg-primary-100">
        {children}
      </p>
    </div>
  )
}

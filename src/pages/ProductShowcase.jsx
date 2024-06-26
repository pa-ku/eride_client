import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/ui/Title.jsx";
import { useLocation } from "react-router";
import FavButton from "../components/ui/FavButton.jsx";
import Shipping from "../components/Shipping.jsx";
import Carousel from "../components/Carousel.jsx";
import { bikes } from "../../data.js";
import MainButton from "../components/ui/MainButton.jsx";

export default function ProductSection() {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const product = bikes.find((bike) => bike._id === productId);
  const [errMsj, setErrMsj] = useState("");
  const [shipping, setShipping] = useState();

  /*   const searchParams = useSearchParams();
  const selectedColor = searchParams.get("size");
  const selectedSize = searchParams.get("color"); */

  function handleShipping() {
    setShipping(true);
  }

  var hoy = new Date();

  // Agrega 6 días a la fecha actual
  var seisDiasDespues = new Date();
  seisDiasDespues.setDate(hoy.getDate() + 6);
  var diaDeLaSemana = seisDiasDespues.toLocaleDateString("es-ES", {
    weekday: "long",
  }) + " " + seisDiasDespues.toLocaleDateString();

  return (
    <>
      <Wrapper>
        {shipping === true && (
          <Shipping
            title={product.title}
            price={product.price}
            shipping={shipping}
            setShipping={setShipping}
          />
        )}
        <ProductCtn>
          <ImgCtn>
            <Carousel render={product.img.length} images={product.img} />
            <FavCtn>
              <FavButton id={product._id} />
            </FavCtn>
          </ImgCtn>

          <InfoCtn>
            <Title text={product.title} />
            <DescriptionTxt>{product.description}</DescriptionTxt>

            <FreeShippingCtn>
              <ReturnTitle>Llega gratis </ReturnTitle>
              <p>el {diaDeLaSemana}</p>
            </FreeShippingCtn>

            <ReturnContainer>
              <ReturnTitle>Devolución gratis</ReturnTitle>
              <ReturnSubtitle>
                {" "}
                Tenés 30 días desde que lo recibís.
              </ReturnSubtitle>
            </ReturnContainer>

            <PriceTxt>
              $
              {product.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            </PriceTxt>

            <ErrMsj>{errMsj}</ErrMsj>

            <MainButton onClick={handleShipping}>COMPRAR</MainButton>
          </InfoCtn>
        </ProductCtn>

        <SpecsWrapper>
          <Title $noBackground={true} text={"ESPECIFICACIÓNES"} />
          <SpecsContainer>
            {product.specs.map((spec) => (
              <div key={spec.nombre}>
                <SpecRow>
                  <SpecsTitle>{spec.title}</SpecsTitle>
                  <SpecsName>{spec.nombre}</SpecsName>
                  <SpecsInfo>{spec.info}</SpecsInfo>
                </SpecRow>
              </div>
            ))}
          </SpecsContainer>
        </SpecsWrapper>
      </Wrapper>
    </>
  );
}

const FreeShippingCtn = styled.div`
  display: flex;
  gap: 0.5em;
`;
const ReturnContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const ReturnTitle = styled.p`
  color: var(--main-color-450);
  font-weight: 800;
`;

const ReturnSubtitle = styled.p``;

const Wrapper = styled.div`
  padding-top: 4em;
  display: flex;
  flex-direction: column;
  gap: 5em;
  justify-content: start;

  opacity: 0;
  animation: 400ms show forwards;
`;

const ProductCtn = styled.div`
  text-align: center;
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 4em;

  min-height: 400px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ImgCtn = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  object-fit: contain;
  position: relative;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const InfoCtn = styled.div`
  width: 50%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;

  gap: 1em;
  margin-bottom: auto;
  @media (max-width: 700px) {
    width: 100%;
    padding-inline: 1em;
    text-align: start;
  }
`;

const PriceTxt = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const DescriptionTxt = styled.p`
  font-size: 15px;
  text-align: start;
  max-width: 80ch;
`;

const ErrMsj = styled.p`
  height: 6px;
  color: #bd3333;
`;
const FavCtn = styled.div`
  scale: 1.1;
  position: absolute;
  right: 20px;
  top: 10px;
  background-color: red;
`;

const SpecsWrapper = styled.div`
  background-color: #fafafa;
  width: 100%;
  text-align: center;
  padding-block: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: auto;
`;

const SpecsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;

  max-width: 1200px;
  gap: 5px;
  padding: 2em;
`;
const SpecRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`;
const SpecsName = styled.p`
  padding-left: 0.2em;
  margin-bottom: 5px;
  color: var(--main-color-600);

`;

const SpecsTitle = styled.p`
  text-transform: uppercase;
  padding-bottom: 10px;
  font-weight: 800;
  
  color: var(--main-color-700);
`;

const SpecsInfo = styled.p`
  padding-left: 0.8em;

`;

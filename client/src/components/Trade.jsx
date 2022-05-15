import React, { useContext } from 'react'
import { JokerContext } from '../context/JokerContext'
import { Loader } from '.'
import Hero from '../assets/joker-animation.svg?component'

const Trade = () => {
  const { formAmount, validAmount, handleChange, buyJokeToken, sellJokeToken, loading } =  useContext(JokerContext);

  const handleBuy = (e) => {
    const amount = formAmount;
    e.preventDefault();
    if (!amount) return;
    buyJokeToken();
  }

  const handleSell = (e) => {
    const amount = formAmount;
    e.preventDefault();
    if (!amount) return;
    sellJokeToken();
  }

  return (
    <div className="container trade__container d-flex justify-content-center align-items-center">
      <div className="d-flex w-100 flex-lg-row flex-column py-5 overflow-hidden">

        {/* Hero section */}
        <div className="d-flex flex-grow-1 justify-content-lg-start justify-content-center align-items-center">
          <div className="container">
            <Hero height="100%" width="100%" />
          </div>
        </div>

        {/* Trade form */}
        <div className="d-flex flex-grow-1 justify-content-lg-end justify-content-center align-items-center">
        <div className="trade__card blue-glassmorphism d-flex flex-column gap-3 justify-content-center align-items-center px-5 py-3">
          <div className="fs-4 mt-4 mb-2">Buy / Sell Joke Token</div>
          <input placeholder='Amount (>= 0.0001)' name="amount" type="number" step='0.0001' min='0.0001'
            onChange={handleChange} className='white-glassmorphism w-100 py-2 px-3 text-white' />

          {validAmount
            ? ( 
              <div className="trade__buttons py-4 w-100 d-flex justify-content-between gap-4">
                <button onClick={handleBuy} className='btn btn-grad w-50'>Buy</button>
                <button onClick={handleSell} className='btn btn-grad w-50'>Sell</button>
              </div> )
            : (
              <div className="trade__buttons py-4 w-100 d-flex justify-content-between gap-4">
                <button onClick={handleBuy} className='btn btn-grad w-50' disabled>Buy</button>
                <button onClick={handleSell} className='btn btn-grad w-50' disabled>Sell</button>
              </div>
            )
          }

          {loading && <Loader />}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Trade
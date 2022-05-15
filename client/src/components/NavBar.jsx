import React, { useContext } from 'react';
import { JokerContext } from '../context/JokerContext';


const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

const NavBar = () => {
  const { connectWallet, currentAccount, balance } = useContext(JokerContext);

  return (
    <nav className='w-100 d-flex flex-md-row flex-column justify-content-md-center justify-content-between align-items-center p-4'>
        <h3 className='logo m-0'>JokeTrade</h3>
        
          {currentAccount == ''
            ? ( 
              <ul className='d-flex gap-4 align-items-center m-0 py-3 px-0'>
                <li>Ethereum</li>
                <li className="btn btn-grad px-3 py-1 cursor-pointer" onClick={connectWallet}>
                  Connect Wallet
                </li>
              </ul>
            )
            : (
              <ul className='d-flex gap-4 align-items-center m-0 py-3 px-0'>
                <li className='blue-glassmorphism px-4'>{balance.toFixed(4)} JOT</li>
                <li className='blue-glassmorphism px-4'>{shortenAddress(currentAccount)}</li>
              </ul>
            )
          }

    </nav>
  )
}

export default NavBar
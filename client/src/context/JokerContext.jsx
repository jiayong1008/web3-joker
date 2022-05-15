import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import { parse } from 'dotenv';


export const JokerContext = React.createContext();
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const jokerContract = new ethers.Contract(contractAddress, contractABI, signer);


export const JokerProvider = ({ children }) => {
    
    const [currentAccount, setCurrentAccount] = useState('');
    const [formAmount, setFormAmount] = useState('0');
    const [validAmount, setValidAmount] = useState(false);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormAmount(e.target.value);
        if (parseFloat(e.target.value) >= 0.0001) setValidAmount(true);
        else setValidAmount(false);
    }

    const checkIfWalletIsConnected = async() => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                const account = accounts[0];
                setCurrentAccount(account);
                const balance = await jokerContract.balanceOf(account);
                const jotBalance = parseFloat(ethers.utils.formatUnits(balance, 18));
                setBalance(jotBalance);
            } 
            else console.log('No accounts found.');

        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    }

    const connectWallet = async() => {
        try {
            if (!ethereum) return alert("Please install metamask.");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }    
    }

    const buyJokeToken = async() => {
        try {
            if (!ethereum) return alert("Please install metamask.");

            const amount = formAmount;
            if (amount < 0.0001) alert('Minimum purchase of 0.0001 JOT.');
            const parsedAmount = ethers.utils.parseEther(amount);

            // Purchase token
            const transactionHash = await jokerContract.buy(currentAccount, { value: parsedAmount });
            setLoading(true);
            await transactionHash.wait();
            setLoading(false);
            console.log(`Success - ${transactionHash.hash}`);  
            const tokensMinted = await jokerContract.tokensMinted();      
            console.log(`Tokens minted - ${tokensMinted}`);
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    }

    const sellJokeToken = async() => {
        try {
            if (!ethereum) return alert("Please install metamask.");

            const amount = formAmount;
            if (amount < 0.0001) alert('Minimum sales of 0.0001 JOT.');
            const parsedAmount = ethers.utils.parseEther(amount); // Big Number obj
            const balance = await jokerContract.balanceOf(currentAccount); // Big Number obj
            if (balance.lt(parsedAmount)) alert('Insufficient tokens in wallet.'); // Big Number comparison

            // Sell token
            const transactionHash = await jokerContract.sell(currentAccount, parsedAmount);
            setLoading(true);
            await transactionHash.wait();
            setLoading(false);
            console.log(`Success - ${transactionHash.hash}`);  
            const tokensMinted = await jokerContract.tokensMinted();      
            console.log(`Tokens minted - ${tokensMinted}`);
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw new Error('No ethereum object.');
        }
    }

    const getJotBalance = async() => {
        const balance = await jokerContract.balanceOf(currentAccount);
        const jotBalance = parseFloat(ethers.utils.formatUnits(balance, 18));
        console.log(`JOT Balance - ${jotBalance}, ${typeof(jotBalance)}`);
        setBalance(jotBalance);
        window.localStorage.setItem("jotBalance", jotBalance);
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        // getJotBalance();
    }, []);

    return (
        <JokerContext.Provider value={{ connectWallet, currentAccount, formAmount, setFormAmount, 
            validAmount, handleChange, buyJokeToken, sellJokeToken, balance, loading }}>
            {children}
        </JokerContext.Provider>
    )
}
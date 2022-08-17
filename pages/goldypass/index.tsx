import cn from 'classnames';
import styles from './index.module.scss';
import GoldyPassBuyCard from 'components/cards/GoldyPassBuyCard';
import { goldypasspage_data } from 'utils/data'
import { useEffect, useRef, useState } from 'react';
import BuyGoldy from 'components/popups/BuyGoldy';
import { hideOverlay, showOverlay } from 'slices/utilSlice';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { marketplace_ABI, marketplace_Address, usdt_ABI, usdt_address } from 'utils/contracts';
import { useRouter } from 'next/router';
import SuccessPopup from 'components/popups/SuccessPopup';
import ErrorPopup from 'components/popups/ErrorPopup';

  
export default function GoldyPass() {

    const wrapper = useRef<HTMLDivElement>();
    const [width, setWidth] = useState(0);
    const colCount = Math.floor(width / 278);

    const [isBuyGoldyOpen, openBuyGoldy] = useState(false);
    const dispatch = useDispatch();
    const [goldyPass, setGoldyPass] = useState({name: '', type: 0});
    const [balance, setBalance] = useState(-1);
    const [approved, setApproved] = useState(false);
    const [approving, setApproving] = useState(false);
    const [buying, setBuying] = useState(false);

    const { library, account } = useWeb3React();
    const router = useRouter();

    useEffect(() => {
        if(!isBuyGoldyOpen || !library) return;
        setBalance(-1);
        const web3 = new Web3(library.provider);
        const usdt = new web3.eth.Contract(usdt_ABI as any, usdt_address);
        usdt.methods.balanceOf(account).call()
            .then(ret => {
                const balance = web3.utils.fromWei(ret, 'mwei');
                setBalance(Number(balance));
            })
    }, [isBuyGoldyOpen, library])

    const openPopup = (pet) => {
        if(!account) {
            router.replace('/auth/wallet');
            return;
        }
        setGoldyPass(pet);
        dispatch(showOverlay());
        openBuyGoldy(true);
    }

    const closePopup = () => {
        dispatch(hideOverlay());
        openBuyGoldy(false);
    }

    useEffect(() => {
        setApproved(false);
        if(!account) return;
        const web3 = new Web3(library.provider);
        const usdt = new web3.eth.Contract(usdt_ABI as any, usdt_address);  
        usdt.methods.allowance(account, marketplace_Address).call()
            .then((allowance) => {
                allowance = web3.utils.fromWei(allowance, 'mwei');
                if(allowance >= 20) 
                    setApproved(true);
            })
            .catch((e) => {

            })
    }, [account])

    const onApprove = () => {
        setApproving(true)
        const web3 = new Web3(library.provider);
        const usdt = new web3.eth.Contract(usdt_ABI as any, usdt_address);  
        usdt.methods.approve(marketplace_Address, web3.utils.toWei('1000', 'mwei')).send({ from: account })
            .then(() => {
                setApproving(false);
                setApproved(true);
            })
            .catch(() => {
                setApproving(false);
            })
    }

    const onBuy = () => {
        setBuying(true)
        const web3 = new Web3(library.provider);
        const marketplace = new web3.eth.Contract(marketplace_ABI as any, marketplace_Address);  
        console.log(marketplace.methods);
        marketplace.methods.buyGoldyPass(goldyPass.type).send({ from: account })
            .then(() => {
                setBuying(false);
                closePopup();
                showSuccessPopup(true);
            })
            .catch((e) => {
                setBuying(false);
                if(e.code == 4001) return;
                closePopup();
                showErrorPopup(true);
            })
    }

    const [isSuccessVisible, showSuccessPopup] = useState(false);

    const onSuccessClose = () => {
        showSuccessPopup(false);
        router.replace('/account/inventory/goldypass');
    };

    const [isErrorVisible, showErrorPopup] = useState(false);

    const onErrorClose = () => {
        showErrorPopup(false);
    };


    useEffect(() => {
        if(!wrapper.current) return;
        const onResize = () => {
            setWidth(wrapper.current.clientWidth);
        }
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, [wrapper])

    return (
        <div className={cn('pb-[195px] w-full text-white flex justify-center', styles.container)}>
            <div className='2xl:w-[1400px] mx-[30px]'>
                <div style={{paddingLeft: width ? (width - colCount * 278) / 2 : 0}}>
                    <div className='pt-[52px] text-[83px] pl-[12px] font-euro font-bold'>
                        Goldy Pass
                    </div>
                    <div className='text-[14px] pl-[12px] pt-[14px] pb-[40px]'>
                        The Goldy pass grants players access to play on the metaverse by giving out one of our 12 kinds of Goldy. 
                        <br/>
                        Goldy pass&apos;s Goldy is different from our generated Goldy in the Marketplaces.
                    </div>
                </div>
                <div className='flex flex-wrap justify-center' ref={wrapper}>
                    {
                        goldypasspage_data.map((pet, key) => (
                            <GoldyPassBuyCard key={key} {...pet} onBuy={() => openPopup(pet)}/>
                        ))
                    }
                    {
                        [0,0,0,0,0].map((value, key) => (
                            <div key={key} className='w-[266px] mx-[6px]'>
                            </div>
                        ))
                    }
                </div>
            </div>
            <BuyGoldy 
                name={goldyPass.name}
                balance={balance}
                approved={approved}
                buying={buying}
                onBuy={onBuy}
                approving={approving}
                onApprove={onApprove}
                isOpen={isBuyGoldyOpen} 
                onClose={closePopup}
            />
            <SuccessPopup onClose={onSuccessClose} visible={isSuccessVisible} msg={`Buy GoldyPass ${goldyPass.name.toUpperCase()} successful`} />
            <ErrorPopup onClose={onErrorClose} visible={isErrorVisible}/>
        </div>
    )
} 
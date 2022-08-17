import cn from 'classnames';
import styles from './index.module.scss';
import PetCard from 'components/cards/PetCard';
import { useEffect, useRef, useState } from 'react';
import { goldypetspage_data } from 'utils/data';
import SuccessPopup from 'components/popups/SuccessPopup';
import ErrorPopup from 'components/popups/ErrorPopup';
import { goldefy_ABI, goldefy_Address } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import Axios from 'core/utils/axios';
import { hideSpinner, showSpinner } from 'slices/utilSlice';
import { useDispatch } from 'react-redux';

export default function GoldyPets() {

    const wrapper = useRef<HTMLDivElement>();
    const [width, setWidth] = useState(0);
    const colCount = Math.floor(width / 280);
    let divCount = 0;
    if(goldypetspage_data.length >= colCount && goldypetspage_data.length % colCount > 0)
        divCount = colCount - goldypetspage_data.length % colCount

    useEffect(() => {
        if(!wrapper.current) return;
        const onResize = () => {
            setWidth(wrapper.current.clientWidth);
        }
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, [wrapper])

    const [isSuccessVisible, showSuccessPopup] = useState(false);

    const onSuccessClose = () => {
        showSuccessPopup(false);
        router.replace('/account/inventory/pets');
    };

    const [isErrorVisible, showErrorPopup] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onErrorClose = () => {
        showErrorPopup(false);
    };

    const {account, library} = useWeb3React();

    const router = useRouter();
    const dispatch = useDispatch();

    const onClaim = async (petType) => {
        if(!library?.provider || !account) {            
            router.replace('/auth/wallet');
            return;
        }
        
        dispatch(showSpinner());
        const web3 = new Web3(library.provider);
        const contract = new web3.eth.Contract(goldefy_ABI as any, goldefy_Address);
        const resp = await Axios.post('pet/get-merkle-path') as any;
        if(resp.error_code != 0) return
        if(!resp.data.merkleLeaf){
            dispatch(hideSpinner());
            setErrorMsg('Not Pet NFT event winner');
            showErrorPopup(true);
            return;
        }
        const {index, proof} = resp.data.merkleLeaf;
        try{
            await contract.methods.claimFirstWhitelist(petType, index, proof).send({from: account});
            dispatch(hideSpinner());
            showSuccessPopup(true);
        } catch(e) {
            dispatch(hideSpinner());
            if(e.code == 4001) {
                return;
            }
            setErrorMsg('');
            showErrorPopup(true);
        }
    }

    return (
        <div className={cn('flex justify-center 2xl:pb-[195px] xl:pb-[150px] pb-[100px]', styles.container)}>
            <div className='2xl:w-[1400px] mx-[30px]'>
                <div style={{paddingLeft: width ? (width - colCount * 280) / 2 : 0}}>
                    <div className='2xl:pt-[107px] xl:pt-[52px] pt-[40px] 2xl:pb-[50px] xl:pb-[30px] pb-20px text-[93px] font-euro'>
                        Goldy Pets
                    </div>
                </div>
                <div className='flex flex-wrap justify-center' ref={wrapper}>
                    {
                        goldypetspage_data.map((pet, key) => (
                            <PetCard key={key} {...pet} onClaim={() => onClaim(pet.type)} enableClaim={account ? true : false}/>
                        ))
                    }
                    {
                        divCount > 0 && (new Array(divCount)).fill(0).map((value, key) => (
                            <div className='w-[280px]' key={key}>
                            </div>
                        ))
                    }
                </div>
            </div>
            <SuccessPopup onClose={onSuccessClose} visible={isSuccessVisible}/>
            <ErrorPopup onClose={onErrorClose} visible={isErrorVisible} msg={errorMsg}/>
        </div>
    )
} 
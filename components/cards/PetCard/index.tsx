import cn from 'classnames';
import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const attributes = [
    {
        image: '/images/a1.png'
    },
    {
        image: '/images/a2.png'
    },
    {
        image: '/images/a3.png'
    },
    {
        image: '/images/a4.png'
    },
]

const PetCard = ({ name, image, onClaim, enableClaim = false }) => {

    const [tooltip, setTooltip] = useState(null);
    const [tooltipImage, setTooltipImage] = useState('');
    const [showClaim, setShowClaim] = useState(false);

    useEffect(() => {
        if(tooltip != null) 
            setTooltipImage(attributes[tooltip].image);
    }, [tooltip])

    return (
        <div className='relative mb-[22px] mx-[7px]' 
            onMouseLeave={() => enableClaim && setShowClaim(false)}
        >
            {/* CARD */}
            <div className={cn('flex flex-col w-[266px] h-[357px] ', styles.petcard, enableClaim && showClaim && 'brightness-50')}
                onClick={() => enableClaim && setShowClaim(true)}
            >
                <div className={cn('flex items-center justify-center mt-[17px] mx-auto text-[13px]', styles.toppanel)} style={{color: '#71FFCF'}}>
                    {name}
                </div>
                <div className='mx-auto mt-[7px]'>
                    <Image alt='' src={image} width='194' height='190' />
                </div>
                <div className='text-white text-[13px] text-[#E9E9E9] pl-[27px] pt-[7px] leading-none'>
                    Attributes
                </div>
                <div className='flex flex-row justify-between px-5 pt-[3px]'>
                    {
                        attributes.map((attr, key) => (
                            <div 
                                key={key} 
                                onMouseOver={() => !showClaim && setTooltip(key)} onMouseLeave={() => setTooltip(null)}
                                className='my-[7px] cursor-pointer'
                            >
                                <Image alt='' src={attr.image} width='50' height='50' />
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* TOOLTIP */}
            <div className={cn('absolute z-10 flex flex-row -bottom-[66px] py-[5px] ml-[6px] w-[254px] h-[62px] bg-[#032330] border-[#067e93] border-[1px]', tooltip != null ? 'transition-opacity duration-300' : 'opacity-0 hidden')}>
                <div className='ml-[10px] shrink-0'> 
                    {tooltipImage && <Image width='50' height='50' alt='' src={tooltipImage} /> }
                </div>
                <div className='text-white px-[15px] text-[11px]'>
                    When the equipped Goldy breeds
                    the chance of breeding advantage
                    increases by 1%
                </div>
            </div>

            {/* CLAIM Button */}
            <button className={cn('absolute w-[203px] h-[80px] top-[125px] left-[34px]', styles.claimbutton, (!enableClaim || !showClaim ) && 'hidden')}
                onClick={onClaim}
            >
            </button>
        </div>
    )
}

export default PetCard;
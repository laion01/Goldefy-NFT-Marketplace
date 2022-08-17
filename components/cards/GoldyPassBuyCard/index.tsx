import cn from 'classnames';
import styles from './index.module.scss';
import Image from "next/image";

const GoldyPassBuyCard = ({ name, stone, onBuy }) => {

    return (
        <div className={cn('relative flex flex-col items-center w-[266px] h-[357px] mb-[22px] mx-[6px]', styles.card)}>
            <div className={cn('relative flex items-center justify-center mt-6 text-[13px]', styles.toppanel)} style={{color: '#71FFCF'}}>
                { name }
                <div className={styles.stone}>
                    <Image width='21' height='21' alt='' src={`/images/goldypass/${stone}.png`} />
                    <div className='absolute text-white text-[10px] -bottom-[12px]'>
                        { stone }
                    </div>
                </div>
            </div>
            <div className='relative mt-5 mx-auto' >
                <Image width='168' height='168' alt='' src={`/images/goldypass/${name}.png`} />
            </div>
            <div className='mt-[16px] flex items-center text-[25px] text-white'>
                <div className={cn('flex flex-col w-[70px] h-[77px] text-white items-center justify-center', styles.price_button)}>
                    <div className='text-[26px]'>20</div>
                    <div className='text-[12px] -mt-3'>USDT</div>
                </div>
                <button className={cn('text-[16px] w-[162px] h-[64px]', styles.buy_button)}
                    onClick={onBuy}
                >
                    BUY
                </button>
            </div>
        </div>
    )
}

export default GoldyPassBuyCard;
import cn from 'classnames';
import styles from './index.module.scss';
import Image from 'next/image';

const GoldyPassCard = ({ id, image, stone, stone_image }) => {

    return (
        <div key={id} className={cn('relative flex flex-col items-center w-[266px] h-[357px] mb-[22px]', styles.card)}>
            <div className={cn('relative flex items-center justify-center mt-6 text-[13px]', styles.toppanel)} style={{color: '#71FFCF'}}>
                Goldy#{id}
                <div className={styles.stone}>
                    <Image alt='' src={stone_image} width='21' height='21'/>
                    <div className='absolute text-white text-[10px] -bottom-[10px] mt'>
                        { stone }
                    </div>
                </div>
            </div>
            <div className='relative mt-5 mx-auto'>
                <Image alt='' src={image} width='168' height='168' />
            </div>
            <div className='mt-[40px] text-[25px] text-white'>
                GOLDY PASS
            </div>
        </div>
    )
}

export default GoldyPassCard;
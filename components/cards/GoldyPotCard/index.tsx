import cn from 'classnames';
import styles from './index.module.scss';

const GoldyPotCard = ({ id, tournament, no, lucky_number }) => {

    return (
        <div key={id} className={cn('relative flex flex-col w-[351px]')}>
            <div className={cn('relative w-[351px] h-[176px]', styles.card)}>
                <div className='absolute flex flex-col items-center text-[9px] text-[#2E2E2E] top-[38px] left-[131px]'>
                    TOURNAMENT
                    <div>#{tournament}</div>
                </div>
                <div className='absolute left-[231px] top-[31px] text-[27px] text-[#2E2E2E]'>
                    {no.toString().replace(/(.)/g, '$1 ')}
                </div>
            </div>
            <div className='flex text-[14px] text-white'>
                <div className='ml-[20px]'>
                    Luck Number #{lucky_number}
                </div>
                <div className='ml-[20px]'>
                    Ticket No. {no}
                </div>
            </div>
        </div>
    )
}

export default GoldyPotCard;
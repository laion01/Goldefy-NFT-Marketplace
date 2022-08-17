import cn from "classnames"
import { BeatLoader, BarLoader } from 'react-spinners'

export default function BuyGoldy({ name, balance, price = 20, approved = false, isOpen = true, onClose, onApprove, onBuy, approving, buying }) {
    return (
        <div className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30', !isOpen && 'hidden')}>
            <div className='w-[480px] border border-[#025962] rounded-[16px] bg-[#02222A] text-white text-[21px]'>
                <div className='h-[70px] flex justify-between items-center pl-[40px] pr-[38px] border-b border-[#025962]'>
                    BUY GOLDY PASS
                    <button className='text-[#025962] text-[18px] font-euro font-bold'
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className='px-[35px] pt-[13px] pb-[30px] text-[16px] border-b border-[#025962]'>
                    You are about to purchase Goldy Pass {name.toUpperCase()} on the marketplace
                    <div className='pt-[8px] flex justify-between'>
                        Your Balance
                        <span className='flex items-center'>
                            { balance >= 0 
                                ? balance
                                : <BeatLoader color='white' size='10px' />
                            } 
                            &nbsp; USDT
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        Goldypass Price
                        <span>{ price } USDT</span>
                    </div>
                </div>
                {
                    balance >= 0 && balance < price &&
                    <div className='w-[384px] h-[90px] mt-[40px] mx-auto flex flex-col items-center justify-center rounded-[10px] bg-[#CE454F]'>
                        Not enough Balance
                        <span className='text-[12px] px-[70px] text-center'>
                            Your balance is not enough funds. Please deposit more and submit again.
                        </span>
                    </div>
                }
                <div className='pb-[36px] pt-[25px] flex justify-between px-[44px]'>
                    <button className='bg-[#01171D] w-[189px] h-[53px] rounded-[10px] text-[17px]'
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                    {
                        approved ?
                        <button className={cn('relative w-[189px] h-[53px] rounded-[10px] text-[17px] text-black',
                                balance < price || buying ? 'bg-[#949494]' : 'bg-[#FFD943]'
                            )}
                            onClick={onBuy}
                            disabled={balance < price || buying}
                        >
                            BUY
                            {
                                buying &&
                                <BarLoader 
                                    className='left-1/2 -translate-x-1/2 bottom-[4px]' 
                                    cssOverride={{position:'absolute'}}
                                    height={6}
                                    width={120}
                                />
                            }
                        </button> :
                        <button 
                            className={cn('relative w-[189px] h-[53px] rounded-[10px] text-[17px] text-black',
                                balance < price || approving ? 'bg-[#949494]' : 'bg-[#FFD943]'
                            )}
                            onClick={onApprove}
                            disabled={balance < price || approving}
                        >
                            Approve
                            {
                                approving &&
                                    <BarLoader 
                                        className='left-1/2 -translate-x-1/2 bottom-[4px]' 
                                        cssOverride={{position:'absolute'}}
                                        height={6}
                                        width={120}
                                    />
                            }
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
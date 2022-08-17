import Image from "next/image"

export default function SuccessPopup({ onClose, visible, msg = '' }) {
    if(!visible) return (<></>);
    return (
        <div>
            <div className='fixed w-screen h-screen left-0 top-0 bg-transparent'
                onClick={onClose}
            ></div>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[345px] bg-white rounded-[10px] px-[24px] pb-[34px]'>
                <div className='flex items-center justify-between h-[78px] w-full text-[20px]'>
                    Success
                    <button onClick={onClose}>x</button>
                </div>
                <div className='flex flex-col items-center justify-between text-[20px] pt-[10px] pb-[40px]'>
                    <Image src='/images/components/check.png' width='64' height='64' />
                    <div className='pt-[35px] text-center text-[#111]'>
                        {
                            msg ? msg :
                            `Your claim was proceed  successfully.`
                        }
                    </div>
                </div>
                <button className='bg-[#02232c] rounded-[10px] text-white text-[20px] h-[64px]'
                    onClick={onClose}
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}
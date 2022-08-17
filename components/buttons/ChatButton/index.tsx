import Image from "next/image";

const ChatButton = ({ imagePath, bgColor, text }) => {
    return (
        <button className='w-fit flex items-center rounded-[13px] h-[45px] pl-[19px] pr-6 text-white' style={{background: bgColor}}>
            <Image width='32' height='32' alt='' src={imagePath} />
            <div className='pl-[21px] text-[10px] sm:text-[12px]'>
                { text }
            </div>
        </button>
    )
}

export default ChatButton;
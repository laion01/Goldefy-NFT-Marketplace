import { useRouter } from "next/router";
import cn from 'classnames';
import Image from "next/image";

const GoBack = ({ className }) => {
    const router = useRouter();
    return (
        <div className={cn('absolute flex flex-row items-end text-[12px] text-[#43F3FF] cursor-pointer', className)}
            onClick={() => router.back()}
        >
            <div className='mr-[9px]' >
                <Image width='25' height='20' alt='' src='/images/back.png'/>
            </div>
            Go Back
        </div>
    )
}

export default GoBack;
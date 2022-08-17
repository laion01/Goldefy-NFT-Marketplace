import cn from 'classnames';

export default function TokenTooltip({ isVisible, children, className }) {
    return (
        <div className={cn('absolute h-[70px] py-[7px] px-[17px] bg-black text-white text-[12px] rounded-[8px]', !isVisible && 'hidden', className)}>
            { children }
        </div>
    )
}
import clsx from "clsx";


export const Input = ({ type, className, ...rest }) => {
    const style = clsx('h-12 rounded-lg text-xl w-80 border-secondary border-2 py-2 px-2 outline-none', className)
    if (type === 'textarea') {
        return <textarea className={style.replace('h-12', 'h-52')} {...rest}/>
    }
    return <input className={style} {...rest}/>
}
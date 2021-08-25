import clsx from 'clsx';
import * as React from 'react'
import { Link } from 'react-router-dom';


export const AnchOrLink =  React.forwardRef((props, ref) => {
    const {href = '', ...rest} = props
    if (href.startsWith('http') || href.startsWith('#')) {
        return (<a {...props} ref={ref}>{props.children}</a>)
    } else {
        return <Link to={href} {...rest} ref={ref} />
    }
})

export const Button = ({variant, className, children, size, ...buttonProps}) => {
    return (
        <button className={className} {...buttonProps}>
            <ButtonInner variant={variant} size={size}>
                {children}
            </ButtonInner>
        </button>
    )
}

export const ButtonInner = ({size, children, variant}) => {
    return (
        <div className={clsx(
            'h-12 py-0 px-4 flex justify-center items-center text-white rounded-md font-Poppins',
                {
                    'px-11 py-6 space-x-5': size !== 'medium',
                    'px-8 py-4 space-x-3': size === 'medium',
                    'w-80 px-8 py-4 space-x-3': size === 'large',
                    'text-primary': variant === 'secondary',
                    'text-secondar': variant === 'primary',
                    'bg-secondary': variant === 'secondary'
                }
            )}>
            {children}
        </div>
    )
}

export const ButtonLink = ({children, href, to}) => {
    return (
        <AnchOrLink
            href={href}
            to={to}
        >
            <ButtonInner>
                {children}
            </ButtonInner>
        </AnchOrLink>
    )
}
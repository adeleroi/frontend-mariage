import * as React from 'react'
import clsx from 'clsx'

const fontSize = {
    h1: 'leading-tight text-6xl md:text-7l font-Dancing',
    h2: 'leading-tight text-5xl md:text-6xl font-Dancing',
    h3: 'text-3xl font-medium md:text-3xl font-Dancing',
    h4: 'text-xl font-medium md:text-xl',
    h5: 'text-xl font-medium md:text-2xl font-Dancing',
    h6: 'text-xl font-medium font-Dancing',
  }

const titleColors = {
    primary: "text-black",
    secondary: "text-yellow-3000"
}

function Title({
    variant = titleColors.primary,
    size,
    as,
    className,
    ...rest
}) {
    const Tag = as ?? size
    return (
        <Tag
            className={clsx(fontSize[size],  titleColors[variant], className)}
            {...rest}
        />
    )
}

function H1(props) {
    return <Title {...props} size="h1"/>
}

function H2(props) {
    return <Title {...props} size="h2"/>
}

function H3(props) {
    return <Title {...props} size="h3"/>
}

function H4(props) {
    return <Title {...props} size="h4"/>
}

function H5(props) {
    return <Title {...props} size="h5"/>
}

function H6(props) {
    return <Title {...props} size="h6"/>
}


function Paragraph({
    as = "p",
    className,
    ...rest
}) {
    return React.createElement(as, {
        className: className,
        ...rest
    })
}

export { H1, H2, H3, H4, H5,H6, Paragraph }

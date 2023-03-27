import './Button.css';

export const Button = ({children,variant,noPadding,onClick}) => {
    const classNames =  
    `${variant === 'classic' ? 'button--classic' : ''}
    ${noPadding ? 'button--no-padding' : ''} `

    return (
        <button className={classNames} onClick={onClick}>{children}</button>
    )
}
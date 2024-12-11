import '../sass/Button.scss'


function Button({ children, onClick, disabled, className }) {  
    return (
       
            <button className={`Button-container ${className || ''}`} onClick={onClick}
            disabled={disabled}>
             {children}
            </button>
      
    )
}

export default Button

import React from 'react'
import Logo from '../images/icon.png'
import './styles/Header.css'

const Header = () => {
    return (
        <div className='contHeader'>
            <div className="header">
                <img src={Logo} className="img" />
            </div>
        </div>
    )
}

export default Header
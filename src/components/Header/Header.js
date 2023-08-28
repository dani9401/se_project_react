import './Header.css'

const Header = ({onCreateModal, weatherLocation}) => {
    return (
        <header className='header'>
                <div className="header__menu-left">
                <div className="header__logo">
                    <img src={require('../../images/Logo_wtwr.svg').default} alt='logo'></img>
                    </div>
                <div className="header__date-location">August 23, {weatherLocation}</div>
                </div>
                <div className="header__menu-right">
                <div>
                    <button className="header__add-button" onClick={onCreateModal} type='text'>+ Add Clothes</button>
                </div>
                <div className="header__name">Danielle Foss</div>
                <div>
                    <img src={require('../../images/avatar.svg').default} alt='avatar' className="header__avatar"></img></div>
                </div>
            </header>
    )
}

export default Header;
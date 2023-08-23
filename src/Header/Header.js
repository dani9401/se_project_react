import './Header.css'

const Header = ({onCreateModal}) => {
    return (
        <header className='header'>
                <div className="header__logo">
                <div>
                    <img src={require('../images/Logo_wtwr.svg').default} alt='logo'></img>
                    </div>
                <div>Date</div>
                </div>
                <div  className="header__avatar-logo">
                <div>
                    <button onClick={onCreateModal} type='text'>Add New Clothes</button>
                </div>
                <div>Name</div>
                <div><img src={require('../images/avatar.svg').default} alt='avatar'></img></div>
                </div>
            </header>
    )
}

export default Header;
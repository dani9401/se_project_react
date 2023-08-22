import Header from './Header/Header.js'
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import ModalWithForm from './ModalWithForm/ModalWithForm.js';

function App() {
    const weatherTemp = "65°F";
    return (
        <div>
            <Header/>
            <Main weatherTemp={weatherTemp}/>
            <Footer/>
            <ModalWithForm title="New Garment">These are the children</ModalWithForm>
        </div>
    );
}

export default App;
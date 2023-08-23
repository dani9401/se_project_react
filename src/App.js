import Header from './Header/Header.js'
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import ModalWithForm from './ModalWithForm/ModalWithForm.js';
import ItemModal from './ItemModal/ItemModal.js';
import { useState } from 'react';

function App() {
    const weatherTemp = "65°F";
    const [activeModal, setActiveModal] = useState(''); //setting the default values for modals 
    //when page renders. Make sure to always use a string. 
    //this allows react to know what the starting default value is
    //and how to move forward from that starting value
    //so if it's a string, it's expecting string values
    //if it's a boolean, it'll expect only booleans, 
    //if it's a number, it'll expect numbers, etc

    const [selectedCard, setSelectedCard] = useState({}); //we chose and empty object on this one because
    // the defaultClothingItems (ie: the card) is also an object. 

    console.log(selectedCard)

    const handleCreateModal = () => {
        setActiveModal("create")
    };

    const handleCloseModal = () => {
        setActiveModal("")
    };

    const handleSelectedCard = (card) => {
        setActiveModal("preview");
        setSelectedCard(card);
    };

    return (
        <div>
            <Header onCreateModal={handleCreateModal}/>
            <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard}/>
            <Footer/>
            {activeModal === "create" && (
            <ModalWithForm title="New Garment" onClose={handleCloseModal}>
                <label>
                    Name
                    <input inputType="text" name='name' minLength="1" maxLength="30"></input>
                </label>
                <label>
                    Image
                    <input inputType="url" name='link' minLength="1" maxLength="200"></input>
                </label>
                <p>Select Weather Type:</p>
                <div>
                    <div>
                        <input type="radio" id="hot" value="hot"></input>
                        <label>Hot</label>
                    </div>
                    <div>
                        <input type="radio" id="warm" value="warm"></input>
                        <label>Warm</label>
                    </div>
                    <div>
                        <input type="radio" id="cold" value="cold"></input>
                        <label>Cold</label>
                    </div>
                </div>
            </ModalWithForm>
    )}
        {activeModal === "preview" && 
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal}/>
    }
        </div>
    );
}

export default App;
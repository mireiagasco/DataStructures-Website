const name = document.querySelector('#name');
const nameError = document.querySelector('.name-error');

const email = document.getElementById('email');
const emailError = document.querySelector('.email-error');

const message = document.getElementById('message');
const messageError = document.querySelector('.message-error');

const submitbtn = document.querySelector('.submitbtn');
const cancelbtn = document.querySelector('.cancelbtn');
const form = document.querySelector('.form-container');
const contactbtn = document.querySelector('.contact-icon-wrapper');

const infoPanel = document.querySelector('.infoPanel');
const infoPanelText = document.querySelector('.panel-text');
const infoPanelbtn = document.querySelector('.panelbtn');



/*--------------------------------------------------------------------
                    Data validation & sending email
--------------------------------------------------------------------*/

function errorStyle(fieldError, field){
    fieldError.style.display = "block";
    field.style.borderColor = "red";
}

function normalStyle(fieldError, field){
    fieldError.style.display = "none";
    field.style.borderColor = "#343A40";
}

submitbtn.addEventListener('click', (e)=>{
    var correctName = false;
    var correctEmail = false;
    var correctMessage = false;

    if (name.value === "" || name.value === null){
        errorStyle(nameError, name);
        correctName = false;
    }
    else{
        normalStyle(nameError, name);
        correctName = true;
    }

    if (email.value === "" || email.value === null || !emailIsValid(email.value)){
        errorStyle(emailError, email);
        correctEmail = false;
    }
    else{
        normalStyle(emailError, email);
        correctEmail = true;
    }

    if (message.value === "" || message.value === null){
        errorStyle(messageError, message);
        correctMessage = false;
    }
    else{
        normalStyle(messageError, message);
        correctMessage = true;
    }

    e.preventDefault();

    if (correctName && correctEmail && correctMessage){
        submitForm(name.value, email.value, message.value);
    }

})

function emailIsValid(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm(name, email, message){

    var params = {
        name: name,
        email: email,
        message: message
    };
    emailjs.send('service_9yuw7i8', 'template_em6ne6n', params).then(function(res){

        if (res.status === 200){
            showInfoPanel('Your message was sent successfully!');
        }
        else{
            showInfoPanel('An unexpected error ocurred');
        }
    });

    
}

function showInfoPanel(message){
    toggleForm();
    infoPanel.style.display = "grid";
    backdrop.style.display = "block";
    infoPanelText.textContent = message;
}

infoPanelbtn.addEventListener('click', ()=>{
    infoPanel.style.display = "none";
    backdrop.style.display = "none";
})





/*--------------------------------------------------------------------
                    General animation
--------------------------------------------------------------------*/
const backdrop = document.querySelector('.backdrop');
var isVisible = false;

contactbtn.addEventListener('click', toggleForm);

cancelbtn.addEventListener('click', toggleForm);

function toggleForm(){
    if (!isVisible){
        form.style.display = "grid"
        backdrop.style.display = "block"
        isVisible = true;
        normalStyle(nameError, name);
        normalStyle(emailError, email);
        normalStyle(messageError, message);
        clearContent();
    }
    else{
        form.style.display = "none"
        backdrop.style.display = "none"
        isVisible = false;
    }
}

function clearContent(){
    name.value = null;
    email.value = null;
    message.value = null;
}




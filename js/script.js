document.querySelectorAll('.select p').forEach( item => {
   
    item.addEventListener('click', () => {

        item.closest('label').querySelector('input').value = item.textContent;
        
        document.querySelectorAll('.select p').forEach( elem => {
            elem.classList.remove('active');
        })

        item.classList.add('active');
    })
});

document.querySelector('.form').addEventListener('submit', (e) => {
    
    e.preventDefault();

    let formData = new FormData(e.target);

    let htmlPopup = ``;
    
    let formDataObject = {};

    formData.forEach( (value, index) => {
        
        let name = document.querySelector(`input[name=${index}]`).getAttribute('data-name');
        
        htmlPopup += `<p>${name}: <span>${value}</span><p>`;
        
        formDataObject[index] = value;
    });

    e.target.setAttribute('data-form', JSON.stringify(formDataObject));

    document.querySelector('.popup-body').innerHTML = htmlPopup;
    
    document.querySelector('.popup').classList.add('active');
});

document.querySelector('.popup-btn').addEventListener('click', btn => {

    setTimeout(() => {
        
        document.querySelector('.popup').classList.remove('active');  

        document.querySelector('.main .container').innerHTML = `
            <h1 class="main-title"><span class="main-title-success">✓</span>Заказ успешно оформлен!</h1>
        `;
    }, 500);
    
    let formData = JSON.parse(document.querySelector('.form').getAttribute('data-form'));
    
    console.log('formData: ', formData);
});

document.querySelectorAll('.popup-close, .popup-bg').forEach( closeElem => {
    
    closeElem.addEventListener('click', () => {
        
        document.querySelector('.popup').classList.remove('active')
    });
});

document.querySelectorAll('.dropdown p').forEach( item => {
    
    item.addEventListener('click', () => {

        item.closest('label').querySelector('input').value = item.textContent;
    });
})

document.querySelector('.dropdown-input').addEventListener('click', () => {
    
    document.querySelector('.dropdown').classList.toggle('active');
});

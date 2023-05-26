/* функционал для поля ввода "Какой вид ПО вам нужен" */

/* находим все варианты в полях ввода со списоком и проходимся по ним циклом */
document.querySelectorAll('.select p').forEach( item => {
    
    /* навешиваем на каждый элемент списка событие "клик" */
    item.addEventListener('click', () => {

        /* находим сначала родительский элемент label, затем нужный input который примет в себя значение кликнутого элемента и присваиваем значение */
        item.closest('label').querySelector('input').value = item.textContent;

        /* снова находим все элементы списков и убираем у них класс active, чтобы элемент с классом active был только один */
        document.querySelectorAll('.select p').forEach( elem => {
            elem.classList.remove('active');
        })

        /* навешиваем на элемент класс active, чтобы визуально выделить его */
        item.classList.add('active');
    })
});


/* находим форму по классу и навешиваем событие submit */
document.querySelector('.form').addEventListener('submit', (e) => {
    /* отменяет стандартное действие формы */
    e.preventDefault();

    /* создаем массив с данными формы */
    let formData = new FormData(e.target);

    /* переменная, в которой будет храниться html код для подстверждения заказа*/
    let htmlPopup = ``;

    /* создаем объект, в котором будут храниться данные формы для сохранения в атрибут и последующего вывода в консоль браузера (использовать formData нельзя, т к тогда в консоль будет выводиться пустой объект) */
    let formDataObject = {};

    /* проходимся циклом по массиву с данными формы*/
    formData.forEach( (value, index) => {
        /* берем названия полей на русском (указывается в верстке в атрибуте data-name) */
        let name = document.querySelector(`input[name=${index}]`).getAttribute('data-name');
        
        /* добавляем в переменную html код для подтверждения заказа */
        htmlPopup += `<p>${name}: <span>${value}</span><p>`;
    
        /* заполняем объект данными формы */
        formDataObject[index] = value;
    });

    /* добавляем форме атрибут data-form и сохраняем в него данные формы вида JSON */
    e.target.setAttribute('data-form', JSON.stringify(formDataObject));

    /* добавляем во всплывающее окно html код из переменной */
    document.querySelector('.popup-body').innerHTML = htmlPopup;
    /* делаем всплывающее окно активным */
    document.querySelector('.popup').classList.add('active');
});

/* навешиваем событие клик на кнопку "Подтвердить" во всплывающем окне */
document.querySelector('.popup-btn').addEventListener('click', btn => {

    /* делаем задержку кода в 500мс чтобы был плавный переход */
    setTimeout(() => {
        /* скрываем всплывающее окно */
        document.querySelector('.popup').classList.remove('active');  

        /* меняем содержимое html кода на уведомление об успешном оформлении заказа */
        document.querySelector('.main .container').innerHTML = `
            <h1 class="main-title"><span class="main-title-success">✓</span>Заказ успешно оформлен!</h1>
        `;
    }, 500);
    
    /* берем JSON-данные из атрибута формы data-form */
    let formData = JSON.parse(document.querySelector('.form').getAttribute('data-form'));
    
    /* выводим данные заказа в консоль браузера */
    console.log('formData: ', formData);
});

/* находим элементы всплывающего окна (крестик и фон) для закрытия и проходимся по ним циклом */
document.querySelectorAll('.popup-close, .popup-bg').forEach( closeElem => {
    
    /* для каждого элемента навешиваем событие клик */
    closeElem.addEventListener('click', () => {
        
        /* скрываем всплывающее окно */
        document.querySelector('.popup').classList.remove('active')
    });
});

/* находим элементы выпадающего списка и проходимся по ним циклом */
document.querySelectorAll('.dropdown p').forEach( item => {
    
    /* навешиваем событие клик */
    item.addEventListener('click', () => {

        /* находим у элемента родительский тег label, далее у label находим дочерний элемент input и присваеваем ему значение - текст элемента*/
        item.closest('label').querySelector('input').value = item.textContent;
    });
})

/* находим input, в котором есть выпадающий список и навешиваем на него событие клик */
document.querySelector('.dropdown-input').addEventListener('click', () => {
    /* находим выпадающий список и задаем ему переключение класса (если active нет - добавляем и наоборот)*/
    document.querySelector('.dropdown').classList.toggle('active');
});
// ниже скрипт для автоматического расширения текстового поля при вводе в форму вопроса в нижнем блоке с классом contact-us__textarea. Форма для ввода в макете очень узкая. Дизайн крайне спорный... Вводить вопрос (тем более большой длинный текст) не удобно. Поэтому применил вот такое решение. Визуально в макете форма будет увеличиваться до определённого диапазона, но вёрстка не рассыпается. Контент отображаемый ниже формы не смещается. На мой вкус так лучше. При заполнении и нажатии кнопки отправить, форма принимает свой прежний вид, сворачивается обратно и контент, который временно перекрывается формой опять виден.

var textarea = document.querySelector('textarea');

textarea.addEventListener('keyup', function () {
    if (this.scrollTop > 0) {
        this.style.height = this.scrollHeight + "px";
    }
});


// крайне удобная маска ввода номера телефона. Можно вводить хоть с 7, хоть с 8... Автоформатирование. Код изначально не мой. Алексея Голобурдина. Ссылка на гитхаб - https://github.com/alexey-goloburdin/phoneinput/blob/main/phoneinput.js Видос разбора - https://youtu.be/Lxj_v5z0xRE
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

// СЛАЙДЕР
const cityList = document.getElementById('city-list');

const cityName = document.getElementById('city-name');
const areaValue = document.getElementById('area-value');
const repairTimeValue = document.getElementById('repair-time-value');
const costValue = document.getElementById('cost-value');

const backButton = document.getElementById('back');
const backButtonMobile = document.getElementById('back-mobile');

const forwardButton = document.getElementById('forward');
const forwardButtonMobile = document.getElementById('forward-mobile');

const pointList = document.getElementById('point-list');

const slideImgDesktop = document.getElementById('slide-img-desktop');
const slideImgMobile = document.getElementById('slide-img-mobile');

// формирование массива из трёх слайдов с описаниями в dl.
const info = [{
        cityName: 'Rostov-on-Don LCD admiral',
        areaValue: '81 m2',
        repairTimeValue: '3.5 months',
        costValue: 'Upon request',
        slideImgDesktop: './img/slide1.jpg',
        slideImgMobile: './img/slide1-m.jpg'
    },
    {
        cityName: 'Sochi Thieves',
        areaValue: '105 m2',
        repairTimeValue: '4 months',
        costValue: 'Upon request',
        slideImgDesktop: './img/slide2.jpg',
        slideImgMobile: './img/slide2-m.jpg'
    },
    {
        cityName: 'Rostov-on-Don Patriotic',
        areaValue: '93 m2',
        repairTimeValue: '3 months',
        costValue: 'Upon request',
        slideImgDesktop: './img/slide3.jpg',
        slideImgMobile: './img/slide3-m.jpg'
    }
];

// переменные навигации вперёд/назад
let currentIndex = 0;
let prevIndex = 0;

// функция устанавливающая слайд и заменяющая информацию в dl.
const setSlide = function (index, prevIndex) {
    cityName.innerText = info[index].cityName;
    areaValue.innerText = info[index].areaValue;
    repairTimeValue.innerText = info[index].repairTimeValue;
    costValue.innerText = info[index].costValue;
    slideImgDesktop.src = info[index].slideImgDesktop;
    slideImgMobile.srcset = info[index].slideImgMobile;

    cityList.children[index].children[0].classList.add('completed-projects__button-top-nav--active');

    cityList.children[prevIndex].children[0].classList.remove('completed-projects__button-top-nav--active');

    // смена картинки точки
    pointList.children[index].children[0].src = './img/icon/icon_point_active.svg'
    pointList.children[prevIndex].children[0].src = './img/icon/icon_point_no-active.svg'
};

// функция с условием (чтобы был реверс) при клике вперёд
const onForwardButtonClick = function () {
    prevIndex = currentIndex;
    currentIndex++;
    
    if (currentIndex > 2) {
        currentIndex = 0;
    }
    
    setSlide(currentIndex, prevIndex);
}

// функция с условием (чтобы был реверс) при клике назад
const onBackButtonClick = function () {
    prevIndex = currentIndex;
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = 2;
    }

    setSlide(currentIndex, prevIndex);
}

// cтрелки десктоповые и мобилки
forwardButton.addEventListener('click', onForwardButtonClick);
forwardButtonMobile.addEventListener('click', onForwardButtonClick);

backButton.addEventListener('click', onBackButtonClick);
backButtonMobile.addEventListener('click', onBackButtonClick);

// функция по событию, хэндлер (когда происходит событие (клик) вызывается эта функция).
const onSliderClick = function (evt, list) {
    prevIndex = currentIndex;
    let index = currentIndex;

    for (let i = 0; i < list.children.length; i++) {
        const element = list.children[i].children[0];

        if (element === evt.target) {
            index = i;
        }
    };

    if (index === currentIndex) {
        return;
    }

    currentIndex = index;
    setSlide(index, prevIndex);
}

// навигация верхнего списка
cityList.addEventListener('click', function (evt) {
    onSliderClick(evt, cityList);
});

// точки
pointList.addEventListener('click', function (evt) {
    onSliderClick(evt, pointList);
});
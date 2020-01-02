import Drinks from '../../../model/drinks.js';

import Component from '../../component.js';

class Calc extends Component {
    constructor() {
        super();
        this.model = new Drinks();
        this.weight = JSON.parse(localStorage.getItem('weight'));
        this.sex = JSON.parse(localStorage.getItem('sex'));
    }

    getData() {
        return new Promise(resolve => this.model.getDrinksList().then(drinks => resolve(drinks)));
    }

    render(drinks) {
        return new Promise(resolve => {
            resolve(`
            <menu class="menu-page">
                <li class="${location.hash == '#/calc' ? 'active' : ''}"><a href="#/calc"">Калькулятор</a></li>
                <li><a href="#/lifehacks">Полезные советы</a></li>
                <li><a href="#/info">Статистика</a></li>
            </menu>
            <div class="cacl-page">
                <div class ="calc-header">
                    <ul class="progressbar">
                        <li class="active">Ввод данных</li>
                        <li class="active">Результат</li>
                    </ul>
                </div>
                <div class="calc-content">
                    <div class = "calc-sex">Пол
                        <input id="man" type="radio" name="sex" value ="0.7" ${this.sex == 'man' || this.sex == null ? 'checked' : ''}>
                        <label for="man">Мужской</label>
                        <input id="woman"type="radio" name="sex" value ="0.6" ${this.sex == 'woman' ? 'checked' : ''}>
                        <label for="woman">Женский</label>
                    </div>
                    <div class="calc-weight">
                        <label for="weight">Вес, кг</label>
                        <input type="text" id="weight" class="blackWeight" maxlength="3" value="${this.weight}">
                    </div>
                    
                    <div class="calc-drinks">
                        <p>Напитки</p>
                        <ul class="cacl-alcohol__list">
                            ${drinks.map(drink => this.getDrinkHTML(drink)).join('\n ')}     
                        </ul>
                        <button class="calc-drink__add-btn">Добавить напиток</button>
                    </div>
                    
                    <div class="calc-stomach">  
                        <label for="stomach">Наполненость желудка</label>
                        <div class="select">
                            <select id="stomach" class="blackStomach"> 
                                <option value="0.1">На пустой желудок</option>
                                <option value="0.2">Средняя сытость</option>
                                <option value="0.3">Полный желудок</option>
                            </select>
                        </div>
                    </div>
                            
                    <div class="calc-speed">
                        <label for="speed-drink">Скорость употребления</label>
                        <div class="select">
                            <select id="speed-drink" class="blackSpeedDrink"> 
                                <option value="0">За раз</option>
                                <option value="1">В течении 1 часа</option>
                                <option value="2">В течении 2 часов</option>
                                <option value="3">В течении 3 часов</option>
                                <option value="4">В течении 4 часов</option>
                                <option value="5">В течении 5 часов</option>
                                <option value="6">В течении 6 часов</option>
                                <option value="7">В течении 7 часов</option>
                                <option value="8">В течении 8 часов</option>
                                <option value="9">В течении 9 часов</option>
                                <option value="10">В течении 10 часов</option>
                            </select>
                        </div>
                    </div>
                            
                    <div class="calc-time">
                        <label for="time-drink">Прошло часов</label>
                        <div class="select">
                            <select id="time-drink" class="blackTimeDrink"> 
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                           
                    <button id="calculate" class="activeCalc disabledCalc" disabled>Рассчитать</button>
                <div>
            </div>
            `);
        });
    }

    afterRender() {
        this.mainFunction();
    }

    mainFunction() {
        const calcContent = document.getElementsByClassName('calc-content')[0],
            drinkList = document.querySelector('.cacl-alcohol__list'),
            calculateBtn = document.getElementById('calculate'),
            sexBlock = document.getElementsByClassName('calc-sex')[0];
            
        let target = '';

        this.validationInputs(calcContent, calculateBtn);

        calcContent.addEventListener('click', event => {
            const target = event.target;
              
                  
            switch(true) {
                case (target.id === 'calculate'): 
                    this.calculate();
                    break;

                case (target.id === 'drinks'): 
                    this.getDrink(target).then(drink => {
                        this.drink = drink;
                        this.drink.value = target.value;
                        this.model.editDrink(this.drink);
                    });
                    break;

                case target.classList.contains('calc-drink__add-btn'):
                    this.addDrink(drinkList, calculateBtn, calcContent);
                    calculateBtn.disabled = true;
                    calculateBtn.classList.add('disabledCalc');
                    break;

                case target.classList.contains('calc-drink__remove-btn'):
                    const drinkID = target.parentNode.dataset.id,
                    drinkItem = target.parentNode;
                    this.removeDrink(drinkItem, drinkID, calculateBtn, target);
                    break;
            }
        });   

        sexBlock.addEventListener('click', event => {
            const target = event.target;

            switch(true) {
                case target.id === 'man':
                    localStorage.setItem('sex', JSON.stringify('man'));
                    break;
                
                case target.id === 'woman':
                    localStorage.setItem('sex', JSON.stringify('woman'));
                    break;
            }
        });

        calculateBtn.disabled = this.checkValues(target);
        !calculateBtn.disabled ? calculateBtn.classList.remove('disabledCalc') : calculateBtn.classList.add('disabledCalc');
    }

    removeDrink(drinkItem, drinkID, calculateBtn, target) {
        this.model.removeDrink(drinkID).then(() => {
            drinkItem.remove();
            calculateBtn.disabled = this.checkValues(target);
            !calculateBtn.disabled ? calculateBtn.classList.remove('disabledCalc') : calculateBtn.classList.add('disabledCalc');
        });
    }

    calculate() {
        const weightInput = document.getElementById('weight');

        if (weightInput.value < 30 || weightInput.value > 160) {
            weightInput.parentNode.insertAdjacentHTML('afterEnd', '<p class="errorWeight">Введите число от 30 до 160</p>');
            const errorValue = document.getElementsByClassName('errorWeight')[0];
            setTimeout(() => errorValue.remove(), 1200);
            return;
        }

        let deadline = this.getDeadline();
        localStorage.setItem('date', JSON.stringify(deadline));
        location.href = "#/result";
    }

    addDrink(drinkList, calculateBtn, calcContent) {
        const newDrink = {
            alcohol: '',
            dose: '',
            value: '0'
        };

        this.model.addDrink(newDrink).then(drink => {
            drinkList.insertAdjacentHTML('beforeEnd', this.getDrinkHTML(drink));
        });
        this.validationInputs(calcContent, calculateBtn);
    }

    validationInputs(calcContent, calculateBtn) {
        calcContent.addEventListener('keyup', event => {
            const target = event.target;

            if (target.type == 'text') {
                calculateBtn.disabled = this.checkValues(target);
                !calculateBtn.disabled ? calculateBtn.classList.remove('disabledCalc') : calculateBtn.classList.add('disabledCalc');
            }
        });
    }

    checkValues(target) {
        const inputsText = document.querySelectorAll('input[type=text]'),
            arrInputs = [];

        switch(true) {
            case (target.id === 'alcohol'): 
                this.getDrink(target).then(drink => {
                    this.drink = drink;
                    this.drink.alcohol = target.value;
                    this.model.editDrink(this.drink);
                });
                break;

            case (target.id === 'dose'): 
                this.getDrink(target).then(drink => {
                    this.drink = drink;
                    this.drink.dose = target.value;
                    this.model.editDrink(this.drink);
                });
                break;

            case (target.id === 'weight'):
                localStorage.setItem('weight', JSON.stringify(target.value));
                break;
        }

        inputsText.forEach(item => arrInputs.push(item));

        let result = arrInputs.every(item => {
            return item.value.trim() !== '' && (/^\d+$/.test(+item.value));
        });

        return !result;
    }


    getDrink(focusedInput) {
        return new Promise(resolve =>
            this.model.getDrink(focusedInput.closest("li[data-id]").dataset.id).then(drink => {
                this.drink = drink;
                resolve(drink);
            })
        );
    }

//Функция получения данных из инпутов
    getValue() {
        const sexCheckobx = document.getElementsByName('sex'),
            weightInput = document.getElementById('weight'),
            stomachSelect = document.getElementById('stomach'),
            speedDrinkSelect = document.getElementById('speed-drink'),
            timeDrinkSelect = document.getElementById('time-drink'),
            drinkItems = document.getElementsByClassName('cacl-alcohol__item'),
            densityOfAlcohol = 0.7893; //Плотность алкоголя

        let weight = +weightInput.value,
            timeDrink = +timeDrinkSelect.value,
            speedDrink = +speedDrinkSelect.value,
            stomachstomachSelect = +stomachSelect.value,
            number = 0,
            sex,
            concentration;

        sex = (sexCheckobx[0].checked) ? 0.7 : 0.6;
        //Этим циклом получаем данные % и ml из всех напитков
        for (let value of drinkItems) {
            let drinkAmount = value.querySelector('#dose'),
                alcoholInput = value.querySelector('#alcohol');

            number += (+drinkAmount.value * (+alcoholInput.value / 100));
            (sex == 0.7) ? localStorage.setItem('sex', JSON.stringify('man')): localStorage.setItem('sex', JSON.stringify('woman'));
        }
        //Расчёт концентрации алкоголя в крови
        concentration = +(((number * densityOfAlcohol * (1 - stomachstomachSelect)) / (sex * weight)) - (0.15 * (timeDrink + speedDrink))).toFixed(3);
        concentration = (concentration > 0) ? concentration : '0.000';
        localStorage.setItem('concentration', JSON.stringify(concentration));

        return concentration;
    }

    getDeadline() { //получаем время окончания действия алкоголя;
        let concentration = this.getValue(),
            eliminationTime = (concentration / 0.15) * (1000 * 60 * 60),
            date = new Date();
        date.setMilliseconds(eliminationTime);
        return date;
    }

    getDrinkHTML(drink) {
        return `
            <li class="cacl-alcohol__item" data-id="${drink.id}">
                <div class="select">
                    <select id="drinks" class="blackDrinks"> 
                    <option value="0" ${(drink.value == 0) ? 'selected' : ''}>Безалкогольное пиво</option>,
                    <option value="1" ${(drink.value == 1) ? 'selected' : ''}>Хлебный квас</option>,
                    <option value="2" ${(drink.value == 2) ? 'selected' : ''}>Кумыс</option>,
                    <option value="3" ${(drink.value == 3) ? 'selected' : ''}>Пиво лёгкое/Сидр</option>,
                    <option value="4" ${(drink.value == 4) ? 'selected' : ''}>Пиво портер/темное</option>,
                    <option value="5" ${(drink.value == 5) ? 'selected' : ''}>Пиво крепкое</option>,
                    <option value="6" ${(drink.value == 6) ? 'selected' : ''}>Шампанское</option>,
                    <option value="7" ${(drink.value == 7) ? 'selected' : ''}>Вино</option>,
                    <option value="8" ${(drink.value == 8) ? 'selected' : ''}>Вермут</option>,
                    <option value="9" ${(drink.value == 9) ? 'selected' : ''}>Мягкие ликёры</option>,
                    <option value="10" ${(drink.value == 10) ? 'selected' : ''}>Портвейн</option>,
                    <option value="11" ${(drink.value == 11) ? 'selected' : ''}>Средние ликёры</option>,
                    <option value="12" ${(drink.value == 12) ? 'selected' : ''}>Крепкие ликёры</option>,
                    <option value="13" ${(drink.value == 13) ? 'selected' : ''}>Текила/Бренди</option>,
                    <option value="14" ${(drink.value == 14) ? 'selected' : ''}>Ром, Джин</option>,
                    <option value="15" ${(drink.value == 15) ? 'selected' : ''}>Водка</option>,
                    <option value="16" ${(drink.value == 16) ? 'selected' : ''}>Коньяк</option>,
                    <option value="17" ${(drink.value == 17) ? 'selected' : ''}>Виски</option>,
                    <option value="18" ${(drink.value == 18) ? 'selected' : ''}>Самбука</option>,
                    <option value="19" ${(drink.value == 19) ? 'selected' : ''}>Абсент лёгкий</option>,
                    <option value="20" ${(drink.value == 20) ? 'selected' : ''}>Абсент средний</option>,
                    <option value="21" ${(drink.value == 21) ? 'selected' : ''}>Настойка боярышника</option>,
                    <option value="22" ${(drink.value == 22) ? 'selected' : ''}>Абсент крепкий</option>,         
                    </select>
                </div>

                <div class="calc-value">
                    <div class="calc-alcohol">
                        <label>%<input type="text" id="alcohol" class="blackAlcohol" maxlength="2" value="${drink.alcohol}"></label>
                    </div>
                    <div class="calc-dose">
                        <label>мл<input type="text" id="dose" class="blackDose" maxlength="4" value="${drink.dose}"></label>
                    </div>
                </div>

                <button class="calc-drink__remove-btn">X</button>
            </li> 
            `;
    }
}

export default Calc;
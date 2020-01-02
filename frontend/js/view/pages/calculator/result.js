import Component from '../../component.js';

import Static from '../../../model/static.js';

class Result extends Component {
    constructor() {
        super();
        this.date = JSON.parse(localStorage.getItem('date'));
        this.concentration = JSON.parse(localStorage.getItem('concentration'));
        this.sex = JSON.parse(localStorage.getItem('sex'));
        this.dataOfPerson = new Static();
    }
    render() {
        return new Promise(resolve => {
            resolve(`
            <menu class="menu-page">
                <li class="${location.hash == '#/result' ? 'active' : ''}"><a href="#/calc">Калькулятор</a></li>
                <li><a href="#/lifehacks">Полезные советы</a></li>
                <li><a href="#/info">Статистика</a></li>
            </menu>
            <div class="cacl-page">
                <div class ="calc-header">
                    <ul class="progressbar">
                        <li>Ввод данных</li>
                        <li class="active">Результат</li>
                    </ul>
                </div>
                <div class="calc-content">
                    <div class="calc-result">
                        <p class="calc-result__title">В вашей крови: </p>
                        <p class="calc-result__ppm"> ${this.concentration ? `${this.concentration} &#8240;` : "Вы трезвы" } </p>
                        <p class="calc-result__title">Вы будете трезвы через: </p>
                        <div class="timer-numbers" id = "timer">
                            <span class="hours"></span>
                            <span>:</span>
                            <span class="minutes"></span>
                            <span>:</span>
                            <span class="seconds"></span>
                        </div>
                    <div class="result-info">
                        <div class="image-result">
                            <img src = "/">
                        </div>
                        <div class="condition-result">
                            <p class="titleBehavior">Поведение</p>
                            <ul class="resultBehavior"></ul>
                            <p class="titleViolations">Нарушения</p>
                            <ul class="resultViolations"></ul>
                        </div>
                    </div>
                </div>
            <div>
        </div>
            `);
        });
    }

    afterRender() {
        this.setClock('timer', this.date);
        this.behaviorSet();
        this.rezultImagesSet(this.sex);
    }

    setClock(id, endtime) { //id - таймер, в который вставляем числа
        const timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        let timeInterval = setInterval(() => {
            let a = this.timeRemaining(endtime);

            hours.textContent = this.addZero(a.hours);
            minutes.textContent = this.addZero(a.minutes);
            seconds.textContent = this.addZero(a.seconds);

            if (a.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }, 1000);
    }

    addZero(num) {
        if (num <= 9) {
            return '0' + num;
        } else return num;
    }

    timeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //Находим номер состояния
    getConditionInfo(concentration) {
        let statusValue = this.dataOfPerson.personBehavior.findIndex(item => item.min <= concentration && concentration <= item.max);
        return statusValue;
    }

    //Вставляем состояния в список
    behaviorSet() {
        const behaviorList = document.getElementsByClassName('resultBehavior')[0],
            violationsList = document.getElementsByClassName('resultViolations')[0];

        behaviorList.innerHTML = '';
        violationsList.innerHTML = '';

        let positionBehavior = this.getConditionInfo(this.concentration),
            currentBehavior = this.dataOfPerson.personBehavior[positionBehavior];

        currentBehavior.behavior.forEach(element => {
            return behaviorList.innerHTML += `<li class="alcotester__behavior-item">${element}</li>`;
        });

        currentBehavior.violations.forEach(element => {
            return violationsList.innerHTML += `<li class="alcotester__violations-item">${element}</li>`;
        });
    }

    rezultImagesSet(sex) {
        const resultImage = document.querySelector('img');
        let alcoStage = this.getConditionInfo(this.concentration),
            needSex = (sex === 'man') ? 'men' : 'women',
            numberImage = this.dataOfPerson.personImage[needSex][alcoStage];

        resultImage.src = `./image/condition/${numberImage}`;
    }
}

export default Result;
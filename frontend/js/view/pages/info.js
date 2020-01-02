import Component from '../component.js';

class Info extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <menu class="menu-page">
                <li><a href="#/calc">Калькулятор</a></li>
                <li><a href="#/lifehacks">Полезные советы</a></li>
                <li class="${location.hash == '#/info' ? 'active' : ''}"><a href="#/info">Статистика</a></li>
            </menu>
            <div class='info-page'>
                <div class="main-content">
                <h1 class="info-title">Алкогольные напитки, употребляемые в Беларуси<h1>
                    <div class="info-content">
                        <p class="info-content__text">Пиво</p>
                        <div class="progress-beer">
                            <div class="line"></div>
                            <div class="number">0%</div>
                        </div>
                    </div>
                        
                    <div class="info-content">
                        <p class="info-content__text">Водка</p>
                        <div class="progress-vodka">
                            <div class="line"></div>
                            <div class="number">0%</div>
                        </div>
                    </div>

                    <div class="info-content">
                        <p class="info-content__text">Вино</p>
                        <div class="progress-wine">
                            <div class="line"></div>
                            <div class="number">0%</div>
                        </div>
                    </div>

                    <div class="info-content">
                        <p class="info-content__text">Коньяк</p>
                        <div class="progress-cognac">
                            <div class="line"></div>
                            <div class="number">0%</div>
                        </div>
                    </div>

                    <div class="info-content">
                        <p class="info-content__text">Другое</p>
                        <div class="progress-other">
                            <div class="line"></div>
                            <div class="number">0%</div>
                        </div>
                    </div>
            
                </div>
            </div>
            `);
        });
    }

    afterRender() {
        this.hello();
    }

    hello() {
        const allLine = document.getElementsByClassName('line'),
            allNumber = document.getElementsByClassName('number');

        let counter = 0;
      
        this.drinkProgress(counter, allLine, allNumber, 38, 0, 20); 
        this.drinkProgress(counter, allLine, allNumber, 32, 1, 25); 
        this.drinkProgress(counter, allLine, allNumber, 31, 2, 25); 
        this.drinkProgress(counter, allLine, allNumber, 11, 3, 55); 
        this.drinkProgress(counter, allLine, allNumber, 10, 4, 60); 
    }

    drinkProgress(counter, allLine, allNumber, percent, index, time) {
        let currentValue = parseInt(allNumber[index].innerHTML);

        if (currentValue < percent) {
            allLine[index].style.width = `${counter}%`;
            allNumber[index].innerHTML = `${currentValue + 1}%`;
            counter += (100 / percent);
            setTimeout(() => {
                try {
                    this.drinkProgress(counter, allLine, allNumber, percent, index, time);
                }
                catch(ex) {
                    console.error('Всё нормально!Это не баг, а фича');
                }
            }, time);     
        }
    }
}

export default Info;
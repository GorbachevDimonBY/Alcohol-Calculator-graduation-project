import Component from '../component.js';

class Welcome extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <div class = "welcom-content">
                <div class="welcom"> 
                    <h1 class="welcome__title">Вас приветствует алкогольный калькулятор!</h1>                   

                    <p class="welcome__info">Этот электронный онлайн-инструмент служит для самостоятельного определения количества алкоголя, 
                    поступившего в кровь, основываясь на качестве и количестве принятых алкогольных напитков.
                    <p class="welcome__benefits">Он полезен в следующих случаях:</p>
                    <ul class="welcome__list">
                        <li>когда вы желаете рассчитать для себя максимально возможную алкогольную дозу;</li>
                        <li>когда после крепкого застолья вы должны сесть за руль;</li>
                        <li>когда вы желаете узнать, когда действие алкоголя станет безопасным, и вы сможете безбоязненно вести машину;</li>
                    </ul>
                    <a class="welcome__btn-start button" href="#/calc" title="Click here to get started!">Начать</a>
                </div>
            </div>
            `);
        });
    }
}

export default Welcome;
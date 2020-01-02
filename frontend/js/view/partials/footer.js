import Component from '../component.js';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`              
                    <p class="footer__info">
                            &copy; All Rights Reserved, 2019
                    </p>                  
            `);
        });
    }
}

export default Footer;
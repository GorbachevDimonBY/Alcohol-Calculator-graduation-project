import Utils from './helpers/utils.js';

import Footer from './view/partials/footer.js';

import Welcome from './view/pages/welcome.js';
import Error404 from './view/pages/error404.js';

import Calc from './view/pages/calculator/calc.js';
import Result from './view/pages/calculator/result.js';
import Lifehacks from './view/pages/lifehacks.js';
import Info from './view/pages/info.js';

const Routes = {
    '/': Welcome,
    '/calc': Calc,
    '/result': Result,
    '/lifehacks': Lifehacks,
    '/info': Info
};

function router() {
    const contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        welcome = new Welcome(),
        footer = new Footer();

    welcome.render().then(html => {
        contentContainer.innerHTML = html;
    });
    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`, 
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
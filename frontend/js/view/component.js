import Utils from '../helpers/utils.js';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL(); //записываем с файла Utils объект request в переменную этого файла
    }
    
    getData() {
    	return new Promise(resolve => resolve());
    }
    
    getWeight() {
        return new Promise(resolve => resolve());
    }

    afterRender() {}
}

export default Component;
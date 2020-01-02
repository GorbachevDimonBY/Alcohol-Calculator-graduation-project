class Drinks {
    getDrinksList() {
    	return new Promise(resolve => {
			const xhr = new XMLHttpRequest();
			
			xhr.open('GET', 'http://localhost:3100/api/drinks', true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
    }

    addDrink(newDrink) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3100/api/drink', true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));
		
			xhr.send(JSON.stringify(newDrink));
		});
	}

	getDrink(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3100/api/drink/${id}`, true);

			xhr.onload = () => resolve(JSON.parse(xhr.response));
			
			xhr.send();
		});
	}

	removeDrink(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('DELETE', `http://localhost:3100/api/drink/${id}`, true);

            xhr.onload = () => resolve();

            xhr.send();
        });
	}
	
	editDrink(updatedDrink) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:3100/api/drink/${updatedDrink.id}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send(JSON.stringify(updatedDrink));
		});
	}

	// editWeight(newWeight) {
	// 	return new Promise(resolve => {
	// 		const xhr = new XMLHttpRequest();

	// 		xhr.open('PUT', `http://localhost:3100/api/weight`, true);
	// 		xhr.setRequestHeader('Content-Type', 'application/json');

	// 		xhr.onload = () => resolve();

	// 		xhr.send(JSON.stringify(newWeight));
	// 	});
	// }

	// getWeightValue() {
    // 	return new Promise(resolve => {
	// 		const xhr = new XMLHttpRequest();
			
	// 		xhr.open('GET', 'http://localhost:3100/api/drinks', true);

	// 		xhr.onload = () => resolve(JSON.parse(xhr.response));

	// 		xhr.send();
	// 	});
    // }


}

export default Drinks;
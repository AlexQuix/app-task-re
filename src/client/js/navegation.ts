import App, { SendData } from './app';

class Navegation {
	static contNav: HTMLDivElement = document.querySelector('#container-nav');
	static btnSearch: HTMLButtonElement = Navegation.contNav.querySelector('nav > ul > #link-search > a > span');
	static input: HTMLInputElement = Navegation.contNav.querySelector('nav > ul > #link-search > a > input');
	constructor() {
		this.start();
	}
	private start() {
		Navegation.btnSearch.onclick = Navegation.handleClick;
	}
	private static async handleClick() {
		let nametask = Navegation.getValue();
		if (nametask) {
			App.removeNotResult();
			let uri = `/api/search?name_task=${nametask}`;
			let json = await Navegation.searchData(uri);
			App.evaluationForInsert(json);
		}
	}
	private static async searchData(uri: string) {
		let res = await fetch(uri);
		let json = await res.json();
		return json;
	}
	private static getValue() {
		return Navegation.input.value;
	}
	static Responsive(): void {
		let {input, btnSearch} = Navegation;
		btnSearch.onclick = () => {
			input.style.width = "150px";
			input.style.padding = "3px 35px 3px 5px";
			Navegation.handleClick();
		}

	}
}

export default Navegation;
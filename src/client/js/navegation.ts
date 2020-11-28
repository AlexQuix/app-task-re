import App, { SendData } from './app';

class Navegation {
	contNav: HTMLDivElement;
	btnSearch: HTMLButtonElement;
	input: HTMLInputElement;
	constructor() {
		this.contNav = document.querySelector('#container-nav');
		this.btnSearch = this.contNav.querySelector('nav > ul > #link-search > a > span');
		this.input = this.contNav.querySelector('nav > ul > #link-search > a > input');
		this.start();
	}
	private start() {
		this.btnSearch.onclick = this.handleClick.bind(this);
	}
	private async handleClick() {
		let nametask = this.getValue();
		if (nametask) {
			let uri = `/api/search?name_task=${nametask}`;
			let json = await this.searchData(uri);
			App.evaluationForInsert(json);
		}
	}
	private async searchData(uri: string) {
		let res = await fetch(uri);
		let json = await res.json();
		return json;
	}
	private getValue() {
		return this.input.value;
	}
	static Responsive(): void {
		let contInputSearch = document.querySelector<HTMLInputElement>("#container-nav > nav > ul > #link-search > a > input");
		let btnSearch = document.querySelector<HTMLSpanElement>("#container-nav > nav > ul > #link-search > a > span");
		btnSearch.onclick = () => {
			contInputSearch.style.width = "200px";
			contInputSearch.style.padding = "5px 20px";
			contInputSearch.style.paddingRight = "70px";
		}

	}
}

export default Navegation;
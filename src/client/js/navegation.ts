class Navegation{
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
import { BreakPoints } from "../utils";

export default class Search {
	public element: HTMLDivElement;
	public searchBtn: HTMLButtonElement;
	public searchInput: HTMLInputElement;

    /**
     * Triggers when the user click in the searchBtn element and pass the input value
     */
    public onSearch: (taskName:string)=>void;

	constructor() {
		this.element = document.querySelector('nav ul #search');
		this.searchBtn = this.element.querySelector('#btn-search');
		this.searchInput = this.element.querySelector('input.search');

		this.searchBtn.onclick = this.handleSearchClick.bind(this);
	}

	/**
	 * Returns the value of the search input
	 * @returns {string} The value of the search input
	 */
	public getSearchValue(): string {
		return this.searchInput.value;
	}

	private async handleSearchClick() {
        // Adds style if the current viewport have a mobile size
        if(matchMedia(BreakPoints.MOBILE)){
			this.searchInput.style.width = "100%";
			this.searchInput.style.padding = "3px 35px 3px 5px";
        }

		let taskName = this.searchInput.value;
        if(this.onSearch) this.onSearch(taskName);
	}
}
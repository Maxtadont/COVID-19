export class FullscreenIcon {
    constructor() {
        this.countryBtn = document.querySelector('[data-btn-country]');
        this.mapBtn = document.querySelector('[data-btn-map]');
        this.tableBtn = document.querySelector('[data-btn-table]');
        this.chartBtn = document.querySelector('[data-btn-chart]');
        this.countryWindow = document.querySelector('[data-country]');
        this.mapWindow = document.querySelector('[data-map]');
        this.wrap = document.querySelector('[data-wrap]');
        this.tableWindow = document.querySelector('[data-table]');
        this.chartWindow = document.querySelector('[data-chart]');
    }
    addFullscreenIcon() {
        this.countryWindow.addEventListener('mouseenter', () => {
            this.countryBtn.classList.toggle('visible');
        });
        this.countryWindow.addEventListener('mouseleave', () => {
            this.countryBtn.classList.toggle('visible');
        });

        this.mapWindow.addEventListener('mouseenter', () => {
            this.mapBtn.classList.toggle('visible');
        });
        this.mapWindow.addEventListener('mouseleave', () => {
            this.mapBtn.classList.toggle('visible');
        });

        this.tableWindow.addEventListener('mouseenter', () => {
            this.tableBtn.classList.toggle('visible');
        });
        this.tableWindow.addEventListener('mouseleave', () => {
            this.tableBtn.classList.toggle('visible');
        });

        this.chartWindow.addEventListener('mouseenter', () => {
            this.chartBtn.classList.toggle('visible');
        });
        this.chartWindow.addEventListener('mouseleave', () => {
            this.chartBtn.classList.toggle('visible');
        });
        return this;
    }
    makeWindowFullscreen() {
        this.countryBtn.addEventListener('click', () => {
            this.countryWindow.classList.toggle('fullscreen');
            this.wrap.classList.toggle('hide');
            this.mapWindow.classList.toggle('hide');
        });
        this.mapBtn.addEventListener('click', () => {
            this.mapWindow.classList.toggle('fullscreen');
            this.wrap.classList.toggle('hide');
            this.countryWindow.classList.toggle('hide');
        });
        this.tableBtn.addEventListener('click', () => {
            this.wrap.classList.toggle('fullscreen');
            this.tableWindow.classList.toggle('fullscreen');
            this.mapWindow.classList.toggle('hide');
            this.countryWindow.classList.toggle('hide');
            this.chartWindow.classList.toggle('hide');
        });
        this.chartBtn.addEventListener('click', () => {
            this.wrap.classList.toggle('fullscreen');
            this.chartWindow.classList.toggle('fullscreen');
            this.mapWindow.classList.toggle('hide');
            this.countryWindow.classList.toggle('hide');
            this.tableWindow.classList.toggle('hide');
        });
    }
}

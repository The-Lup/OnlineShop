export default class Tabs {
  constructor(idElement) {
    this.tabs = document.getElementById(idElement);
    this.nav = this.tabs.querySelector('.tabs');

    this.nav.addEventListener('click', (e) => {
      //Checking if the element that receives the click has the class 'tabs__link'.
      if ([...e.target.classList].includes('tabs__button')) {
        // Log to the console the tab that received the click.
        const tab = e.target.dataset.tab;

        // Remove the active class from the tabs and button that had it previously
        if (this.tabs.querySelector('.tab--active')) {
          this.tabs
            .querySelector('.tab--active')
            .classList.remove('tab--active');
        }

        if (this.tabs.querySelector('.tabs__button--active')) {
          this.tabs
            .querySelector('.tabs__button--active')
            .classList.remove('tabs__button--active');
        }

        //Adding active class to the tab
        this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

        //Adding active class to the button.
        e.target.classList.add('tabs__button--active');
      }
    });
  }
}

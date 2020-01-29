import AbstractComponent from './abstract-component.js';

const createLoadingComponent = () => {
  return `<section class="films-list--extra">
      <div class="films-list__container">
        Loading...
      </div>
    </section>`;
};
export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingComponent();
  }
}

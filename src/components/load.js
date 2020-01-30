import AbstractComponent from './abstract-component.js';

const createLoadingComponent = () => {
  return `<section>
      <div>
        Loading...
      </div>
    </section>`;
};
export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingComponent();
  }
}

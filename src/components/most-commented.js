
export const createMostCommentedComponent = (films) => {
  return `
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    ${films}
    </div>
  </section>`;
};

export const templateReviews = `
  <ul class="left-reviews">
    <li class="left-review">
      <div class="left-review__title">
        <span class="left-review__author"> {{name}}</span>
        <span class="left-review__place"> {{place}}</span>
        <span class="left-review__date"> {{date}}</span>
      </div>
      <div class="left-review__text"> {{review}}</div>
    </li>
  </ul>`;

export const templateForm = `
  <form class="review" id="review">
    <div class="review__heading">Отзыв:</div>
    <div class="review__inputs">
      <input class="review__input input--name" name="name" type="text" placeholder="Укажите ваше имя">
      <input class="review__input input--place" name="place" type="text" placeholder="Укажите место">
      <input class="review__input input--review" name="review" type="textarea" placeholder="Оставить отзыв">
    </div>
    <button class="review__btn" type="submit">Добавить</button>
  </form>`;

export const templateClusterLayout =
  '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>';

export function fillTemplate(template, array) {
  let html = '';

  array.forEach((obj) => {
    let buf = template;
    const matches = buf.matchAll('{{[^s}]*}}');

    for (const match of matches) {
      const key = match[0].substring(2, match[0].length - 2);
      buf = buf.replace(match[0], obj[key] ? obj[key] : '');
    }

    html += buf;
  });

  return html;
}

import ReviewStorage from './reviewStorage.js';

export function getFormInput(form) {
  const input = {
    name: form.elements.name,
    place: form.elements.place,
    review: form.elements.review,
  };

  if (validateForm(input)) {
    inputCheck();
    return input;
  }
}

export function saveData(coords, reviewData) {
  const review = reviewData;

  Object.keys(review).forEach((key) => {
    review[key] = review[key].value;
  });

  review['date'] = new Date().toISOString().substring(0, 10);
  new ReviewStorage().addReview(coords, review);
}

export function inputCheck() {
  document.addEventListener('keydown', function (e) {
    if (e.target === document.querySelector('.input--name')) {
      let isDigit = false;

      if (e.key >= 0 || e.key <= 9) {
        isDigit = true;
      }

      if (isDigit === true) {
        e.preventDefault();
      }
    }
  });
}

export function validateForm(input) {
  let isValid = true;

  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      const element = input[key];

      const valid = validateField(element);
      if (!valid) {
        isValid = false;
      }
    }
  }

  function validateField(field) {
    if (!field.value.trim().length) {
      field.classList.add('review__input--error');
      return false;
    } else {
      field.classList.remove('review__input--error');
      return true;
    }
  }
  return isValid;
}

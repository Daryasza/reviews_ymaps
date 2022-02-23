import ReviewStorage from './reviewStorage.js';
import {templateReviews, templateForm, fillTemplate} from './template.js';

const ymaps = window.ymaps;

export function setExistingPlacemarks(cluster, handler) {
  const reviewMap = new ReviewStorage().getReviews();
  
  Object.keys(reviewMap).forEach((key) => {
    const placemark = createPlacemark(key.split(','), cluster, handler);
    updatePlacemarkContent(placemark);
  });
}

export function updatePlacemarkContent(placemark) {
  if (!placemark) return;

  const reviews = new ReviewStorage().getReviews(placemark.geometry.getCoordinates());

  if (reviews.length === 0) return;

  const reviewsHTML = fillTemplate(templateReviews, reviews);

  placemark.properties.set({
    balloonContentBody: reviewsHTML,
    balloonContentFooter: templateForm,
    iconContent: reviews.length > 1 ? reviews.length : '',
  });

  placemark.options.set({
    preset: reviews.length > 1 ? 'islands#blueCircleIcon' : '',
  });
}

export function createPlacemark(coords, cluster, handler) {
  const placemark = new ymaps.Placemark(coords);

  placemark.events.add('balloonopen', () => {
    handler(coords);
  });

  cluster.add(placemark);

  return placemark;
}

export function findPlacemark(coords, cluster) {
  for (const item of cluster.getGeoObjects()) {
    if (item.geometry.getType() === 'Point' && item.geometry.getCoordinates() === coords)
      return item;
  }
}

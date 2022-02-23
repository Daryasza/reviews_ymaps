import './css/main.css';

import {getFormInput, saveData} from './js/util.js';
import {setExistingPlacemarks, updatePlacemarkContent, createPlacemark, findPlacemark} from './js/placemark.js';
import {templateForm, templateClusterLayout} from './js/template.js';

const ymaps = window.ymaps;

let map;
let cluster;

function init() {
  map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    behaviors: ['dblclickzoom', 'drag'],
    zoom: 11,
  });
  map.events.add('balloonopen', (e) => {
    balloonOpenHandler(e.originalEvent.currentTarget.balloon._balloon._position);
  });
  map.events.add('click', (e) => {
    const coords = e.get('coords');
    map.balloon.open(coords, {
      content: templateForm,
    });
  });

  const clusterLayout = ymaps.templateLayoutFactory.createClass(
    templateClusterLayout
  );
  cluster = new ymaps.Clusterer({
    gridSize: 100,
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: clusterLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 130,
    clusterBalloonPagerSize: 3,
  });
  map.geoObjects.add(cluster);
  setExistingPlacemarks(cluster, balloonOpenHandler);
}

function balloonOpenHandler(coords) {
  const form = document.querySelector('.review');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reviewData = getFormInput(form);
    if (!reviewData) return;

    saveData(coords, reviewData);

    let placemark = findPlacemark(coords, cluster);
    if (!placemark) {
      placemark = createPlacemark(coords, cluster, balloonOpenHandler);
    }
    updatePlacemarkContent(placemark);
    map.balloon.close();
  });
}

ymaps.ready(init);

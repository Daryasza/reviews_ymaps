export default class ReviewStorage {
  constructor() {
    this.itemName = 'reviewStore';

    this.data = JSON.parse(window.localStorage.getItem(this.itemName));

    if (!this.data) {
      this.data = {};
    }
  }

  setData() {
    // console.log("DEBUG")
    window.localStorage.setItem(this.itemName, JSON.stringify(this.data));
  }

  addReview(coords, review) {
    const key = coords.toString();

    if (!this.data[key]) {
      this.data[key] = [];
    }
    this.data[key].push(review);
    this.setData();
  }

  getReviews(coords) {
    if (!coords) {
      return this.data;
    } else {
      const key = coords.toString();
      return this.data[key] ? this.data[key] : [];
    }
  }
}

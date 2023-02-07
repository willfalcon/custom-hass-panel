import { Dashboard } from './components/Dashboard.js';
import ReactPanelElement from './ReactPanelElement.js';

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

customElements.define(__BASE_PATH__.replace('/', ''), ReactPanelElement(Dashboard));

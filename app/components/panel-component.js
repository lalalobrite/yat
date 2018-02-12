import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  resources: computed(function() {
    const category = this.get('category');
    return Object.keys(this.get(`data.${category}`)).map((key) => this.get(`data.${category}.${key}`));
  })
});

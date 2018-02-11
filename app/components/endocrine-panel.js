import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['endocrine-panel', 'panel'],

  resources: computed(function() {
    return Object.keys(this.get('data.endocrine')).map((key) => this.get(`data.endocrine.${key}`));
  })
});

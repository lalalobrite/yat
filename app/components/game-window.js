import Component from '@ember/component';
import EmberObject, { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isNone, isPresent, typeOf } from '@ember/utils';

export default Component.extend({
  tagName: '',

  store: service(),

  _data: computed(function() {
    return EmberObject.create(this.get('game.gateData') || this.get('game.gameData', {}));
  }),

  data: computed(function() {
    return this.attachModels(this.get('schema'), '');
  }),

  attachModels(value, path, options = {}) {
    if (typeOf(value) === 'object') {
      let gameData;
      if (isPresent(path)) {
        gameData = this.get(`game.gameData.${path}`) || this.set(`game.gameData.${path}`, {
          amount: value.amount || 0,
          unlocked: value.unlocked || false
        });
      } else {
        gameData = this.get('_data');
      }

      return Object.keys(value).reduce((accumulator, key) => {
        if (key !== 'amount' && key !== 'unlocked') accumulator.set(key, this.attachModels(get(value, key), isPresent(path) ? `${path}.${key}` : key));

        return accumulator;
      }, isPresent(path) ? EmberObject.extend(options.isArrayItem ? value : {
        gameData,
        amount: alias('gameData.amount'),
        unlocked: alias('gameData.unlocked')
      }).create() : gameData);
    } else if (typeOf(value) === 'array') {
      return value.map((item) => this.attachModels(item, path, { isArrayItem: true }));
    } else {
      return value;
    }
  },

  schema: computed(function() {
    const data = this.get('_data');
    return {
      panels: [{
        panels: [{
          title: 'Endocrine System',
          path: 'endocrine'
        }, {
          title: 'Mood',
          path: 'mood'
        }, {
          title: 'Fertility',
          path: 'fertility'
        }]
      }, {
        panels: [{
          title: 'Reproductive Imperative',
          path: 'ri'
        }, {
          title: 'Nutrients',
          path: 'nutrients'
        }]
      }],
      endocrine: {
        estrogen: {
          name: 'estrogen (E)',
          shortName: 'E',
          unit: 'weight',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'estrogen factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.endocrine.estrogen.factories.amount', function() {
                return Math.pow(this.get('data.endocrine.estrogen.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.nutrients.fat')
          }]
        },
        humanGrowthHormone: {
          name: 'human growth hormone (HGH)',
          shortName: 'HGH',
          unit: 'weight',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'HGH factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.endocrine.humanGrowthHormone.factories.amount', function() {
                return Math.pow(this.get('data.endocrine.humanGrowthHormone.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.nutrients.fat')
          }]
        },
        progesterone: {
          name: 'progesterone (P)',
          shortName: 'P',
          unit: 'weight',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'progesterone factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.endocrine.progesterone.factories.amount', function() {
                return Math.pow(this.get('data.endocrine.progesterone.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.nutrients.fat')
          }]
        },
        testosterone: {
          name: 'testosterone (T)',
          shortName: 'T',
          unit: 'weight',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'testosterone factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.endocrine.testosterone.factories.amount', function() {
                return Math.pow(this.get('data.endocrine.testosterone.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.nutrients.fat')
          }]
        }
      },
      fertility: {
        eggs: {
          amount: 0
        },
        sperm: {
          name: 'sperm',
          unit: 'weight',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'sperm factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.fertility.sperm.factories.amount', function() {
                return Math.pow(this.get('data.fertility.sperm.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.endocrine.testosterone')
          }]
        }
      },
      mood: {
        arousal: {
          name: 'arousal',
          unlocked: true,
          amount: 0,
          factories: {
            name: 'arousal factory',
            unlocked: true,
            amount: 0,
            costs: [{
              data,
              amount: computed('data.mood.arousal.factories.amount', function() {
                return Math.pow(this.get('data.mood.arousal.factories.amount'), 2) + 1
              }),
              source: alias('data.nutrients.protein')
            }]
          },
          multiplier: {
            amount: 1
          },
          max: {
            amount: 100
          },
          costs: [{
            data,
            amount: 1,
            source: alias('data.endocrine.testosterone')
          }]
        },
        hunger: {
          calories: 40,
          fat: 25,
          minerals: 5,
          protein: 30
        }
      },
      nutrients: {
        calories: {
          name: 'calories',
          unit: 'energy',
          amount: 5
        },
        fat: {
          name: 'fat',
          unit: 'weight',
          amount: 5
        },
        minerals: {
          name: 'minerals',
          unit: 'weight',
          amount: 5
        },
        protein: {
          name: 'protein',
          unit: 'weight',
          amount: 5
        }
      },
      ri: {
        ri: 0,
        children: 0,
        childrenUncertain: false,
        nutrientImperative: 1
      },
      fat: {
        breastSize: {
          amount: -1,
          max: {
            amount: 15,
            max: {
              amount: 50
            }
          },
          min: {
            amount: -1,
            min: {
              amount: -1
            }
          }
        },
        buttFullness: {
          amount: 0,
          max: {
            amount: 15,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        faceFem: {
          amount: 0,
          max: {
            amount: 15,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        legFem: {
          amount: 0,
          max: {
            amount: 15,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        legFullness: {
          amount: 0,
          max: {
            amount: 15,
            max: {
              amount:40
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        waistWidth: {
          amount: 120,
          max: {
            amount: 150,
            max: {
              amount: 150
            }
          },
          min: {
            amount: 100,
            min: {
              amount: 70
            }
          }
        }
      },
      muscle: {
        lowerMuscle: {
          amount: 10,
          max: {
            amount: 20,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 10,
            min: {
              amount: 0
            }
          }
        },
        neckWidth: {
          amount: 50,
          max: {
            amount: 60,
            max: {
              amount: 75
            }
          },
          min: {
            amount: 45,
            min: {
              amount: 35
            }
          }
        },
        penisSize: {
          amount: 65,
          max: {
            amount: 100,
            max: {
              amount: 200
            }
          },
          min: {
            amount: 50,
            min: {
              amount: 14
            }
          }
        },
        testicleSize: {
          amount: 45,
          max: {
            amount: 60,
            max: {
              amount: 100
            }
          },
          min: {
            amount: 35,
            min: {
              amount: 26
            }
          }
        },
        upperMuscle: {
          amount: 15,
          max: {
            amount: 28,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 10,
            min: {
              amount: 0
            }
          }
        },
        vaginaSize: {
          amount: 0,
          max: {
            amount: 50,
            max: {
              amount: 100
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
      },
      skeletal: {
        armLength: {
          amount: 40,
          max: {
            amount: 45,
            max: {
              amount: 80
            }
          },
          min: {
            amount: 35,
            min: {
              amount: 30
            }
          }
        },
        armThickness: { // shoulder width
          amount: 65,
          max: {
            amount: 85,
            max: {
              amount: 95
            }
          },
          min: {
            amount: 55,
            min: {
              amount: 45
            }
          }
        },
        chinWidth: {
          amount: 50,
          max: {
            amount: 40,
            max: {
              amount: 110
            }
          },
          min: {
            amount: 60,
            min: {
              amount: 30
            }
          }
        },
        faceLength: {
          amount: 240,
          max: {
            amount: 260,
            max: {
              amount: 270
            }
          },
          min: {
            amount: 220,
            min: {
              amount: 180
            }
          }
        },
        faceWidth: {
          amount: 90,
          max: {
            amount: 100,
            max: {
              amount: 105
            }
          },
          min: {
            amount: 80,
            min: {
              amount: 75
            }
          }
        },
        height: { // overall
          amount: 170,
          max: {
            amount: 180,
            max: {
              amount: 190
            }
          },
          min: {
            amount: 150,
            min: {
              amount: 110
            }
          }
        },
        handSize: {
          amount: 150,
          max: {
            amount: 170,
            max: {
              amount: 200
            }
          },
          min: {
            amount: 130,
            min: {
              amount: 40
            }
          }
        },
        hipWidth: {
          amount: 110,
          max: {
            amount: 140,
            max: {
              amount: 200
            }
          },
          min: {
            amount: 100,
            min: {
              amount: 90
            }
          }
        },
        legLength: {
          amount: 95,
          max: {
            amount: 100,
            max: {
              amount: 115
            }
          },
          min: {
            amount: 90,
            min: {
              amount: 90
            }
          }
        },
        neckLength: {
          amount: 85,
          max: {
            amount: 95,
            max: {
              amount: 120
            }
          },
          min: {
            amount: 70,
            min: {
              amount: 0
            }
          }
        },
        shoulderWidth: {
          amount: 75,
          max: {
            amount: 90,
            max: {
              amount: 150
            }
          },
          min: {
            amount: 65,
            min: {
              amount: 40
            }
          }
        },
      },
      skin: {
        areolaSize: {
          amount: 15,
          max: {
            amount: 25,
            max: {
              amount: 50
            }
          },
          min: {
            amount: 10,
            min: {
              amount: 0
            }
          }
        },
        eyelashLength: {
          amount: 2,
          max: {
            amount: 5,
            max: {
              amount: 15
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        eyeSize: {
          amount: 15,
          max: {
            amount: 20,
            max: {
              amount: 40
            }
          },
          min: {
            amount: 10,
            min: {
              amount: 0
            }
          }
        },
        hairHue: {
          amount: 0,
          max: {
            amount: 360,
            max: {
              amount: 360
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        hairLength: {
          amount: 0,
          max: {
            amount: 30,
            max: {
              amount: 110
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        hairLightness: {
          amount: 0,
          max: {
            amount: 100,
            max: {
              amount: 100
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        hairSaturation: {
          amount: 0,
          max: {
            amount: 100,
            max: {
              amount: 100
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        hairStyle: {
          amount: 6,
          max: {
            amount: 6,
            max: {
              amount: 6
            }
          },
          min: {
            amount: 0,
            min: {
              amount: 0
            }
          }
        },
        lipSize: {
          amount: 15,
          max: {
            amount: 20,
            max: {
              amount: 30
            }
          },
          min: {
            amount: 10,
            min: {
              amount: 5
            }
          }
        },
        skin: {
          amount: 1,
          max: {
            amount: 27,
            max: {
              amount: 27
            }
          },
          min: {
            amount: -2,
            min: {
              amount: -2
            }
          }
        },

      }
    }
  }).volatile()
});

import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import costFactor from 'yat/utils/cost-factor';

export default function schema(data) {
  return {
    debugging: true,
    panels: [{
      panels: [{
        title: 'Skeletal System',
        path: 'skeletal'
      }, {
        title: 'Muscles',
        path: 'muscle'
      }, {
        title: 'Fat',
        path: 'fat'
      }, {
        title: 'Skin & Hair',
        path: 'skin'
      }]
    }, {
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
        amount: 0,
        factories: {
          name: 'estrogen factory',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.endocrine.estrogen.factories.amount', function() {
              return costFactor(this.get('data.endocrine.estrogen.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          }
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
              return costFactor(this.get('data.endocrine.humanGrowthHormone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          }
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
              return costFactor(this.get('data.endocrine.progesterone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          }
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
              return costFactor(this.get('data.endocrine.testosterone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          }
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
              return costFactor(this.get('data.fertility.sperm.factories.amount') + 1, 'micro1');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          }
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
        unit: 'percent',
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
        overall: {
          amount: 0
        },
        rate: {
          amount: 1,
          max: {
            amount: 100
          }
        },
        calories: {
          name: 'calories',
          unit: 'percent',
          amount: 40
        },
        fat: {
          name: 'calories',
          unit: 'percent',
          amount: 25
        },
        minerals: {
          name: 'calories',
          unit: 'percent',
          amount: 5
        },
        protein: {
          name: 'calories',
          unit: 'percent',
          amount: 30
        }
      }
    },
    nutrients: {
      eater: {
        component: 'special-nutrient-eater'
      },
      imperative: {
        amount: 1
      },
      nutrientRecovery: {
        amount: 0.1
      },
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
      ri: {
        name: 'ri',
        amount: 0
      },
      children: {
        name: 'children',
        amount: 0
      },
      childrenUncertain: false,
      nutrientImperative: 1
    },
    fat: {
      breastSize: {
        name: 'breasts',
        amount: -1,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'macro10');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'micro10');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return -costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'macro10') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor(101 - ((this.get('data.fat.breastSize.amount') + 2) * 2), 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'butt',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'macro15');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'micro15');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return -costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'macro15') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor(101 - ((this.get('data.fat.buttFullness.amount') + 1) * 2.5), 'micro15');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'face',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'macro5');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return -costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor(101 - ((this.get('data.fat.faceFem.amount') + 1) * 2.5), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'hips',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'macro15');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'micro15');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return -costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'macro15') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor(101 - ((this.get('data.fat.legFem.amount') + 1) * 2.5), 'micro15');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'thighs',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return -costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor(101 - ((this.get('data.fat.legFullness.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'waist',
        amount: 120,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.fat.waistWidth.amount', function() {
            return costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'macro20');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.waistWidth.amount', function() {
            return costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return -costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor(101 - ((this.get('data.fat.waistWidth.amount') - 69) * 1.25), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'legs',
        amount: 10,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return -costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'neck',
        amount: 50,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'macro10');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return -costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'macro10') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.neckWidth.amount') - 34) * 2.5), 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'penis',
        amount: 65,
        multiplier: {
          amount: 1.85
        },
        costs: [{
          data,
          amount: computed('data.muscle.penisSize.amount', function() {
            return costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'macro5');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.penisSize.amount', function() {
            return costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.penisSize.amount', function() {
            return -costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.penisSize.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.penisSize.amount') - 13) * 0.54), 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'testicles',
        amount: 45,
        multiplier: {
          amount: 0.74
        },
        costs: [{
          data,
          amount: computed('data.muscle.testicleSize.amount', function() {
            return costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'macro5');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.testicleSize.amount', function() {
            return costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.testicleSize.amount', function() {
            return -costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.testicleSize.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.testicleSize.amount') - 25) * 1.35), 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'upper body',
        amount: 15,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return -costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'vagina',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'macro5');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return -costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.vaginaSize.amount') + 1) * 1), 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
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
        name: 'arms',
        amount: 40,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'micro20');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return -costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.armLength.amount') - 29) * 2), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
      armThickness: {
        name: 'shoulders',
        amount: 65,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'macro15');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return -costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'macro15') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.armThickness.amount') - 44) * 2), 'micro15');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'chin',
        amount: 50,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'face length',
        amount: 240,
        multiplier: {
          amount: 0.9
        },
        costs: [{
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return -costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.faceLength.amount') - 179) * 1.11), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'face width',
        amount: 90,
        multiplier: {
          amount: 0.3
        },
        costs: [{
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
      height: {
        name: 'overall',
        amount: 170,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'macro25');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'micro15');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return -costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'macro25') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.height.amount') - 109) * 1.25), 'micro25');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'hands',
        amount: 150,
        multiplier: {
          amount: 1.6
        },
        costs: [{
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return -costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.handSize.amount') - 39) * 0.625), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'hips',
        amount: 110,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'macro15');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'macro15') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91), 'micro15');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'legs',
        amount: 95,
        multiplier: {
          amount: 0.25
        },
        costs: [{
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'micro20');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return -costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.legLength.amount') - 89) * 4), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'neck',
        amount: 85,
        multiplier: {
          amount: 1.21
        },
        costs: [{
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return -costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.neckLength.amount') + 1) * 0.83), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'chest',
        amount: 75,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'macro20') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
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
        name: 'nipples',
        amount: 15,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return -costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.areolaSize.amount') + 1) * 2), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'eye lashes',
        amount: 2,
        multiplier: {
          amount: 0.15
        },
        costs: [{
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return -costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor(101 - ((this.get('data.skin.eyelashLength.amount') + 1) * 6.67), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'eye size',
        amount: 15,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return -costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.eyeSize.amount') + 1) * 2.5), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'hair hue',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
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
        name: 'hair length',
        amount: 0,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor((this.get('data.skin.hairLength.amount') + 1) * 0.91, 'macro10');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor((this.get('data.skin.hairLength.amount') + 1) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor(101 - ((this.get('data.skin.hairLength.amount') + 1) * 0.91), 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'hair lightness',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
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
        name: 'hair saturation',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
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
        name: 'hair style',
        amount: 6,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.progesterone')
        }],
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
        name: 'lips',
        amount: 15,
        multiplier: {
          amount: 0.25
        },
        costs: [{
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'macro5');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return -costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'macro5') * this.get('data.nutrients.nutrientRecovery.amount');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.lipSize.amount') - 4) * 4), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
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
        name: 'skin color',
        amount: 1,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
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
  };
}

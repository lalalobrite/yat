import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import randomNumber from 'yat/utils/random-number';
import randomElement from 'yat/utils/random-element';

export default Component.extend({
  classNames: ['avatar-canvas'],

  didInsertElement() {
    this._super(...arguments);
    this.set('canvasGroup', da.getCanvasGroup(this.element.id, {
      width: this.element.clientHeight * 0.4,
      height: this.element.clientHeight,
    }));

    const orientation = 70;
    const orientationVariance = 25;
    const gender = randomNumber(orientation - orientationVariance, orientation + orientationVariance) < 50 ? 'femme' : 'masc';
    const attraction = this.get('attraction');
    const attractionKeys = Object.keys(attraction);
    const extremeLimit = randomNumber(1, attractionKeys.length / 4);
    const extremeParts = Array(extremeLimit).fill(null).reduce((parts) => {
      let part = randomElement(attractionKeys);
      while(parts.includes(part)) {
        part = randomElement(attractionKeys);
      }

      parts.push(part);

      return parts;
    }, []);
    let averageMasculinity = 0;
    const basedim = attractionKeys.reduce((basedim, key) => {
      let masculinity = randomNumber(orientation - orientationVariance, orientation + orientationVariance);
      masculinity = gender === 'femme' ? masculinity * 2 : (masculinity - 50) * 2;
      masculinity = Math.max(0, Math.min(100, masculinity));
      if (!extremeParts.includes(key) && (masculinity < 25 || masculinity > 75)) masculinity = masculinity < 50 ? masculinity + ((50 - masculinity) / 2) : 50 + ((masculinity - 50) / 2);
      else if (!extremeParts.includes(key)) masculinity = masculinity < 50 ? masculinity / 2 : masculinity;

      if (!attraction[key].isAndro) averageMasculinity += masculinity;

      if (attraction[key].isFemme) masculinity = 100 - masculinity;
      else if (attraction[key].isAndro) masculinity = randomNumber(0, 100);

      const min = attraction[key][gender].min;
      const max = attraction[key][gender].max;
      const delta = max - min;
      const ratio = 100 / delta;

      basedim[key] = attraction[key][gender].options ? randomElement(attraction[key][gender].options) : Math.round((masculinity / ratio) + min);

      return basedim;
    }, {});

    averageMasculinity = averageMasculinity / attractionKeys.reduce((count, key) => count += attraction[key].isAndro ? 0 : 1);

    this.set('daInstance', new da.Player({
      name: '',
      basedim,
      clothes: [],
      decorativeParts: [],
      faceParts: [],
      parts: [
        da.Part.create(da.Part.VaginaHuman),
        da.Part.create(da.Part.TesticlesHuman),
        da.Part.create(da.Part.PenisHuman)
      ],
      Mods: {
        browBotCurl: 6,
        eyeTilt: 5,
        eyeTopSize: 0,
        lipTopCurve: 30,
        lipTopSize: 10,
        lipBotSize: 0,
        lipWidth: -100,
        lipCupidsBow: -10,
        breastPerkiness: 7,
        eyeBotSize: 4,
        arousal: 0,
      },
    }));

    this.draw();
  },

  draw() {
    da.draw(this.get('canvasGroup'), this.get('daInstance'));
  },

  attraction: computed(function() {
    const data = this.get('data');

    return {
      areolaSize: {
        isFemme: true,
        femme: {
          min: 25,
          ideal: 50,
          max: 50
        },
        masc: {
          min: 15,
          ideal: 15,
          max: 25
        }
      },
      armLength: {
        isAndro: true,
        femme: {
          min: 42,
          ideal: 45,
          max: 47
        },
        masc: {
          min: 42,
          ideal: 45,
          max: 47
        }
      },
      armThickness: {
        femme: {
          min: 50,
          ideal: 50,
          max: 60
        },
        masc: {
          min: 45,
          ideal: 95,
          max: 95
        }
      },
      breastSize: {
        isFemme: true,
        femme: {
          min: 0,
          ideal: 50,
          max: 50
        },
        masc: {
          min: -5,
          ideal: -5,
          max: -4
        }
      },
      buttFullness: {
        isFemme: true,
        femme: {
          min: 10,
          ideal: 40,
          max: 40
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 5
        }
      },
      chinWidth: {
        femme: {
          min: 60,
          ideal: 70,
          max: 80
        },
        masc: {
          min: 40,
          ideal: 100,
          max: 100
        }
      },
      eyelashLength: {
        isFemme: true,
        femme: {
          min: 5,
          ideal: 15,
          max: 15
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 5
        }
      },
      eyeSize: {
        isFemme: true,
        femme: {
          min: 20,
          ideal: 30,
          max: 30
        },
        masc: {
          min: 15,
          ideal: 15,
          max: 20
        }
      },
      faceFem: {
        isFemme: true,
        femme: {
          min: 20,
          ideal: 40,
          max: 40
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 10
        }
      },
      faceLength: {
        femme: {
          min: 220,
          ideal: 220,
          max: 240
        },
        masc: {
          min: 225,
          ideal: 250,
          max: 250
        }
      },
      faceWidth: {
        femme: {
          min: 85,
          ideal: 85,
          max: 95
        },
        masc: {
          min: 90,
          ideal: 99,
          max: 99
        }
      },
      hairHue: {
        isAndro: true,
        femme: {
          min: 0,
          ideal: 0,
          max: 0
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 0
        }
      },
      hairLength: {
        isFemme: true,
        femme: {
          min: 0,
          ideal: 110,
          max: 110
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 40
        }
      },
      hairLightness: {
        isAndro: true,
        femme: {
          min: 0,
          ideal: 0,
          max: 0
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 0
        }
      },
      hairSaturation: {
        isAndro: true,
        femme: {
          min: 0,
          ideal: 0,
          max: 0
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 0
        }
      },
      hairStyle: {
        isAndro: true,
        femme: {
          options: [1, 2, 3, 5, 6]
        },
        masc: {
          options: [0, 2, 5]
        }
      },
      handSize: {
        femme: {
          min: 70,
          ideal: 70,
          max: 100
        },
        masc: {
          min:100 ,
          ideal: 150,
          max: 150
        }
      },
      height: {
        femme: {
          min: 145,
          ideal: 150,
          max: 170
        },
        masc: {
          min: 165,
          ideal: 190,
          max: 190
        }
      },
      hipWidth: {
        isFemme: true,
        femme: {
          min: 120,
          ideal: 150,
          max: 155
        },
        masc: {
          min: 139,
          ideal: 139,
          max: 140
        }
      },
      legFem: {
        isFemme: true,
        femme: {
          min: 10,
          ideal: 40,
          max: 40
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 15
        }
      },
      legFullness: {
        isFemme: true,
        femme: {
          min: 15,
          ideal: 40,
          max: 40
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 10
        }
      },
      legLength: {
        isAndro: true,
        femme: {
          min: 93,
          ideal: 95,
          max: 97
        },
        masc: {
          min: 93,
          ideal: 95,
          max: 97
        }
      },
      lipSize: {
        isFemme: true,
        femme: {
          min: 15,
          ideal: 25,
          max: 25
        },
        masc: {
          min: 5,
          ideal: 7,
          max: 13
        }
      },
      lowerMuscle: {
        femme: {
          min: 0,
          ideal: 0,
          max: 20
        },
        masc: {
          min: 5,
          ideal: 40,
          max: 40
        }
      },
      neckLength: {
        isAndro: true,
        femme: {
          min: 70,
          ideal: 75,
          max: 77
        },
        masc: {
          min: 73,
          ideal: 75,
          max: 77
        }
      },
      neckWidth: {
        femme: {
          min: 40,
          ideal: 40,
          max: 50
        },
        masc: {
          min: 45,
          ideal: 53,
          max: 53
        }
      },
      penisSize: {
        femme: {
          min: 0,
          ideal: 0,
          max: 0
        },
        masc: {
          min: 15,
          ideal: 130,
          max: 130
        }
      },
      shoulderWidth: {
        femme: {
          min: 65,
          ideal: 65,
          max: 80
        },
        masc: {
          min: 70,
          ideal: 100,
          max: 100
        }
      },
      skin: {
        isAndro: true,
        femme: {
          min: -2,
          max: 20
        },
        masc: {
          min: -2,
          max: 20
        }
      },
      testicleSize: {
        femme: {
          min: 0,
          ideal: 0,
          max: 0
        },
        masc: {
          min: 35,
          ideal: 80,
          max: 80
        }
      },
      upperMuscle: {
        femme: {
          min: 0,
          ideal: 0,
          max: 15
        },
        masc: {
          min: 5,
          ideal: 40,
          max: 40
        }
      },
      vaginaSize: {
        isFemme: true,
        femme: {
          min: 50,
          ideal: 100,
          max: 100
        },
        masc: {
          min: 0,
          ideal: 0,
          max: 0
        }
      },
      waistWidth: {
        femme: {
          min: 100,
          ideal: 100,
          max: 120
        },
        masc: {
          min: 105,
          ideal: 130,
          max: 140
        }
      }
    }
  })
});

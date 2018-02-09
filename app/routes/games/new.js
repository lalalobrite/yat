import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.transitionTo('games.game', this.store.createRecord('game', {
      date: Date.now(),
      gameData: this.get('defaultData')
    }).save());
  },

  defaultData: {
    player: {
      name : '',
      // occupation : "Pod Bay Opener",
      // // provide specific values here to override the default ones set
      // age : 26,
      // base physical dimensions
      basedim: {
        areolaSize: 15,
        armThickness: 55,
        armLength: 40,
        buttFullness: 0,
        breastSize: -1,
        chinWidth: 50,
        eyelashLength: 2,
        eyeSize: 15,
        faceFem: 0,
        faceLength: 240,
        faceWidth: 90,
        hairHue: 0,
        hairLength: 0,
        hairLightness: 0,
        hairSaturation: 0,
        hairStyle: 6,
        handSize: 150,
        height: 170,
        hipWidth: 110,
        legFem: 0,
        legFullness: 0,
        legLength: 95,
        lipSize: 10,
        lowerMuscle: 10,
        neckLength: 85,
        neckWidth: 50,
        penisSize: 65,
        shoulderWidth: 75,
        skin: 1,
        testicleSize: 50,
        upperMuscle: 20,
        vaginaSize: 0,
        waistWidth: 100,
      },

      // overriding body parts
      parts: [

         //  da.Part.create(da.Part.VaginaHuman),
         // da.Part.create(da.Part.TesticlesHuman),
         // da.Part.create(da.Part.PenisHuman),
      ],
      faceParts: [],
      decorativeParts: [
          //            da.Part.create(null, da.Part.PenisHeadHuman),
          // da.Part.create(null, da.Part.BeautyMark),
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
          breastPerkiness: 4,
          eyeBotSize: 4,
          arousal: 0,
      },

      // overriding clothing (default to simple red underwear)
      clothes: [
          // da.Clothes.create(da.Clothes.Bra, da.Materials.sheerFabric),
          // da.Clothes.create(da.Clothes.Panties, da.Materials.sheerFabric)
      ]
    }
  }
});

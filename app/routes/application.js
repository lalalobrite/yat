import Route from '@ember/routing/route';

export default Route.extend({
  init() {
    this._super(...arguments);

    da.load();
  },

  model() {
    return {
    name : "HAL 9000",
    occupation : "Pod Bay Opener",
    // provide specific values here to override the default ones set
    age : 26,
    // base physical dimensions
    basedim: {
        armThickness: 60,
        height: 165,
        breastSize: 10,
        hairLength: 60,
        skin: -1,
        upperMuscle: 5,
        waistWidth: 105,
        lipSize: 23,
        faceFem: 40,
        // can have arbitrary expressions in here
        hairLightness: 30 - 12,
        hairSaturation: 50 - 12,
        legFem: 22,
        lowerMuscle: 10,
        hipWidth: 130,
        penisSize: 50,
        legLength: 100,
        shoulderWidth: 70,
    },

    // overriding body parts
    parts: [
        da.Part.create(da.Part.VaginaHuman),
       da.Part.create(da.Part.TesticlesHuman),
       da.Part.create(da.Part.PenisHuman),
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
    ],

}
  }
});

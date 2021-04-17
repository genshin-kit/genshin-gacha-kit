const { GenshinGachaKit } = require('..')

const App = new GenshinGachaKit(require('./gachaPool')[0])

console.log(App.multiWish(90), App.getCounter(), App.getResult())

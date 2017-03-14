const Benchmark = require('benchmark')
const dateline = require('./')

const suite = new Benchmark.Suite('dateline')
const bbox = [-183, -19, -178, -15]

/**
 * bbox x 17,626,435 ops/sec ±0.87% (95 runs sampled)
 * center x 13,541,384 ops/sec ±0.78% (95 runs sampled)
 * longitude x 28,824,989 ops/sec ±0.74% (96 runs sampled)
 * latitude x 41,295,721 ops/sec ±0.85% (95 runs sampled)
 */

suite
  .add('bbox', () => { dateline.bbox(bbox) })
  .add('center', () => { dateline.center(bbox) })
  .add('longitude', () => { dateline.longitude(bbox[0]) })
  .add('latitude', () => { dateline.latitude(bbox[1]) })
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', () => { })
  .run()

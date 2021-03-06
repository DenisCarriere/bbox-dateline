const {test} = require('tap')
const fs = require('fs')
const path = require('path')
const load = require('load-json-file')
const write = require('write-json-file')
const {lineString} = require('@turf/helpers');
const dateline = require('./')

const directories = {
  in: path.join(__dirname, 'test', 'in') + path.sep,
  out: path.join(__dirname, 'test', 'out') + path.sep
}

const fixtures = fs.readdirSync(directories.in).map(filename => {
  return {
    filename,
    name: path.parse(filename).name,
    geojson: load.sync(directories.in + filename)
  }
})

test('dateline', t => {
  for (const {name, filename, geojson} of fixtures) {
    const bbox = dateline.bbox(geojson)
    geojson.bbox = bbox

    if (process.env.REGEN) write.sync(directories.out + filename, geojson)
    t.deepEqual(geojson, load.sync(directories.out + filename), name)
  }
  t.end()
})

test('center', t => {
  t.deepEqual(dateline.center([190, 100, 210, 120]), [-160, -70])
  t.deepEqual(dateline.center([190, 100]), [-170, -80])
  t.assert(dateline.center(lineString([[0, 0], [10, 10]])))

  t.throws(() => dateline.center([10]), /center requires at least 2 numbers/)
  t.throws(() => dateline.center(), /coord is required/)
  t.end()
})

test('bbox', t => {
  t.deepEqual(dateline.bbox([190, 100, -200, -120]), [-180, -90, 180, 90])
  t.deepEqual(dateline.bbox([-190, 100, 200, -120]), [-180, -90, 180, 90])
  t.deepEqual(dateline.bbox([-190, -100, 200, 120]), [-180, -90, 180, 90])
  t.deepEqual(dateline.bbox([-500, -90, 100, 90]), [-180, -90, 180, 90])
  t.deepEqual(dateline.bbox([100, -90, 500, 90]), [-180, -90, 180, 90])
  t.end()
})

test('latitude', t => {
  t.deepEqual(dateline.latitude(0), 0)
  t.deepEqual(dateline.latitude(-180), 0)
  t.deepEqual(dateline.latitude(80), 80)
  t.deepEqual(dateline.latitude(100), -80)
  t.deepEqual(dateline.latitude(-100), 80)
  t.deepEqual(dateline.latitude(-0), 0)
  t.end()
})

test('longitude', t => {
  t.deepEqual(dateline.longitude(0), 0)
  t.deepEqual(dateline.longitude(-0), 0)
  t.deepEqual(dateline.longitude(-360), 0)
  t.deepEqual(dateline.longitude(160), 160)
  t.deepEqual(dateline.longitude(190), -170)
  t.deepEqual(dateline.longitude(-190), 170)
  t.end()
})

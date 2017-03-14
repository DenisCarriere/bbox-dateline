const test = require('tape')
const fs = require('fs')
const path = require('path')
const load = require('load-json-file')
const write = require('write-json-file')
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
  t.end()
})

test('bbox', t => {
  t.deepEqual(dateline.bbox([190, 100, -200, -120]), [-170, -80, 160, 60])
  t.end()
})

test('latitude', t => {
  t.deepEqual(dateline.latitude(80), 80)
  t.deepEqual(dateline.latitude(100), -80)
  t.deepEqual(dateline.latitude(-100), 80)
  t.end()
})

test('longitude', t => {
  t.deepEqual(dateline.longitude(160), 160)
  t.deepEqual(dateline.longitude(190), -170)
  t.deepEqual(dateline.longitude(-190), 170)
  t.end()
})

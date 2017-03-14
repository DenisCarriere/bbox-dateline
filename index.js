var turfBBox = require('@turf/bbox')
var turfCenter = require('@turf/center')

/**
 * Modifies a BBox to fit within the bounds of the International Date Line.
 *
 * @param {BBox|FeatureCollection|Feature<any>} bbox BBox [west, south, east, north] or GeoJSON Feature
 * @returns {BBox} valid BBox extent
 * @example
 * dateline.bbox([190, 100, -200, -120])
 * //= [-170, -80, 160, 60]
 */
function bbox (bbox) {
  // input validation
  if (!bbox) throw new Error('bbox is required')
  if (!Array.isArray(bbox)) bbox = turfBBox(bbox)
  if (bbox.length !== 4) throw new Error('bbox must have 4 numbers')

  var west = longitude(bbox[0])
  var south = latitude(bbox[1])
  var east = longitude(bbox[2])
  var north = latitude(bbox[3])

  return [west, south, east, north]
}

/**
 * Modifies a Center to fit within the bounds of the International Date Line.
 *
 * @param {[number, number]|BBox|FeatureCollection|Feature<any>} center Center [lng, lat], BBox [west, south, east, south] or GeoJSON Feature
 * @returns {[number, number]} valid center coordinate
 * @example
 * dateline.center([190, 100])
 * //= [-170, -80]
 */
function center (center) {
  var coords
  if (!center) throw new Error('center is required')

  // Support BBox [west, south, east, north]
  if (Array.isArray(center)) {
    if (center.length === 4) {
      var bbox = center
      var west = bbox[0]
      var south = bbox[1]
      var east = bbox[2]
      var north = bbox[3]
      coords = [(west + east) / 2, (south + north) / 2]

    // Support Center [lng, lat]
    } else coords = [center[0], center[1]]

  // Support any GeoJSON
  } else coords = turfCenter(center).geometry.coordinates

  if (coords.length !== 2) throw new Error('center must have 2 numbers')
  var lng = longitude(coords[0])
  var lat = latitude(coords[1])

  return [lng, lat]
}

/**
 * Modifies a Latitude to fit within +/-90 degrees.
 *
 * @param {number} lat latitude to modify
 * @returns {number} modified latitude
 * @example
 * dateline.latitude(100)
 * //= -80
 */
function latitude (lat) {
  if (!lat) throw new Error('lat is required')

  // Latitudes cannot extends beyond +/-90 degrees
  if (lat > 90 || lat < -90) {
    lat = lat % 180
    if (lat > 90) lat = -180 + lat
    if (lat < -90) lat = 180 + lat
    if (lat === -0) lat = 0
  }
  return lat
}

/**
 * Modifies a Longitude to fit within +/-180 degrees.
 *
 * @param {number} lng longitude to modify
 * @returns {number} modified longitude
 * @example
 * dateline.longitude(190)
 * //= -170
 */
function longitude (lng) {
  if (!lng) throw new Error('lng is required')

  // lngitudes cannot extends beyond +/-90 degrees
  if (lng > 180 || lng < -180) {
    lng = lng % 360
    if (lng > 180) lng = -360 + lng
    if (lng < -180) lng = 360 + lng
    if (lng === -0) lng = 0
  }
  return lng
}

module.exports = {
  bbox: bbox,
  longitude: longitude,
  latitude: latitude,
  center: center
}

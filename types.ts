import {BBox, Feature, Features} from '../'
import * as dateline from '../'

const bbox: BBox = [-180, -90, 180, 90]
const feature: Feature = undefined
const features: Features = undefined

dateline.bbox(bbox)
dateline.bbox(feature)
dateline.center([bbox[0], bbox[1]])
dateline.center(bbox)
dateline.center(feature)
dateline.latitude(bbox[0])
dateline.longitude(bbox[1])

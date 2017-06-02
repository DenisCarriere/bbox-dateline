import {BBox} from './'
import {lineString} from '@turf/helpers'
import * as dateline from './'

const line = lineString([[0, 0], [1, 1]])
const bbox = [-180, -90, 180, 90]

dateline.bbox(bbox)
dateline.bbox(line)
dateline.center([bbox[0], bbox[1]])
dateline.center(bbox)
dateline.center(line)
dateline.latitude(bbox[0])
dateline.longitude(bbox[1])

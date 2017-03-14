/// <reference types="geojson" />

type Features = GeoJSON.FeatureCollection<any>
type Feature = GeoJSON.Feature<any>
type BBox = [number, number, number, number];
type Center = [number, number];

export function bbox(bbox: BBox | Feature | Features): BBox;
export function center(center: Center | BBox | Feature | Features): BBox;
export function latitude(lat: number): number;
export function longitude(lng: number): number;

/// <reference types="geojson" />

type Geoms = GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any> | GeoJSON.GeometryObject | GeoJSON.GeometryCollection;
type BBox = [number, number, number, number];
type Center = [number, number];

export function bbox(bbox: number[] | Geoms): BBox;
export function center(center: Center | number[] | Geoms): BBox;
export function latitude(lat: number): number;
export function longitude(lng: number): number;

# Change Log
All notable changes to the Imagemap module will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.4.4] - 2019-12-06
### Added
- Add DOI to README (Philip Chase)


## [1.4.3] - 2019-12-04
### Added
- Improve documentation. (Geoffroey-Allen Franklin)
- Add DO-Touch.NET images, maps, and description. (Geoffroey-Allen Franklin)
- Standardize DO-Touch.NET filenames. (Marly Gotti)

### Changed
- Use noauth but NOT api endpoint to load JS files (Kyle Chesney)


## [1.4.2] - 2019-06-27
### Added
- Add description and copyright information for the mbody and va_char imagemaps. (Marly Cormar)
- Include image info and standarize maps. (Marly Cormar)
- Add new imagemap va_chart and its info to the README.md (Marly Cormar)
- Add pirads to instrument example (Kyle Chesney)
- Add mbody image, update sample instrument, and modify config.json accordinglu. (Marly Cormar)
- Include 5_face_painmap on the sample instrument. (Marly Cormar)
- add description of new face painmap (Kyle Chesney)

## Changed
- Correct path to example instrument in the documentation.php and the README.md. (Marly Cormar)
- Rename rheumatoid_man_map.html file to rheumatoid_man.html. (Marly Cormar)
- Update 5_face_painmap image name on the README.md. (Marly Cormar)
- Rename 5_face_painscale.png to 5_face_painmap.png to maintain module aesthetic standards. (Marly Cormar)
- update README to show painmap from lewisa2, fix markdown formatting (Kyle Chesney)
- create developer notes to describe state of ImageMapster use (Kyle Chesney)
- Create 5_face_painmap.html (lewisa2)
- Fix function call by referencing the object on which it was defined. (Marly Cormar)


## [1.4.1] - 2019-06-06
### Changed
- Remove dangling map tag. (Marly Cormar)


## [1.4.0] - 2019-04-17
### Changed
- Aesthetic changes to the documentation. (Marly Cormar)
- Update text about Rheumatoid Man (Philip Chase)
- Update docs and config.json for Rheumatoid man and example instrument (Philip Chase)
- Update example instrument and remove duplication. (Marly Cormar)
- Include example for RHEUMATOID_MAN. (Marly Cormar)
- Document new imagemap RHEUMATOID_MAN. (Marly Cormar)
- Include rheumatoid_man in the config.json (BlaineVlan)
- Added Rheumatoid Man imagemap and rheumatoid_man_map.html (BlaineVlan)
- Add small formatting changes (Will Beasley)


## [1.3.1] - 2018-09-06
### Changed
- Adding attribution for PIRADS images to Dr. Fan (Andrew Martin)
- Update attribution for ITHS at request of Bas. (Andrew Martin)
- Make the description text smaller so as to be more compaitble with other modules when enabling/disabling EMs. (Andrew Martin)


## [1.3.0] - 2018-08-30
### Added
- Include new PIRADS, PAINMAP_MALE_NO_ALT, and PAINMAP_FEMALE_NO_ALT imagemaps (Andy Martin)


## [1.2.2] - 2018-08-30
### Changed
- Fixed issue #14 'Module does not work in 8.7.X (bootstrap 4 and jquery3)' (Marly Cormar)


## [1.2.1] - 2018-04-11
### Changed
- Reduce config.json description (Marly Cormar)
- minor updates to attributions (Andy Martin)


## [1.2.0] - 2018-02-05
### Added
- Add image maps from Bas de Veer (Andy Martin)
- Add an example data dictionary instrument to illustrate how it works (Andy Martin)
- Add documentation link (Andy Martin)

## Changed
- Fixed mapping issue between area map and data dictionary for painmap_male/female (Andy Martin)
- Fixed issue with mapping of female bodymap and example.zip (Andy Martin)
- Realign coordinates on female front mid-body with the proper labels (Philip Chase)
- Fixed bug for selecting checkbox/radio options by label (Andy Martin)


## [1.1.0] - 2018-01-31
### Added
- Rename to 'imagemap' (Andy Martin)
- Add support for more image maps (Andy Martin)
- Make existing male, female, and smiley image maps default image maps (Andy Martin)

### Changed
- Set the minimum REDCap version required to 8.0.3 due to semantic versioning on this module (Philip Chase)
- conversion into single object for namespacing (Andy Martin)


## [1.0.0] - 2018-01-28
### Summary
 - Created a REDCap module from Andy Martin's Painmap REDCap hook.
 - The module presents one of three images as an imagemap to solicit feedback on pain from a REDCap survey participant.

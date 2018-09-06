# Change Log
All notable changes to the Imagemap module will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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

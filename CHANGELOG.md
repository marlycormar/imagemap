# Change Log
All notable changes to the Imagemap module will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


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

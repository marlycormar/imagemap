<?php
/**
 * @file
 * Provides ExternalModule class for Auto Populate Fields.
 */

namespace PainMap\ExternalModule;

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;


/**
 * ExternalModule class for Auto Populate Fields.
 */
class ExternalModule extends AbstractExternalModule {

    /**
     * @inheritdoc
     */
    function hook_every_page_top($project_id) {
        addImagemapActionTag($project_id);
    }
    
    
    /**
     * Adds @IMAGEMAP as an action tag.
     *
     * @param int $project_id
     *   An integer containing the current project id.
     */
    function addImagemapActionTag($project_id) {
        $js_files = array();

        if (PAGE == 'Design/online_designer.php' && $project_id) {
            $js_files[] = 'js/helper.js';
        }
        
        $this->loadJsFiles($js_files);
    }
    
    
    /**
     * Loads js files.
     *
     * @param array $js_files
     *   An array of js files paths within the module.
     */
    function loadJsFiles($js_files) {
        foreach ($js_files as $file) {
            echo '<script src="' . $this->getUrl($file) . '"></script>';
        }
    }
}

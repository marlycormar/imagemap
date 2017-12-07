<?php
/**
 * @file
 * Provides ExternalModule class for Pain Map.
 */

namespace PainMap\ExternalModule;

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;
use Form;

/**
 * ExternalModule class for Pain Map.
 */
class ExternalModule extends AbstractExternalModule {

    /**
     * @inheritdoc
     */
    function redcap_every_page_top($project_id) {
        if (PAGE == 'Design/online_designer.php' && $project_id) {
            $this->includeJs('js/helper.js');
        }

        if (!in_array(PAGE, array('DataEntry/index.php', 'surveys/index.php', 'Surveys/theme_view.php'))) {
            return;
        }

        if (empty($_GET['id'])) {
            return;
        }

        // Checking additional conditions for survey pages.
        if (PAGE == 'surveys/index.php' && !(isset($_GET['s']) && defined('NOAUTH'))) {
            return;
        }

        global $Proj;
        $settings = array();

        foreach (array_keys($Proj->forms[$_GET['page']]['fields']) as $field_name) {
            $field_info = $Proj->metadata[$field_name];
            

            if (!$display_mode = Form::getValueInActionTag($field_info['misc'], '@IMAGEMAP')) {
                continue;
            }

            //print_r($field_info);
            
            $row = $this->getDefaultConfig($display_mode);
            $row['field'] = $field_name;

            $b64 = base64_encode(file_get_contents($this->getUrl($row['image'])));
            $src = "data:image/png;base64,$b64";
            $row['src'] = $src;

            $row['areas'] = file_get_contents($this->getUrl($row['map']));
            $row['type'] = $field_info['element_type'];

            $settings[] = $row;
        }

        if (empty($settings)) {
            return;
        }

        echo '<script>var imageMapLibrary = ' . json_encode($settings) . ';</script>';
        
        $this->includeJs('js/imageMapster.js');
        $this->includeJs('js/imagemap.js');
        
        if(!empty($Proj->metadata['painmap_female']))
            print_r ($Proj->metadata['painmap_female']);

    }

    /**
     * Includes a local JS file.
     *
     * @param string $path
     *   The relative path to the js file.
     */
    protected function includeJs($path) {
        echo '<script src="' . $this->getUrl($path) . '"></script>';
    }

    protected function getDefaultConfig($display_mode) {
        switch ($display_mode) {
            case 'PAINMAP_MALE':
                return array(
                    'name' => 'painmap_male',
                    'alt' => 'Male Front Pain Map',
                    'image' => 'img/painmap_male.png',
                    'width' => 553,
                    'height'=> 580,
                    'map' => 'maps/painmap_male.html'
                );
            case 'PAINMAP_FEMALE':
                return array(
                    'name'  => 'painmap_female',
                    'alt'   => "Female Front Pain Map",
                    'image' => "img/painmap_female.png",
                    'width' => 518,
                    'height'=> 580,
                    'map'   => "maps/painmap_female.html"
                );
            case  'SMILE_SCALE':
                return array(
                    'name'  => 'smile_scale',
                    'alt'   => "Smile Scale",
                    'image' => "img/smile_scale.png",
                    'width' => 602,
                    'height'=> 147,
                    'map'   => "maps/smile_scale.html",
                    'singleSelect' => true,
                    'fillColor'    => '00aa00'
                );
        }
    }
}

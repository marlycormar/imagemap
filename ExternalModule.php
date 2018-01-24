<?php
/**
 * @file
 * Provides ExternalModule class for Image Map.
 */

namespace ImageMap\ExternalModule;

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;
use Form;
Use Stanford\Utility\ActionTagHelper;

/**
 * ExternalModule class for Pain Map.
 */
class ExternalModule extends AbstractExternalModule {

    public $tag = "@IMAGEMAP";

    /**
     * @inheritdoc
     */
    function redcap_every_page_top($project_id) {
        if (PAGE == 'Design/online_designer.php' && $project_id) {

            //TODO:  CLean up this help stuff and potentially recommend the question type and data-dictionary options

            $help = "Availalbe image maps are:";
            foreach ($this->getImageMapParams() as $map => $params) {
                $help .= "<br><dt class='imagemap'>" . $map . "</dt><dd class='imagemap'>".$params['desc']."</dd>";
            };
            echo "<script>var imageMapEM = imageMapEM || {};</script>";
            echo "<script>imageMapEM.maps = " . json_encode($help) . ";</script>";
            echo "<style>dt.imagemap { display: inline-block; width: 180px; }  dd.imagemap { display: inline; }</style>";

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

        // Loop through action tags
        $instrument = $_GET['page'];    // This is a bit of a hack, but in surveys this is set before the every_page_top hook is called

        //TODO: Consider switching over to ActionTagHelper to support single-param overrides in imagemap (such as hiding or showing the radio/checkboxes)

        // Check action-tags for this page
        foreach (array_keys($Proj->forms[$instrument]['fields']) as $field_name) {
            $field_info = $Proj->metadata[$field_name];

            if (!$display_mode = Form::getValueInActionTag($field_info['misc'], $this->tag)) {
                continue;
            }

            $row = $this->getImageMapParams($display_mode);
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

        echo '<script>var imageMapEM = imageMapEM || {};</script>';
        echo '<script>imageMapEM.settings = ' . json_encode($settings) . ';</script>';
        
        $this->includeJs('js/imageMapster.js');
        $this->includeJs('js/imagemap.js');
    }

    /**
     * Includes a local JS file - uses the API endpoint if auth type is shib
     *
     * @param string $path
     *   The relative path to the js file.
     */
    protected function includeJs($path) {
        // For shib installations, it is necessary to use the API endpoint for resources
        global $auth_meth;
        $ext_path = $auth_meth == 'shibboleth' ? $this->getUrl($path, true, true) : $this->getUrl($path);
        echo '<script src="' . $ext_path . '"></script>';
    }


    /**
     * Return the array of params for the specified imagemap (or all maps)
     *
     * @param $image_map
     * @return mixed
     */
    protected function getImageMapParams($image_map = null) {

        //TODO: Support having custom-maps defined via the EM config
        $image_maps = $this->getConfig()['default-image-maps'];
        if ($image_map !== null) {
            return $image_maps[$image_map];
        } else {
            return $image_maps;
        }

    }
}

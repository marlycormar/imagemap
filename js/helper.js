$(document).ready(function() {
    // Checking if field annotation is present on this page.
    if ($('#div_field_annotation').length === 0) {
        return false;
    }

    $('body').on('dialogopen', function(event, ui) {
        var $popup = $(event.target);
        if ($popup.prop('id') !== 'action_tag_explain_popup') {
            // That's not the popup we are looking for...
            return false;
        }

        // Aux function that checks if text matches the "@HIDECHOICE" string.
        var isDefaultLabelColumn = function() {
            return $(this).text() === '@HIDECHOICE';
        }

        // Getting @HIDECHOICE row from action tags help table.
        var $default_action_tag = $popup.find('td').filter(isDefaultLabelColumn).parent();
        if ($default_action_tag.length !== 1) {
            return false;
        }

        var tag_name = '@IMAGEMAP';
<<<<<<< HEAD
        var descr = imageMapEM.maps;
=======
        var descr = 'Converts a Text Box field into one of the following clickable images: male, female, or smile scale. The possible values for @IMAGEMAP are PAINMAP_FEMALE, PAINMAP_MALE, and SMILE_SCALE corresponding to a generic female body, a generic male body, and a smile scale, respectively. For example, to display a male body with clickable body parts, you may use @IMAGEMAP=PAINMAP_MALE.';
>>>>>>> ctsit/develop

        // Creating a new action tag row.
        var $new_action_tag = $default_action_tag.clone();
        var $cols = $new_action_tag.children('td');
        var $button = $cols.find('button');

        // Column 1: updating button behavior.
        $button.attr('onclick', $button.attr('onclick').replace('@HIDECHOICE', tag_name));

        // Columns 2: updating action tag label.
        $cols.filter(isDefaultLabelColumn).text(tag_name);

        // Column 3: updating action tag description.
        $cols.last().html(descr);

        // Placing new action tag.
        $new_action_tag.insertAfter($default_action_tag);
    });
});

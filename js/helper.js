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

        // Create the help text
        var descr = $('<div></div>')
            .addClass('imagemap-container')
            .html('Converts a radio, checkbox, or text field into a clickable image. For example, to display a male body '
                + 'with clickable body parts, you may use <nobr>@IMAGEMAP=PAINMAP_MALE</nobr>.  For a full list of available '
                + 'image maps and details about options, please reference the:<br>');
        var btn = $('<a></a>')
            .attr('href', imageMapEM.helpUrl)
            .attr('target', '_BLANK')
            .append(
                $('<div></div>')
                    .addClass('btn btn-xs btn-primary')
                    .text('Full Documentation')
            )
            .appendTo(descr);

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

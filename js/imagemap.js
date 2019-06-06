// ****************************************************************************************************
// IMAGE MAP FUNCTIONS TO ADD IMAGE MAP CAPABILITIES TO REDCAP QUESTIONS
// ****************************************************************************************************

/*
 INSTRUCTIONS:
 THIS FEATURE HAS BEEN MODIFIED TO WORK AS A HOOK SO CAN BE SUPPORTED WITHOUT MODIFICATION TO THE REDCAP SOURCE CODE.

 CONFIGURATION:
 TO USE THIS YOU MUST FIRST HAVE A DEFINED IMAGE AND THE AREAS FOR IT WITH THE data-key ATTRIBUTE SET FOR
 THE VALUE YOU WANT TO USE TO RECORD THE SELECTION.

 CREATE A NEW TEXT QUESTION IN YOUR DATA-DICTIONARY AND SET THE NOTES FIELD TO BE: @IMAGEMAP=LIBRARY_NAME (ALL CAPS)
*/

/**
 * IMAGEMAP OBJECT AND FUNCTIONS
 */

var imageMapEM = imageMapEM || {};

imageMapEM.log = function() {
    // Make console logging more resilient to Redmond
    try {
        console.log.apply(this,arguments);
    } catch(err) {
        // Error trying to apply logs to console (problem with IE11)
        try {
            console.log(arguments);
        } catch (err2) {
            // Can't even do that!  Argh - no logging
            // var d = $('<div></div>').html(JSON.stringify(err)).appendTo($('body'));
        }
    }
};

imageMapEM.start = function() {
    $(function(){

        // Render each imagemap
        $.each(imageMapEM.settings, function(index, value) {
            // imageMapEM.log ('index: ' + index);
            // imageMapEM.log (value);
            imageMapEM.render(value);
        });

        // Check if mobile for resizing
        if (isMobileDevice) {
            imageMapEM.resize();	// Call it once to set the initial size
            $(window).resize(imageMapEM.resize); // Bind to window resizing in case the device is rotated
        }
    });
};

imageMapEM.render = function(params) {
    // Get TR Element
    var tr = $('tr[sq_id='+params.field+']');
    //imageMapEM.log('tr');imageMapEM.log($(tr));

    // Get note
    var note = $('div.note', tr);
    //imageMapEM.log('note');imageMapEM.log($(note));

    // Get Label
    var label = $('td.labelrc:last', tr);
    //imageMapEM.log('label');imageMapEM.log($(label));

    // Get Data (not always present - depends on rendering options)
    var data = $('td.data', tr);
    //imageMapEM.log('data');imageMapEM.log($(data));

    // Get result tag (it is assumed that image maps for now are concatenated, comma-delimited strings in an input field)
    var result = $('input[name="' + params.field + '"]', tr);
    //imageMapEM.log("Result Field");imageMapEM.log(result);

    // // Hide the note (except on online-designer)
    // if (page == "DataEntry/index.php" || page == "surveys/index.php") {
    //     $(note).css('display','none');
    // } else {
    //     $(note).append('<br><em>This note will not be visible on the survey or data entry form</em>');
    // }

    // Hide the checkbox input on surveys and data entry forms
    if (page == "DataEntry/index.php" || page == "surveys/index.php") {
        // Hide Checkbox/Radio Fields
        if (params.hideInput) {

            // Hide radio and checkboxes
            $('.frmrdh',tr).hide();
            $('.frmrd',tr).hide();
            $('.choicevert',tr).hide();
            $('.choicehoriz',tr).hide();

            // Hide text input
            $('input[type=text][name="'+params.field+'"]').hide();
        }
    }

    // Get the image map (with IDs based on the question so you can have multiple of the same image maps on a single page)
    var id = params.field + '_' + params.name;
    var imgTag = $('<img/>', {
        name: params.name,
        field: params.field,
        src: params.src,
        width: params.width,
        id: params.field + '_' + params.name,
        usemap: '#map_' + id,
        alt: params.alt,
        border: 0
    });
    //imageMapEM.log('imgTag');imageMapEM.log($(imgTag));
    var mapTag = $('<map/>', {
        order: 1,
        name: 'map_' + id
    }).html(params.areas);

    //Set the mouse-over title - in this case, the data-set attribute in the image map
    $('area:not([data-key=""])[title=""]',mapTag).each(function() {
        $(this).attr('title', $(this).attr('data-key'));
    });

    //imageMapEM.log('mapTag');imageMapEM.log($(mapTag));
    var imageMap = $('<div style="margin-right:auto;margin-left:auto;width:'+params.width+'px"/>').addClass('imagemap').append(imgTag).append(mapTag);
    //imageMapEM.log('imageMap');imageMapEM.log($(imageMap));

    // Insert image map after label
    $(label).append(imageMap);

    // Determine if imagemap is selectable
    var selectable = true;
    if (page == "DataEntry/index.php" && $('#form_response_header').length) {
        //In data entry mode but results from survey are in...  Only editable if in edit-response mode
        var regex = new RegExp('editresp\=1$');
        if (!regex.test(document.baseURI)) {
            selectable = false;
        }
    }

    // Determine if multiselect (default) or single-select
    var singleSelect = (params.singleSelect == true);

    // Allow customizable fillColor
    var fillColor = 'fillColor' in params ? params.fillColor : 'ff0000';

    // Apply Mapster to image tag
    var img = $('#'+id, label).mapster({
        fillColor: fillColor,
        mapKey:'data-key',
        fillOpacity: 0.4,
        isSelectable: selectable,
        singleSelect: singleSelect,
        render_highlight: {
            fillColor: '333333',
            fillOpacity: 0.2
        },
        onStateChange: function (data) {
            // Update input when changed
            if (data.state == 'select') {
                imageMapEM.updateAreaList(this, data);
            }
        }
    });

    // On mobile devices where the viewport is fixed in redcap it may be necessary to resize width
    if (isMobileDevice) {
        $(img).attr('resize_check', 'true');
    }

    // Load saved values
    imageMapEM.loadAreaList(params.field);

    // If bound to a checkbox, handle checking the checkbox inputs directly to update the map
    $('input[type=checkbox]', tr).parent().bind('click', function() {
        // Prevent this code from happening twice when the event is fired from a click
        // on the imageMap
        if(event.isTrusted) {
            // imageMapEM.log(this, event);
            var tr = $(this).closest('tr');
            //imageMapEM.log(tr);
            var div = $(this).closest('div');
            var field_name = $(tr).attr('sq_id');
            var img = $('img[field="'+field_name+'"]', tr).not(".mapster_el");
            //imageMapEM.log(img);
            var checkbox = $('input[type=checkbox]', div);
            // imageMapEM.log(checkbox);
            var code = checkbox.attr('code');
            //imageMapEM.log(code);
            var checked = checkbox.is(":checked");
            //imageMapEM.log(checked);
            $(img).mapster('set',checked,code);
        }
    });



    // If bound to radio, capture radio changes and update imageMap
    $('input[type=radio]', tr).bind('click', function() {
        var tr = $(this).closest('tr');
        //imageMapEM.log(tr + ' clicked');
        var field_name = $(tr).attr('sq_id');
        //imageMapEM.log(field_name);
        imageMapEM.loadAreaList(field_name);
    });

    // Bind to reset button
    $('a:contains("reset")', tr).bind('click',function() {
        var tr = $(this).closest('tr');
        //imageMapEM.log(tr);
        var field_name = $(tr).attr('sq_id');
        //imageMapEM.log(field_name);
        var img = $('img[field="'+field_name+'"]', tr).not(".mapster_el");

        // Get selected option/s and deselect them
        var sel = $(img).mapster('get');
        $(img).mapster('set',false,sel);
        //imageMapEM.log(sel);
    });
}

// Update the image map to match the field
imageMapEM.loadAreaList = function(field_name) {
    // Get TR for question
    var tr = $('tr[sq_id='+field_name+']');
    //imageMapEM.log ('tr');imageMapEM.log(tr);

    img = $('img[field="'+field_name+'"]', tr).not(".mapster_el");
    //imageMapEM.log ('img');imageMapEM.log(img);

    // If checkboxes are used, then update imagemap from values
    $('input[type=checkbox]:checked', tr).each(function() {
        // (this) is redcap checkbox field.
        var code = $(this).attr('code');
        //imageMapEM.log('Code: ' + code);
        $(img).mapster('set',true,code);
    });

    // If text - then process from list
    $('input[type=text][name="'+field_name+'"]', tr).each(function() {
        $(img).mapster('set',true,$(this).val());
    });

    // For radio button questions, the main input is here - use it to set value
    $('input[name="'+field_name+'"]', tr).each(function() {
        $(img).mapster('set',true,$(this).val());
    });

}

// Takes the values from the image map and saves them to the redcap form
imageMapEM.updateAreaList = function(image, data) {
    var field_name = $(image).attr('field');
    var tr = $('tr[sq_id='+field_name+']');

    // Handle radio buttons as an option
    $('input[type=radio][value="'+data.key+'"]', tr).each(function() {
        if (data.selected) $(this).trigger('click');
        if (!data.selected) radioResetVal(field_name,'form');
    });

    // If checkbox exists - make sure they are in-sync
    $('input[type=checkbox][code="'+data.key+'"]', tr).each(function() {
        //imageMapEM.log ('Found checkbox ' + data.key);
        //imageMapEM.log (cb);
        var checked = $(this).is(":checked");
        //imageMapEM.log ('is checked: ' + checked);
        var selected = data.selected;
        //imageMapEM.log ('is selected: ' + selected);
        if (checked !== selected) {
            $(this).click().trigger('onclick');
            //$(this).blur();
        }
    });

    // If input field is used to hold list, then update list
    $('input[type=text][name="'+field_name+'"]', tr).each(function() {
        // Update input with value from mapster image
        var sel = $(image).mapster('get');
        if (sel) {
            var selSort = sel.split(',').sort().join(',');
            $(this).val(selSort);
        } else {
            $(this).val('');
        }
        $(this).blur();
        $(this).change();
    });
};

imageMapEM.resize = function() {
    // find all resize-check images and set width based on viewport width
    var window_width = $( window ).width();	// Get viewport width
    $('img[resize_check="true"]').each( function() {
        var image_width = this.getAttribute('width'); // Get original image width
        var max_width = Math.min(image_width,window_width); // Determine max
        $(this).mapster('resize',max_width,null);
    });
};

$(document).ready(function(){
	imageMapEM.start();
});

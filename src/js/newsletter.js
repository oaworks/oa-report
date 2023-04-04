jQuery(document).ready(function() {

    var paramsintoform = function() {
      if (window.location.search) {
        var s = window.location.search.split('?')[1];
        var params = s.split('&');
        for ( var p = 0; p < params.length; p++ ) {
          var parts = params[p].split('=');
          var cp = parts[0];
          if (cp.length && parts.length === 2 && parts[0] !== 'nothanks' && $('#'+cp).length) {
            $('#'+cp).val(decodeURIComponent(parts[1]));
          }
        }
      }
    }
    paramsintoform();
  
    var goto = false;
    var valid = undefined;
    var showMessage = function(e) {
      // display thank you text on success
      var newsletterThanks = "<h2 class='label'>Sign up for updates</h2><p class='type-5 fw-400'>Thanks for signing up! We will be in touch.</p>";
      document.getElementById("newsletter-inner").innerHTML = newsletterThanks;
    };
  
    var submit = function(e) {
      if (valid === false) {
        valid = undefined; // reset validity check and let the form continue to display warning
      } else {
        try { e.preventDefault(); } catch(err) {};
  
        valid = $('#newsletter')[0].checkValidity();
        if (!valid) {
          $('#submit').click(); // will run again, but this time skip to letting the form display warning
        } else {
          // form valid now, send the data and go to thanks
          $('#submit').replaceWith('<button>Submitting&hellip;</button>');
  
          var data = {};
  
          if (window.location.search) {
            var s = window.location.search.split('?')[1];
            var params = s.split('&');
            for ( var p = 0; p < params.length; p++ ) {
              var parts = params[p].split('=');
              if (parts.length === 2 && parts[0] !== 'nothanks' && (!fields.length || fields.indexOf(parts[0]) !== -1)) data[parts[0]] = encodeURIComponent(parts[1]);
            }
          }
  
          $('._oaworks_form').each(function() {
            if (!fields.length || fields.indexOf($(this).attr('id')) !== -1) data[$(this).attr('id')] = encodeURIComponent($(this).val());
          });
  
          goto = $(this).attr('href');
          console.log(data);
          $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            data: data,
            success: function(res) {
              console.log(res);
              showMessage();
              if (window.location.search.indexOf('nothanks') === -1) window.location = goto;
            }
          });
        }
      }
    }
    $('#newsletter').on('click','#submit', submit);
  });
  
  // Above script supports many forms, the script below points it to the right sheet
  sid = 'AKfycbxX7tSXmZ_K0wLQP-gswGtJa4DSwl4Nz-b8hPDR6Nh1Qt_WnoBmyFQg6Su4wxzbTIFx';
  url = 'https://api.openaccessbutton.org/ill/collect/' + sid;
  fields = [];
  
    // Allow the enter key to be used to submit while in the text box
    var input = document.getElementById("email");
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submit").click();
      }
    });
  
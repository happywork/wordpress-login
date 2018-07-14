<?php
/*
Plugin Name: Global Input App
Plugin URI: http://URI_Of_Global_Input_App
Description: This plugin is to make your wordpress website support the Global Input App, so you can use your mobile as a sign-in device while you are 	 signing in on your website via a browser on your computer.

Version: GIP 0.0.1
Author: Emil Galkin
Author URI: http://emil_galkin.com
License: GPL2
*/

?>
<?php
include('includes/controller.php');
// We need some CSS to position the paragraph
	function addQRCode() {
?>
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/04f46c6a/qrcode.min.js">
</script>
<script src="https://unpkg.com/global-input-message@1.5.5/distribution/globalinputmessage.min.js">
</script>
<script>
	jQuery(document).ready(function(){
		jQuery( ".message" ).append('12121212');

	});		
</script>
<script type="text/javascript">

	(function() {

	    var formElement = document.getElementById("loginform");
	    qrCodeElement = document.createElement('p');

	    qrCodeElement.style.padding = "10px";
	    qrCodeElement.style.backgroundColor = "#FFFFFF";

	    formElement.parentNode.insertBefore(qrCodeElement, formElement);

	    var globalinput = {
	        api: require("global-input-message")
	    };


	    globalinput.config = {
	        onSenderConnected: function() {
	            qrCodeElement.style.display = "none";
	        },
	        onSenderDisconnected: function() {
	            qrCodeElement.style.display = "block";
	        },
	        initData: {
	            action: "input",
	            dataType: "form",
	            form: {
	                id: "###username###@" + window.location.hostname + ".wordpress",
	                title: "Wordpress login",
	                fields: [{
	                    label: "Username",
	                    id: "username",
	                    operations: {
	                        onInput: function(username) {
	                            document.getElementById("user_login").value = username;
	                        }
	                    }

	                }, {
	                    label: "Password",
	                    id: "password",
	                    type: "secret",
	                    operations: {
	                        onInput: function(password) {
	                            document.getElementById("user_pass").value = password;
	                        }
	                    }

	                }, {
	                    label: "Login",
	                    type: "button",
	                    operations: {
	                        onInput: function() {
	                            document.getElementById("wp-submit").click();
	                        }
	                    }

	                }]
	            }
	        }

	    };
	    
	    globalinput.connector = globalinput.api.createMessageConnector();
	    globalinput.connector.connect(globalinput.config);
	    var codedata = globalinput.connector.buildInputCodeData();
	    var qrcode = new QRCode(qrCodeElement, {
	        text: codedata,
	        width: 300,
	        height: 300,
	        colorDark: "#000000",
	        colorLight: "#ffffff",
	        correctLevel: QRCode.CorrectLevel.H
	    });

	})();

</script>
<?php
	}

	add_action( 'login_head', 'addQRCode' );
?>

?>
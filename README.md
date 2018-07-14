# global-input/word-login


This repository is to make your wordpress website support the [Global Input App](https://globalinput.co.uk/), so you can use your mobile as a sign-in device while you are signing in on your website via a browser on your computer.

### Installation

First backup your existing ```wordpress/wp-login.php``` file in your website folder and replace its content with the content of the [```wordpress/wp-login.php``` in this repo](https://github.com/global-input/wordpress-login/blob/master/wordpress/wp-login.php)

### How It Works/Manual Editing file
If you prefer editing the file instead of overwriting it with the one from this repository, you can follow the following steps.
First backup your existing ```wordpress/wp-login.php``` file in your website folder and
open the file ```wordpress/wp-login.php``` with an editor.

And insert the following content somewhere in the file:

```
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/04f46c6a/qrcode.min.js">
</script>
<script src="https://unpkg.com/global-input-message@1.5.5/distribution/globalinputmessage.min.js">
</script>
<script type="text/javascript">
(function() {
	var formElement=document.getElementById("loginform");
	qrCodeElement=document.createElement('p');
	qrCodeElement.style.padding="10px";
	qrCodeElement.style.backgroundColor="#FFFFFF";
	formElement.parentNode.insertBefore(qrCodeElement,formElement);
	var globalinput={
	api:require("global-input-message")
	};
	globalinput.config={
	onSenderConnected:function(){
	qrCodeElement.style.display="none";
	},
   onSenderDisconnected:function(){
   	   qrCodeElement.style.display="block";
    },
	initData:{
	action:"input",
	dataType:"form",
	form:{
	id:  "###username###@"+window.location.hostname+".wordpress",
	title: "Wordpress login",
	fields:[{
	label:"Username",
	id:"username",
	operations:{
	   onInput:function(username){
	   document.getElementById("user_login").value=username;
	   }
	   }
	},{
   label:"Password",																	   id:"password",
   type:"secret",
   operations:{																							onInput:function(password){
   document.getElementById("user_pass").value=password;
   }
   }
   },{																						    label:"Login",
		type:"button",																		    operations:{
		onInput:function(){
		document.getElementById("wp-submit").click();
		}
		}
		}]
		}
		}
		};
globalinput.connector=globalinput.api.createMessageConnector();
globalinput.connector.connect(globalinput.config);
var codedata=globalinput.connector.buildInputCodeData();
var qrcode = new QRCode(qrCodeElement, {
text: codedata,
width: 300,
height: 300,
colorDark : "#000000",
colorLight : "#ffffff",
correctLevel : QRCode.CorrectLevel.H
});
})();
</script>
```
If you would like learn more about how the above script works, please visit the [Global Input Platform page](https://globalinput.co.uk/global-input-app/platform)

wordpress plugin...

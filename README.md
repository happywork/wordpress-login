# global-input/word-login


This repository is to make a wordpress website to support the sign in with the Global Input software. After the simple changes, you should be able to sign in with the Global Input mobile app (available in [iOS](https://itunes.apple.com/us/app/global-input-app/id1269541616?mt=8&ign-mpt=uo%3D4) and [Android](https://itunes.apple.com/us/app/global-input-app/id1269541616?mt=8&ign-mpt=uo%3D4)) just by pointing the phone camera to the QR code displayed. This means you can sign in quickly and securely.

### Quick solution

First backup your existing ```wordpress/wp-login.php``` file in your website folder and replace its content with the content of the [```wordpress/wp-login.php``` in this repo](https://github.com/global-input/wordpress-login/blob/master/wordpress/wp-login.php)

### Manual changes to the file

First backup your existing ```wordpress/wp-login.php``` file in your website folder and
open the file ```wordpress/wp-login.php``` in your website with an editor and find the following location:

(1)
 ```
<form name="loginform" id="loginform" ...
 ```
inside the form, you can specify position the QR code by adding the following:

```
<p id="qrcode"></p>
```

(2)
Search backwards from the end of the file to find the following line, which indicates the beginning of the javascript section.

```
<script type="text/javascript">
```

(3)

Add the following outside the javascript section which is before the line you have located in (2)

```
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/04f46c6a/qrcode.min.js">
</script>

<script src="https://unpkg.com/global-input-message@1.3.33/lib/global-input-message.min.js">
</script>
```

(4) Add the following javascript code inside the javascript section, which is after the line you have located in (2):


```
var globalinput={
				    api:require("global-input-message")
    		};


				globalinput.config={
			                                  onSenderConnected:function(){


			                                  },
			                                  onSenderDisconnected:function(){

			                                  },
			                                  initData:{

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
			                                                   label:"Password",
			                                                   id:"password",
			                                                   type:"secret",
			                                                   operations:{
			                                                     onInput:function(password){
			                                                      document.getElementById("user_pass").value=password;
			                                                     }
			                                                   }

			                                                },{
			                                                   label:"Login",
			                                                   type:"button",
			                                                   operations:{
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



			     var qrcode = new QRCode(document.getElementById("qrcode"), {
			       text: codedata,
			       width: 300,
			       height: 300,
			       colorDark : "#000000",
			       colorLight : "#ffffff",
			       correctLevel : QRCode.CorrectLevel.H
			     });


```

After deploying the modified wp-login.php file, you should see a QR Code, and you should be able to sign in with your mobile using the Global Input App. Note in the above. you may have noticed the following line
```
  form:{
			                                        id:  "Ni76QCOTHYrqqRmOy@"+window.location.hostname,

```
the id of the form uniquely identifies the login form so that Global Input App can saved the data you have saved and can match to do auto-filling when you come back to your website.

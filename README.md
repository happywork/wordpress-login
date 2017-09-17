# global-input/word-login


The global-input/wordpress-login is for you integrate your wordpress website with Global Input software, so that
you can sign in as admin with Global Input mobile app (available in [iOS](https://itunes.apple.com/us/app/global-input-app/id1269541616?mt=8&ign-mpt=uo%3D4) and [Android](https://itunes.apple.com/us/app/global-input-app/id1269541616?mt=8&ign-mpt=uo%3D4)) just by pointing the phone camera to the QR code displayed. This means you can sign in quickly and securely.

### Installation

open the file ```wordpress/wp-login.php``` with an editor and find the following location:


 ```
<form name="loginform" id="loginform" ...
 ```
inside the form, you can add the following to specify position to display the QR code:

```
<p id="qrcode"></p>
```

Search backwards from the end of the file to find the following line, which indicates the beginning of the javascript section.

```
<script type="text/javascript">
```

Then add the following before and outside the javascript section.

```
<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/04f46c6a/qrcode.min.js">
</script>

<script src="https://unpkg.com/global-input-message@1.3.33/lib/global-input-message.min.js">
</script>
```

Add the following inside the javascript section:

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
			                                        id:  "Ni76QCOTHYrqqRmOy@"+window.location.hostname,
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

After deploying the modified wp-login.php file, you should be able to sign in with your mobile.

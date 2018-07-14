(function() {

  /**
      looking for element from allInputElements, the element should satisfy the condition: the value of attributename equals to attributevalue
   **/

   var findElementsByAttribute=function(allInputElements, attributename, attributevalue){
       for(var x=0;x<allInputElements.length;x++){
           if(allInputElements[x].getAttribute(attributename) === attributevalue){
               return allInputElements[x];
           }
       }
       return null;
   };
   var findElementsByTwoAttribute=function(allInputElements, attributename1, attributevalue1,attributename2, attributevalue2){
      for(var x=0;x<allInputElements.length;x++){
          if(allInputElements[x].getAttribute(attributename1) === attributevalue1 && allInputElements[x].getAttribute(attributename2) === attributevalue2){
              return allInputElements[x];
          }
      }
      return null;
   };

	var formElement=document.getElementById("main");
  var qrCodeSection=document.createElement('div');
  var instruction=document.createElement('div');
  var qrCodeElement=document.createElement('div');
  instruction.textContent="Scan with the Global Input App";
  qrCodeSection.appendChild(instruction);

	qrCodeElement.style.padding="10px";
	qrCodeElement.style.backgroundColor="#FFFFFF";
  qrCodeSection.appendChild(qrCodeElement);

	formElement.insertBefore(qrCodeSection,formElement.childNodes[0]);
  var allInputElements=document.getElementsByTagName("input");
  var allTextAreaElements=document.getElementsByTagName("textarea");

	var globalinput={
						 api:require("global-input-message")
				 };
	globalinput.config={
				onSenderConnected:function(){
					  qrCodeSection.style.display="none";
        },
        onSenderDisconnected:function(){
						qrCodeSection.style.display="block";
        },
        initData:{
          action:"input",
          dataType:"form",
          form:{
                id: window.location.hostname+".wordpress",
                title: "CONTACT US",
                fields:[{
                            label:"First Name",
                            id:"first_name",
                            operations:{
                                  onInput:function(firstname){
                                  findElementsByAttribute(allInputElements,"name","your-first-name").value=firstname;
                                }
                            }
                        },{
                                    label:"Last Name",
                                    id:"last_name",
                                    operations:{
                                          onInput:function(lastname){
                                          findElementsByAttribute(allInputElements,"name","your-last-name").value=lastname;
                                        }
                                    }
                          },{
                                      label:"Email",
                                      id:"email",
                                      operations:{
                                            onInput:function(email){
                                            findElementsByAttribute(allInputElements,"name","your-email").value=email;
                                          }
                                      }
                            },{
                                        label:"Phone Number",
                                        id:"phone_number",
                                        operations:{
                                              onInput:function(phoneNumber){
                                              findElementsByAttribute(allInputElements,"name","your-phone").value=phoneNumber;
                                            }
                                        }
                              },{
                                          label:"Message",
                                          id:"message",
                                          nLines:5,
                                          operations:{
                                                onInput:function(message){
                                                findElementsByAttribute(allTextAreaElements,"name","your-message").value=message;
                                              }
                                          }
                                },{
															label:"Send Now",
															type:"button",
															operations:{
																 onInput:function(){
                                         findElementsByTwoAttribute(allInputElements,"type","submit","value","SEND NOW").click();
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

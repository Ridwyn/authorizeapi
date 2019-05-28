let proceed =document.getElementById('proceed');
let cardPaymentForm=document.getElementById('cardPaymentForm')


//XHR for making requests
function makeRequest(url,body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type","application/json")

    xhr.send(body);
    return new Promise((resolve,reject)=>{
        xhr.onreadystatechange= function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
            //   console.log(xhr.responseText);
            resolve( xhr.responseText)
            }
          };
          xhr.onerror = function() {
            reject(new TypeError(xhr.responseText || 'Network request failed'))
          }
    })

}

// serializer
function formSerialize(formElement) {
    const values = {};
    const inputs = formElement.elements;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type!="submit"){ 
            values[inputs[i].name] = inputs[i].value;
        }
    }
    return values;
}

//Collect User info before posting redirecting to User info optional
proceed.onclick=(e)=>{
    e.preventDefault();
    let form= formSerialize(cardPaymentForm)
    //Populate Authorize Json upon redirect and get token to submit form with user info to get token 
    let getHostedPaymentPage={
        "getHostedPaymentPageRequest": {
          "merchantAuthentication": {
            "name": "4vzCzTK46uB",
            "transactionKey": "4eT533qH5xD4v62S"
          },
          "transactionRequest": {
            "transactionType": "authCaptureTransaction",
            "amount": `${form.amount}`,
           
          },
          "hostedPaymentSettings": {
            "setting": [{
              "settingName": "hostedPaymentReturnOptions",
              "settingValue": "{\"showReceipt\": true, \"url\": \"https://mysite.com/receipt\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://mysite.com/cancel\", \"cancelUrlText\": \"Cancel\"}"
            }, {
              "settingName": "hostedPaymentButtonOptions",
              "settingValue": "{\"text\": \"Pay\"}"
            }, {
              "settingName": "hostedPaymentStyleOptions",
              "settingValue": "{\"bgColor\": \"blue\"}"
            }, {
              "settingName": "hostedPaymentPaymentOptions",
              "settingValue": "{\"cardCodeRequired\": false, \"showCreditCard\": true, \"showBankAccount\": true}"
            }, {
              "settingName": "hostedPaymentSecurityOptions",
              "settingValue": "{\"captcha\": false}"
            }, {
              "settingName": "hostedPaymentShippingAddressOptions",
              "settingValue": "{\"show\": false, \"required\": false}"
            }, {
              "settingName": "hostedPaymentBillingAddressOptions",
              "settingValue": "{\"show\": true, \"required\": false}"
            }, {
              "settingName": "hostedPaymentCustomerOptions",
              "settingValue": "{\"showEmail\": false, \"requiredEmail\": false, \"addPaymentProfile\": true}"
            }, {
              "settingName": "hostedPaymentOrderOptions",
              "settingValue": "{\"show\": true, \"merchantName\": \"G and S Questions Inc.\"}"
            }, {
              "settingName": "hostedPaymentIFrameCommunicatorUrl",
              "settingValue": "{\"url\": \"https://mysite.com/special\"}"
            }]
          }
        }
      }
      //Make request to api to get token need to populate the token "value" field of form beofre submitting form
      makeRequest("https://apitest.authorize.net/xml/v1/request.api",JSON.stringify(getHostedPaymentPage))
      .then((response)=>{
          let result=JSON.parse(response)
        if(result.messages.resultCode=="Ok"){
            //Set the token value of the form then submit to reditect to page
            cardPaymentForm.elements[0].setAttribute('value',`${result.token}`)
            //Submit form for redirect to api action value
            cardPaymentForm.submit()
        }
      })

}
let cardPaymentForm=document.getElementById('cardPaymentForm')

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

let a =creditCard.value 
 
//All Info JSON to charge a credit card i.e customer,ship address etc 
//Including this INfo would be included in the genrated email sent to the merchane wmail       
let chargeCreditCard=                                                                                                                                                                   
{
    // required
    "createTransactionRequest": {
        "merchantAuthentication": {
            "name": "9Lz9CYv658",
            "transactionKey": "647uMhj3629uDzLR"
        },
        // optional
        "refId": "123456",
        //required
        "transactionRequest": {
            "transactionType": "authCaptureTransaction",
            "amount": "5",
            "payment": {
                "creditCard": {
                    "cardNumber":"11111222223334",
                    "expirationDate": "2020-12",
                    "cardCode": "999",
                    "fullname":""
                }
            },
            "lineItems": {
                "lineItem": {
                    "itemId": "1",
                    "name": "vase",
                    "description": "Cannes logo",
                    "quantity": "18",
                    "unitPrice": "45.00"
                }
            },
            "tax": {
                "amount": "4.26",
                "name": "level2 tax name",
                "description": "level2 tax"
            },
            "duty": {
                "amount": "8.55",
                "name": "duty name",
                "description": "duty description"
            },
            "shipping": {
                "amount": "4.26",
                "name": "level2 tax name",
                "description": "level2 tax"
            },
            "poNumber": "456654",
            "customer": {
                "id": "99999456654"
            },
            "billTo": {
                "firstName": "Ellen",
                "lastName": "Johnson",
                "company": "Souveniropolis",
                "address": "14 Main Street",
                "city": "Pecan Springs",
                "state": "TX",
                "zip": "44628",
                "country": "USA"
            },
            "shipTo": {
                "firstName": "China",
                "lastName": "Bayles",
                "company": "Thyme for Tea",
                "address": "12 Main Street",
                "city": "Pecan Springs",
                "state": "TX",
                "zip": "44628",
                "country": "USA"
            },
            "customerIP": "192.168.1.1",
            "transactionSettings": {
                "setting": {
                    "settingName": "testRequest",
                    "settingValue": "false"
                }
            },
            "userFields": {
                "userField": [
                    {
                        "name": "MerchantDefinedFieldName1",
                        "value": "MerchantDefinedFieldValue1"
                    },
                    {
                        "name": "favorite_color",
                        "value": "blue"
                    }
                ]
            }
        }
    }
}  


cardPaymentForm.onsubmit=(e)=>{
    e.preventDefault();
   let s_form= formSerialize(cardPaymentForm)
   let chargeCard=
   {  
    "createTransactionRequest": {
    "merchantAuthentication": {
        "name": "9Lz9CYv658",
        "transactionKey": "647uMhj3629uDzLR"
    },
    "refId": "123456",
    "transactionRequest": {
        "transactionType": "authCaptureTransaction",
        "amount": "5",
        "payment": {
            "creditCard": {
                "cardNumber":`${s_form.cardNumber}`,
                "expirationDate": `${s_form.expYear +"-"+ s_form.expMonth}`,
                "cardCode": `${s_form.cvc}`
            }
        }
    }
    }
}
    console.log(chargeCard)

    makeRequest("https://apitest.authorize.net/xml/v1/request.api",JSON.stringify(chargeCard))
    .then(response=>{
        let result=JSON.parse(response)
        console.log(result)
        if(result.transactionResponse.responseCode==="1"){
            document.getElementById("success").innerHTML= `  <div class="jumbotron text-xs-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead">
                    <a class="btn btn-primary btn-sm" href="/" role="button">Continue</a>
                </p>
                </div>`
        }
    }).catch(error=>{
        throw error
    })
}

function successfulHTML(){

}
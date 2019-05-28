let clickMe=document.getElementById('clickMe')

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

let creditCard=document.getElementById('creditCard')   
let a =creditCard.value 
 
       
clickMe.addEventListener('click',()=>{
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
                    "cardNumber":""+creditCard.value+"",
                    "expirationDate": "2020-12",
                    "cardCode": "999"
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
makeRequest("https://apitest.authorize.net/xml/v1/request.api",JSON.stringify(chargeCreditCard))
.then(response=>{
    console.log(JSON.parse(response))
}).catch(error=>{
    throw error
})

})

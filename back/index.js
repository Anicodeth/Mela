
import ingniter from "./loader/index.js"

ingniter()




// app = express();

// app.post('/donate',(req , res) =>{

//   const options = {
//     'method': 'POST',
//     'url': 'https://api.chapa.co/v1/transaction/initialize',
//     'headers': {
//       'Authorization': 'Bearer CHASECK_TEST-y6E81jqdAdCcJxX5aUIbXIzKiwjHT0p9',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "amount": req.body.amount,
//       "currency": req.body.currency,
//       "email": req.body.email,
//       "first_name": req.body.first_name,
//       "last_name": req.body.last_name,
//       "phone_number": req.body.phone_number,
//       "tx_ref": req.body.amount + req.body.email,
//       "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
//       "return_url": "https://www.google.com/"

//     })

//   };

//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);

//     res.send(response.body);
//   });

// })








// app.listen(3000, ()=>{
//   console.log("listening");
// })
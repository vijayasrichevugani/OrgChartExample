import express from 'express';
import * as fs from "fs";
import * as d3 from "d3";

const app = express()

app.set('view engine', 'ejs');

app.use(express.static('public'));

var data  = fs.readFileSync("data1.txt","utf8");
var psv = d3.dsvFormat("|");

data = psv.parse(data,function(d){
  if(d["globalUtlimate_duns"] == "NULL"){
    d["globalUltimate_duns"] = null;
  }
  return {
    parentId: d["globalUltimate_duns"],
    id: d["domesticUltimate_duns"],
    gu_primaryName : d.gu_primaryName,
    du_primaryName: d.du_primaryName,
    Country: d.Country,
    Supplier: d.supplier,
    Client: d.client
  };
});

app.get('/', function (req, res) {
  res.render('index', {
    data: JSON.stringify(data)
  });
})
app.listen(3000,()=>console.log("Server listening on port 3000!"))
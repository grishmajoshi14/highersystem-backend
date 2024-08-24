const app=require("./app.js");
const {createTable}=require("./table/createTable.js")

createTable()
PORT=4000

app.listen(PORT,()=>
{
    console.log(`server is listening at PORT : ${PORT}`);
})
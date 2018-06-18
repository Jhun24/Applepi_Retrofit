module.exports = index;

function index(app) {
    app.get("/query",(req,res)=>{
      "use strict";
        var text = req.query.text;

        res.send({
          data:"너가 보낸 텍스트 : "+text
        })
    });

    app.post("/query",(req,res)=>{
        "use strict";
        var text = req.body.text;

        res.send({
            data:"너가 보낸 텍스트 : "+text
        })
    });
}

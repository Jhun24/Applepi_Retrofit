module.exports = auth;

function auth(app , randomstring , userModel , session){
    "use strict";

    app.post('/auth/login',(req,res)=>{
        var id = req.body.id;
        var password = req.body.password;

        userModel.find({"id":id,"password":password},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send({
                    "status":404,
                    "message":"user not found"
                });
            }
            else{
                req.session.token = model[0]["token"];
                res.send({
                    "status":200,
                    "data":model[0]
                });
            }
        });
    });

    app.post('/auth/register',(req,res)=>{
        var id = req.body.id;
        var password = req.body.password;
        var name = req.body.name;
        var token = randomstring.generate();

        userModel.find({"id":id},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                var saveUserModel = new userModel({
                    "id":id,
                    "password":password,
                    "name":name,
                    "token":token
                });

                saveUserModel.save((err,m)=>{
                    if(err) throw err;
                    req.session.token = token;
                    res.send({
                        "status":200,
                        "data":m
                    });
                });
            }
            else{
                res.send({
                    "status":403,
                    "message":"user alreay sign up"
                });
            }
        });
    });

    app.post('/auth/init',(req,res)=>{
        var token = req.body.token;

        var age = req.body.age;
        var sex = req.body.sex;
        var work = req.body.work;

        userModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    "status":404,
                    "message":"user not found"
                });
            }
            else{
                userModel.update({"token":token},{$set:{"age":age,"sex":sex,"work":work}},(error,m)=>{
                    if(error) throw error;
                    res.send({
                        "status":200
                    });
                });
            }
        });
    });

    app.get("/auth/getToken",(req,res)=>{
        var token = req.session.token;
        console.log(token);
        if(token == undefined){
            res.send({
                "status":404,
                "message":"token undefinded"
            });
        }
        else{
            res.send({
                "status":200,
                "token":token
            });
        }
    });
}
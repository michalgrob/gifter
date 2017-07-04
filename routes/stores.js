var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Gift = require('./models/Gift');
var parser = require('json-parser');
var interest=require('./models/interest');
var inGiftInter=require('./models/inGiftInter');
var User=require('./models/User');
var Store=require('./models/Store');
var fs = require('fs');
var csv = require('fast-csv');

router.get('/login', function(req, res, next) {

    var x=0;
    var uName=req.query.sname;
    var gifts = [];
    addNewStore("castro","azrieli tlv",gifts);//
    res.render('storeInfoPage', {etitle : "Stroe Page",LogedInUser:uName});

});


router.get('/storeAddGift', function(req, res, next) {

    var x = 0;
    //  var uName=req.query.sname;
    interest.find({}, function (err, orders) {
        if (err) throw err;
        var orders_json = [];
        orders.forEach(function (order) {
            orders_json.push({interest: order.name});
        });

        res.render('storeAddGiftPage', {orders: orders_json, etitle: "add gift ", LogedInUser: "Guest"});
    });
});

router.post('/addGift', function(req, res, next) {

    var minAge=req.body.minAge;
    var maxAge=req.body.maxAge;
    var gender=req.body.gender;
    var price=req.body.price;
    var storeName=req.body.storeName;
    var storeInterests=req.body.hobbies;
    var  giftName=req.body.giftName;
    var  giftId =req.body.giftId;
    var storeId=req.body.storeId;
    //
    addOneGiftToStore(giftName,storeName,minAge,maxAge,gender,price,storeInterests,giftId,storeId," ",function(){
        res.redirect('/stores/storeInfo');});

    // giftSearch(gender,maxPrice ,minPrice,age, req.body.hobbies,res);
    // res.render('resultPage');

});
router.get('/storeInfo', function(req, res, next) {

    var x=0;
    var uName=req.query.sname;

    res.render('storeInfoPage', {etitle : "Stroe Page",LogedInUser:uName});

});

router.post('/importCSV', function(req, res, next) {
    var path = req.body.path;
    var store_name = req.body.store_name.toLowerCase();;
    var store_id = req.body.store_id;

    var csvData = [];
    fs.createReadStream(path).pipe(csv()).
    on('data',function (data) {
        csvData.push(data);
    })
        .on('end',function () {
            for (i = 1; i < csvData.length; i++) {
                var prodId = csvData[i][0];
                var giftName = csvData[i][1];
                var minAge = csvData[i][2];
                var maxAge = csvData[i][3];
                var gender = csvData[i][4];
                var price = csvData[i][5];
                var imgURL = csvData[i][6];
                var storeInterests = csvData[i][7].split(";");
                addOneGiftToStore(giftName,store_name,minAge,maxAge,gender,price,storeInterests,prodId,store_id,imgURL,next)
            }
        });

    res.render('mainPage', {etitle : "present",LogedInUser: "Guest"});
});

module.exports = router;

function addNewStore(storeName,location,gifts){

    Store.find({name:storeName,location:location},(function(err,stores) {
        if (err) throw err;
        if (stores.length) {
            console.log('Store exiss!!!');
           // alert("the store id is already exist");
        }
        else {

            var newStore = new Store();
            newStore.name = storeName;
            newStore.store_id = stores.length + 1;
            newStore.location = location;

            for (var i = 0; i < gifts.length; i++)// interest for
            {
                newStore.gifts.push(gifts[i]._id);
            }
            newStore.save(function (err) {
                if (err) throw err;

                console.log('store saved successfully!');
            });
        }
    }))
}

function addOneGiftToStore(giftName,storeName,minAge,maxAge,gender,price,storeInterests,prodId,store_id,imgURL,next) {

    interest.find({},function (err,interests) {
        if(err) throw err;
        var newGift = new Gift();
        newGift.name = giftName;
        newGift.prod_id = prodId;
        newGift.price = price;
        newGift.gender = gender;
        newGift.store_id = store_id;
        newGift.store_name = storeName;
        newGift.minAge= minAge;
        newGift.maxAge=maxAge;
        newGift.ImageUrl=imgURL;

        var interestsWithScore0 = [];
        var interestsWithScore1 = storeInterests;

        for(var i=0;i<interests.length;i++){
            interestsWithScore0.push(interests[i]._doc.name.trim());
        }

        for(var i=0;i<interestsWithScore1.length;i++){
            interestsWithScore0 = interestsWithScore0.filter(function (e) {
                return e != interestsWithScore1[i];
            })
        }

        for(var i=0;i<interestsWithScore0.length;i++){
            newGift.interests.push({interest: interestsWithScore0[i].trim(), dynamicScore: 0});
        }

        for(var i=0;i<interestsWithScore1.length;i++){
            newGift.interests.push({interest: interestsWithScore1[i].trim(), dynamicScore: 1});
        }

        newGift.save(function(err) {
            if (err) throw err;

            console.log('Gift saved successfully!');
            var giftMongoId=newGift._id;
            relateGiftToStore(giftMongoId,store_id,storeName,next);
        });


    })
}

function relateGiftToStore(newGiftId,store_id,storeName,next) {
    Store.findOneAndUpdate({name: {$in:storeName}},{$push:{gifts:newGiftId}},{new:true},function (err,store) {
        if(err ){ throw err;}
        //res.render('storeInfoPage');//
        // res.redirect('/stores/storeInfo');
        next();

    })
}






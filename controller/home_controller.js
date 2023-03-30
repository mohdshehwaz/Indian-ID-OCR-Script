const path = require('path');
const tesseract = require('node-tesseract-ocr');

module.exports.home = (req,res) => {
    res.render('index',{
        title:'Home Page',
        data:''
    });
}

module.exports.convert = async (req,res) => {
    console.log(req.file.path);
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      };
    try{
        const text = await tesseract
            .recognize(req.file.path, config)
        var docs = text.split("\r\n");
                
        if(docs.includes("Permanent Account Number Card")){
            return res.json(200,{
                idType: "panCard",
                idNumber: docs[docs.indexOf("Permanent Account Number Card")+1],
                info:{
                    name:docs[docs.indexOf("Name")+1],
                    fatherName:docs[docs.indexOf("Father's Name")+1],
                    dob : docs[docs.indexOf("DOB")+1]
                }
            });
        }
        
        
        return res.json(200,{
            docs
        });
    }
    catch(err){
        console.log(err);
        return res.render('back');
    }

    
}
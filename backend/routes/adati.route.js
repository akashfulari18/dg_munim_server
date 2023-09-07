const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { checkRole } = require('../middleware/checkRole.middleware')
const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const InvoiceModel = require('../model/invoice.model')
const checkInvoieID = require('../middleware/invoice.middleware')
const FromKharidiModel = require('../model/fromKharidi.model')
const FromShetkariModel = require('../model/shetkariEntry.model')
const ShetkariModel = require('../model/shetkariEntry.model')
const MarketModel = require('../model/market.model')
const ProductDetailsModel = require('../model/productDetails.model')
require('dotenv').config()

const adatiRoute = express.Router()

adatiRoute.post('/post_form_data', authMiddleware, checkRole(['adati']), async (req, res) => {
    const { bill_no } = req
    const {shetkari_mobile_no,shetkaryache_nav,adati_ID,    } = req.body

    const query ={
       $or:[
        {shetkari_mobile_no:shetkari_mobile_no},
        {shetkaryache_nav:shetkaryache_nav}
       ]
    }
    try {

        
        // const user = await UserModel.findOne({_id:req.body.userID})
        const user = await InvoiceModel.find({ bill_no })
        // const shetkari = await ShetkariModel.find(query)
        // to add date in req.body 

        const currentDate = new Date();

        // Format the date with date, time, and AM/PM indicator
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(currentDate);


        if (user.length > 0) {
            res.status(400).send({ msg: "invoice already genrated..." })
        } else {
            console.log(req.body)

            const newShetkari = {
                           

            }


            // store shetkari

            const shetkari_details= await new ShetkariModel()
           
            const newInvoice = await new InvoiceModel({ ...req.body, entry_date: formattedDate })
            const savedInvoice = await newInvoice.save()

            // console.log(savedInvoice)
            // const invoiceToken = jwt.sign({ invoiceId: savedInvoice._id ,bill_no: savedInvoice.bill_no }, process.env.PRIVATE_KEY)
            // res.status(200).send({ msg: "invoice saved sucessfully...", invoiceToken})
            res.status(200).send({ msg: "invoice saved sucessfully...",bill_no, })


        }

        // res.status(200).send(req.body)

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

adatiRoute.get('/genrate_invoice', authMiddleware, checkRole(['adati']), checkInvoieID, async (req, res) => {
    const { invoiceId } = req.body;


    try {
        const invoice_data = await InvoiceModel.findOne({ _id: invoiceId });

        if (!invoice_data) {
            return res.status(400).send("No data found.");
        }

        const invoiceResponse = {
            bill_no: invoice_data.bill_no,

            vikretyache_nav: invoice_data.vikretyache_nav,
            kharedidarache_nav: invoice_data.kharedidarache_nav,
            shetkaryache_nav: invoice_data.shetkaryache_nav,
            chitti_no: invoice_data.chitti_no,
            patti_no: invoice_data.patti_no,
            katevala_no: invoice_data.katevala_no,
            haste: invoice_data.haste,
            arr_malacha_tapshil: invoice_data.arr_malacha_tapshil.map(item => ({
                malacha_prakar: item.malacha_prakar,
                nag: item.nag,
                vajan_malacha_tapshil: {
                    pote: item.vajan_malacha_tapshil.pote,
                    chungde_kilo: item.vajan_malacha_tapshil.chungde_kilo,
                    bharati_kilo: item.vajan_malacha_tapshil.bharati_kilo,
                    ekun_vajan_quintal_kilo: item.vajan_malacha_tapshil.ekun_vajan_quintal_kilo
                },
                dar_prati_quintal_rupaye: item.dar_prati_quintal_rupaye,
                aakar: item.aakar,

            })), kharidi: {
                market_feechi_rakkam: item.kharidi.market_feechi_rakkam || 0,
                market_nirikshan_kharch: item.kharidi.market_nirikshan_kharch || 0,
                levi: item.kharidi.levi || 0,
                adat: item.kharidi.adat || 0,
                cgst: item.kharidi.cgst || 0,
                sgst: item.kharidi.sgst || 0,
                ekun_yene_rakkam: item.kharidi.ekun_yene_rakkam || 0
            },
            shetkari: {
                hamali: item.shetkari.hamali || 0,
                tolai: item.shetkari.tolai || 0,
                kata: item.shetkari.kata || 0,
                varfer: item.shetkari.varfer || 0,
                pakhadani: item.shetkari.pakhadani || 0,
                prat_fee: item.shetkari.prat_fee || 0,
                ekun_rakkam: item.shetkari.ekun_rakkam || 0
            }
        };

        kharidi_chitti_invoice_response = {
            'vikretyache_nav': invoice_data.vikretyache_nav,
            'kharedidarache_nav': invoice_data.kharedidarache_nav,
            'chitti_no': invoice_data.chitti_no,
            'katevala_no': invoice_data.katevala_no,
            'haste': invoice_data.haste,
            'kharidi': {
                'market_feechi_rakkam': invoice_data.kharidi.market_feechi_rakkam,
                'market_nirikshan_kharch': invoice_data.kharidi.market_nirikshan_kharch,
                'levi': invoice_data.kharidi.levi,
                'adat': invoice_data.kharidi.adat,
                'cgst': invoice_data.kharidi.cgst,
                'sgst': invoice_data.kharidi.sgst,
                'ekun_yene_rakkam': invoice_data.kharidi.ekun_yene_rakkam
            },
            'arr_malacha_tapshil': invoice_data.arr_malacha_tapshil.map(item => ({
                'malacha_prakar': item.malacha_prakar,
                'nag': item.nag,
                'vajan_malacha_tapshil': {
                    'pote': item.vajan_malacha_tapshil.pote,
                    'chungde_kilo': item.vajan_malacha_tapshil.chungde_kilo,
                    'bharati_kilo': item.vajan_malacha_tapshil.bharati_kilo,
                    'ekun_vajan_quintal_kilo': item.vajan_malacha_tapshil.ekun_vajan_quintal_kilo
                },
                'dar_prati_quintal_rupaye': item.dar_prati_quintal_rupaye,
                'aakar': item.aakar,
            }))
        };

        shetkari_patti_invoice_response = {
            'bill_no': invoice_data.bill_no,
            'vikretyache_nav': invoice_data.vikretyache_nav,
            'shetkaryache_nav': invoice_data.shetkaryache_nav,
            'patti_no': invoice_data.patti_no,
            'katevala_no': invoice_data.katevala_no,
            'haste': invoice_data.haste,
            'shetkari': {
                'hamali': invoice_data.shetkari.hamali,
                'tolai': invoice_data.shetkari.tolai,
                'kata': invoice_data.shetkari.kata,
                'varfer': invoice_data.shetkari.varfer,
                'pakhadani': invoice_data.shetkari.pakhadani,
                'prat_fee': invoice_data.shetkari.prat_fee,
                'ekun_rakkam': invoice_data.shetkari.ekun_rakkam
            },
            'arr_malacha_tapshil': invoice_data.arr_malacha_tapshil.map(item => ({
                'malacha_prakar': item.malacha_prakar,
                'nag': item.nag,
                'vajan_malacha_tapshil': {
                    'pote': item.vajan_malacha_tapshil.pote,
                    'chungde_kilo': item.vajan_malacha_tapshil.chungde_kilo,
                    'bharati_kilo': item.vajan_malacha_tapshil.bharati_kilo,
                    'ekun_vajan_quintal_kilo': item.vajan_malacha_tapshil.ekun_vajan_quintal_kilo
                },
                'dar_prati_quintal_rupaye': item.dar_prati_quintal_rupaye,
                'aakar': item.aakar,
            }))
        };


        return res.status(200).send(invoiceResponse);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});


adatiRoute.post("/post_product_data",authMiddleware,checkRole(['adati']),async(req,res)=>{

    const {bill_no , shetkaryache_nav,patti_no,mobile_no}=req.body

    const currentDate = new Date();

    // Format the date with date, time, and AM/PM indicator
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(currentDate);

   console.log(req.body)
    try {

            const new_shetkari =await new ProductDetailsModel({shetkaryache_products_details:[
                {...req.body,entry_date:formattedDate}
            ]})
            //    console.log(shetkari)
            await new_shetkari.save()
           res.status(200).send(new_shetkari)
        //    }
           
        } catch (error) {
        res.status(200).send({err:error.message})
        
    }
})

adatiRoute.post("/update_product_data/:shetkari_ID",authMiddleware,checkRole(['adati']),async(req,res)=>{

    const {shetkari_ID} = req.params

    try {
        const productDetails = await ProductDetailsModel.findOne({
            'shetkaryache_products_details.shetkari_ID': shetkari_ID,
          })
          res.status(200).send(productDetails)
        } catch (error) {
        res.status(200).send({err:error.message})
        
    }
})
// update the stocks 

adatiRoute.patch("/update_adati_stocks/:adati_ID",authMiddleware,checkRole(['adati']),async(req,res)=>{
    const {adati_ID} = req.params
    // console.log(adati_ID)

    try {
        const adati = await UserModel.findOne({_id:adati_ID})

        if(!adati){
            res.status(400).send({err:"adati does not exist"})
        }else{

            const updated_adati = await UserModel.findByIdAndUpdate(adati_ID,req.body)
            
            res.status(200).send({msg:"adati stock updated successfully..."})


        }
    
        // res.status(200).send({adati_ID})
    } catch (error) {
        res.status(400).send({err:error.message})
        
    }

})


// market  Route
adatiRoute.get("/get_price_details", authMiddleware, checkRole(['adati']), async (req, res) => {
    const  {market_name}=req.body
 let m_name= market_name.toLowerCase()
     try {
 
         const market_rates = await MarketModel.findOne({ market_name:m_name })
      
 
         res.status(200).send({ market_rates })
     } catch (error) {
 
         res.status(400).send({ err: error.message })
     }
 })


//  add shetkari

adatiRoute.post("/add_shetkari",authMiddleware,checkRole(['adati']),async(req,res)=>{
         const {mobile_no} = req.body
// console.log(mobile_no)
         try {
            
           const shetkari = await ShetkariModel.find({mobile_no})
           
           if(shetkari.length>0){
              res.status(400).send("shetkari already exist...!")
            }else{
                
            const newShetkari = await new ShetkariModel(req.body)
            const savedShetkari= await newShetkari.save()

                res.status(200).send({msg:"shetkari added successfully...",savedShetkari})
           
            }
            
            
        } catch (error) {
             res.status(400).send({err:error.message})
         }
    })

adatiRoute.get("/get_shetkari_data",authMiddleware,checkRole(['adati']),async(req,res)=>{

    try {
        const all_shetkari = await ShetkariModel.find()
        res.status(200).send(all_shetkari)
    } catch (error) {
        res.status(400).send({err:error.message})
        
    }
})


module.exports = adatiRoute


// product payload

// {
//     "adati_ID": "64f8675db4e6b9e276549995",
//     "shetkaryache_nav": "cchagan mokate",
//     "mobile_no": 5555555555,
//     "patti_no": 101,
//     "arr_malacha_tapshil": [
//       {
//         "malacha_prakar": "तूर",
//         "nag": 13,
//         "vajan_malacha_tapshil": {
//           "pote": 13,
//           "chungde_kilo": 18,
//           "bharati_kilo": 50,
//           "ekun_vajan_quintal_kilo": 6.68
//         },
//         "dar_prati_quintal_rupaye": 1200,
//         "aakar": 8016
//       },
//       {
//         "malacha_prakar": "ज्वारी",
//         "nag": 10,
//         "vajan_malacha_tapshil": {
//           "pote": 10,
//           "chungde_kilo": 18,
//           "bharati_kilo": 50,
//           "ekun_vajan_quintal_kilo": 2.0
//         },
//         "dar_prati_quintal_rupaye": 1500,
//         "aakar": 10020
//       }
//     ],
//     "isSold": false,
//     "exit_date": null
//   }



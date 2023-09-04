const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { checkRole } = require('../middleware/checkRole.middleware')
const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const InvoiceModel = require('../model/invoce.model')
const checkInvoieID = require('../middleware/invoice.middleware')
require('dotenv').config()

const adatiRoute = express.Router()

adatiRoute.post('/post_form_data', authMiddleware, checkRole(['adati']), async (req, res) => {
    const { bill_no } = req.body
    // console.log(req.body)

    try {

        // const user = await UserModel.findOne({_id:req.body.userID})
        const user = await InvoiceModel.find({ bill_no })

        if (user.length > 0) {
            res.status(400).send({ msg: "invoice already genrated..." })
        } else {
            const newInvoice = await new InvoiceModel(req.body)
            const savedInvoice= await newInvoice.save()

            const invoiceToken = jwt.sign({invoiceId:savedInvoice._id},process.env.PRIVATE_KEY)
            res.status(200).send({ msg: "invoice saved sucessfully..." ,invoiceToken})


        }

        // res.status(200).send(req.body)

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

adatiRoute.get('/genrate_invoice',authMiddleware,checkRole(['adati']),checkInvoieID, async (req, res) => {

    let adat_invoice_response, kharidi_chitti_invoice_response ,shetkari_patti_invoice_response
    
    const {invoiceId} =req
    console.log(req.invoiceId)

    try {
        const invoice_data = await InvoiceModel.findOne({ _id: invoiceId  })
        // console.log(invoice_data)
        if (invoice_data) {
            //  console.log(invoice_data.[0].kharidi)
 
             adat_invoice_response = {
                bill_no: invoice_data?.bill_no,
                vikretyache_nav: invoice_data?.vikretyache_nav,
                kharedidarache_nav: invoice_data?.kharedidarache_nav,
                shetkaryache_nav: invoice_data?.shetkaryache_nav,
                chitti_no: invoice_data?.chitti_no,
                patti_no: invoice_data?.patti_no,
                katevala_no: invoice_data?.katevala_no,
                haste: invoice_data?.haste,
                malacha_prakar: invoice_data?.malacha_prakar,
                nag: invoice_data?.nag,
                vajan_malacha_tapshil: {
                    pote: invoice_data?.vajan_malacha_tapshil?.pote,
                    chungde_kilo: invoice_data?.vajan_malacha_tapshil?.chungde_kilo,
                    bharati_kilo: invoice_data?.vajan_malacha_tapshil?.bharati_kilo,
                    ekun_vajan_quintal_kilo: invoice_data?.vajan_malacha_tapshil?.ekun_vajan_quintal_kilo
                },
                dar_prati_quintal_rupaye: invoice_data?.dar_prati_quintal_rupaye,
                aakar: invoice_data?.aakar,
            }
             kharidi_chitti_invoice_response = {
                vikretyache_nav: invoice_data.vikretyache_nav,
                kharedidarache_nav: invoice_data.kharedidarache_nav,
                chitti_no: invoice_data.chitti_no,
                katevala_no: invoice_data.katevala_no,
                haste: invoice_data.haste,
                malacha_prakar: invoice_data.malacha_prakar,
                nag: invoice_data.nag,
                vajan_malacha_tapshil: {
                    pote: invoice_data.vajan_malacha_tapshil.pote,
                    chungde_kilo: invoice_data.vajan_malacha_tapshil.chungde_kilo,
                    bharati_kilo: invoice_data.vajan_malacha_tapshil.bharati_kilo,
                    ekun_vajan_quintal_kilo: invoice_data.vajan_malacha_tapshil.ekun_vajan_quintal_kilo
                },
                dar_prati_quintal_rupaye: invoice_data.dar_prati_quintal_rupaye,
                aakar: invoice_data.aakar,
                kharidi: {
                    market_feechi_rakkam: invoice_data.kharidi.market_feechi_rakkam,
                    market_nirikshan_kharch: invoice_data.kharidi.market_nirikshan_kharch,
                    levi: invoice_data.kharidi.levi,
                    adat: invoice_data.kharidi.adat,
                    cgst: invoice_data.kharidi.cgst,
                    sgst: invoice_data.kharidi.sgst,
                    ekun_yene_rakkam: invoice_data.kharidi.ekun_yene_rakkam

                }
            }
             shetkari_patti_invoice_response = {
                bill_no: invoice_data.bill_no,
                vikretyache_nav: invoice_data.vikretyache_nav,
                shetkaryache_nav: invoice_data.shetkaryache_nav,
                patti_no: invoice_data.patti_no,
                katevala_no: invoice_data.katevala_no,
                haste: invoice_data.haste,
                malacha_prakar: invoice_data.malacha_prakar,
                nag: invoice_data.nag,
                vajan_malacha_tapshil: {
                    pote: invoice_data.vajan_malacha_tapshil.pote,
                    chungde_kilo: invoice_data.vajan_malacha_tapshil.chungde_kilo,
                    bharati_kilo: invoice_data.vajan_malacha_tapshil.bharati_kilo,
                    ekun_vajan_quintal_kilo: invoice_data.vajan_malacha_tapshil.ekun_vajan_quintal_kilo
                },
                dar_prati_quintal_rupaye: invoice_data.dar_prati_quintal_rupaye,
                aakar: invoice_data.aakar,
                shetkari: {
                    hamali: invoice_data.shetkari.hamali,
                    tolai: invoice_data.shetkari.tolai,
                    kata: invoice_data.shetkari.kata,
                    varfer: invoice_data.shetkari.varfer,
                    pakhadani: invoice_data.shetkari.pakhadani,
                    prat_fee: invoice_data.shetkari.prat_fee,
                    ekun_rakkam: invoice_data.shetkari.ekun_rakkam

                }
            }
            res.status(200).send({adat_invoice_response,kharidi_chitti_invoice_response,shetkari_patti_invoice_response})
        }else{

            res.status(400).send("no getting data...")
        }
        // console.log(invoice_data)

        // res.status(200).send(adat_invoice_response,kharidi_chitti_invoice_response,shetkari_patti_invoice_response)

    } catch (error) {

        res.status(400).send({ err1: error.message })
    }
})

adatiRoute.post("/post_from_kharidi_info",authMiddleware,checkRole(['adati']),async(req,res)=>{

    // const 
})

module.exports = adatiRoute


// {
//     "bill_no": 123,
//         "vikretyache_nav": "ganesh",
//             "kharedidarache_nav": "mahesh",
//                 "shetkaryache_nav": "chagan",
//                     "chitti_no": 12345,
//                         "patti_no": 23456,
//                             "katevala_no": 13,
//                                 "haste": "balu",
//                                     "malacha_prakar": "ज्वारी",
//                                         "nag": 13,
//                                             "vajan_malacha_tapshil": {
//         "pote": 13,
//             "chungde_kilo": 18,
//                 "bharati_kilo": 50,
//                     "ekun_vajan_quintal_kilo": 6.67
//     },
//     "dar_prati_quintal_rupaye": 1740,
//         "aakar": 11605.8,
//             "kharidi": {
//         "market_feechi_rakkam": 116,
//             "market_nirikshan_kharch": 24,
//                 "levi": 18,
//                     "adat": 12,
//                         "cgst": 0,
//                             "sgst": 0,
//                                 "ekun_yene_rakkam": 11775
//     },
//     "shetkari": {
//         "hamali": 8,
//             "tolai": 12,
//                 "kata": 6,
//                     "varfer": 8,
//                         "pakhadani": 0,
//                             "prat_fee": 0,
//                                 "ekun_rakkam": 11571
//     }
// }
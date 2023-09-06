const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { checkRole } = require('../middleware/checkRole.middleware')
const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const InvoiceModel = require('../model/invoice.model')
const checkInvoieID = require('../middleware/invoice.middleware')
const FromKharidiModel = require('../model/fromKharidi.model')
const FromShetkariModel = require('../model/fromShetkari.model')
require('dotenv').config()

const adatiRoute = express.Router()

adatiRoute.post('/post_form_data', authMiddleware, checkRole(['adati']),  async (req, res) => {
    const { bill_no } = req.body

    try {

        // const user = await UserModel.findOne({_id:req.body.userID})
        const user = await InvoiceModel.find({ bill_no })

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
            //    const  entry_date = Date.now()
            //    console.log(req.body.entry_date)
            const newInvoice = await new InvoiceModel({...req.body,entry_date:formattedDate})
            const savedInvoice = await newInvoice.save()

            console.log(savedInvoice)
            // const invoiceToken = jwt.sign({ invoiceId: savedInvoice._id ,bill_no: savedInvoice.bill_no }, process.env.PRIVATE_KEY)
            // res.status(200).send({ msg: "invoice saved sucessfully...", invoiceToken})
            res.status(200).send({ msg: "invoice saved sucessfully..." })


        }

        // res.status(200).send(req.body)

    } catch (error) {
        res.status(400).send({ err: error.message })
    }

})

adatiRoute.get('/genrate_invoice', authMiddleware, checkRole(['adati']), checkInvoieID, async (req, res) => {
    const { invoiceId } = req;

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
                kharidi: {
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
            }))
        };

        return res.status(200).send(invoiceResponse);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});


adatiRoute.get("/get_price_details", authMiddleware, checkRole(['adati']), async (req, res) => {
    const kId = "64f5b4c86bfec3a18fab8eb2"
    const sId = "64f5ba430012de0737db9e0d"
    try {
        const chitti_chargess = await FromKharidiModel.findOne({ _id: kId })
        const patti_charges = await FromShetkariModel.findOne({ _id: sId })

        res.status(200).send({ chitti_chargess, patti_charges })
    } catch (error) {

        res.status(400).send({ err: error.message })
    }
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
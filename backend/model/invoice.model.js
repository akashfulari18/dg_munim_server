const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    entry_date: { type: String, required: true },
    bill_no: { type: String, required: true, unique: true },
    vikretyache_nav: { type: String, required: true },//विक्रेत्याचे_नाव
    kharedidarache_nav: { type: String },//खरेदीदाराचे_नाव
    shetkaryache_nav: { type: String, required: true },//शेतकऱ्याचे_नाव
    chitti_no: { type: Number, required: true, unique: true },//चिठ्ठी_नंबर
    patti_no: { type: Number, required: true, unique: true },//पट्टी_नंबर
    katevala_no: { type: Number, required: true },//काटेवाला_नंबर
    haste: { type: String, required: true },//हस्ते
    arr_malacha_tapshil: [
        {
            malacha_prakar: { type: String, required: true },//मालाचा_प्रकार
            nag: { type: Number, required: true },//नग
            vajan_malacha_tapshil: {
                pote: { type: Number, required: true },//पोते
                chungde_kilo: { type: Number, required: true }, //चुगंडे_किलो
                bharati_kilo: { type: Number, required: true },//भरती_किलो
                ekun_vajan_quintal_kilo: { type: Number, required: true },//एकूण_वजन_क्विंटल_किलो
            },//वजन_मालाची_तपशील
            dar_prati_quintal_rupaye: { type: Number, required: true },//दर_प्रति_क्विंटल_रुपये
            aakar: { type: Number, required: true },//आकार,
        },
    ],
    kharidi: {
        malachi_ekun_rakkam: Number,
        market_feechi_rakkam: Number,
        market_nirikshan_kharch: Number,
        levi: Number,
        adat: Number,
        cgst: Number,
        sgst: Number,
        ekun_yene_rakkam: Number
    },
    shetkari: {
        rakkam: Number,
        hamali: Number,
        tolai: Number,
        kata: Number,
        varfer: Number,
        pakhadani: Number,
        prat_fee: Number, vaja_ekun_rakkam: Number,
        ekun_rakkam: Number
    }
})

const InvoiceModel = mongoose.model('invoice', invoiceSchema)

module.exports = InvoiceModel
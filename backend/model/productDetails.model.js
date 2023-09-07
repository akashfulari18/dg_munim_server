const mongoose = require('mongoose') 

const productDetailsSchema= mongoose.Schema({
    shetkaryache_products_details: [
        {
            adati_ID: String,
            shetkari_ID:String,
            entry_date: Date,//if there will be a case like same farmer is adding new product then for that we should be creating array 
            patti_no: { type: Number, required: true, unique: true },
            arr_malacha_tapshil: [
                {
                    malacha_prakar: { type: String, required: true },
                    nag: { type: Number, required: true },
                    vajan_malacha_tapshil: {
                        pote: { type: Number, required: true },
                        chungde_kilo: { type: Number, required: true },
                        bharati_kilo: { type: Number, required: true },
                        ekun_vajan_quintal_kilo: { type: Number, required: true }
                    },
                    dar_prati_quintal_rupaye: { type: Number },
                    aakar: { type: Number, },
                    isSold: { type: Boolean },
                    exit_date: Date
                },
            ],
        },
    ]
})

const ProductDetailsModel = mongoose.model("product_detail",productDetailsSchema)

module.exports=ProductDetailsModel
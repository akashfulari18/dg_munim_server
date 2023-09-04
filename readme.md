
<!-- COMMAM APIs -->


<!-- login [POST request] -->
[http://localhost:5000/api/user/login]

admin login credentials={
    "username":"akash",
    "password":"akash"
}

<!-- lgoout for all [POST rquest] -->
['http://localhost:5000/logout]

<!-- refresh token [POST request] -->
['http://localhost:5000/refresh_token']


<!-- ADMIN APIs -->

<!-- admin ->add_user [POST request] -->
[http://localhost:5000/admin/add_user]

<!--admin inactivate api [DELETE request]-->
[http://localhost:5000/admin/delete_user/:id]

<!-- admin update api [PATCH request] -->
[http://localhost:5000/admin/update_user/:id]


<!-- ADATI APIs -->

<!-- to post a form data [POST request] -->
[http://localhost:5000/adati/get_form_data/]

<!-- to get invoices [GET request] -->
[http://localhost:5000/adati/genrate_invoice/:id]






//payload schema
{
"bill_no": 123,
    "vikretyache_nav": "gk-21,
    "kharedidarache_nav": "sk bbk",
    "shetkaryache_nav": "chagan",
    "chitti_no": 12345,
    "patti_no": 23456,
    "katevala_no": 13,
    "haste": "balu",
    "malacha_prakar": "ज्वारी",
    "nag": 13,
    "vajan_malacha_tapshil": {
        "pote": 13,
        "chungde_kilo": 18, 
        "bharati_kilo": 50,
        "ekun_vajan_quintal_kilo":6.67
    },
    "dar_prati_quintal_rupaye":1740,
    "aakar":11690
}

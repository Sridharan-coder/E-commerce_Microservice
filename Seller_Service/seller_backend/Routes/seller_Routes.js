
const express = require("express");
const {addSeller, updateSeller, deleteSeller, getSeller, sellerLogin} = require("../Controllers/seller_Controller");
const { SendingTheMail } = require("../Controllers/mailSender");

const router=express.Router()

router.get("/seller/sellerDetails/:s_id",getSeller)

router.post("/seller/createSeller",addSeller)

router.put("/seller/updateSeller/:s_id",updateSeller)

router.delete("/seller/deleteSeller/:s_id",deleteSeller)

router.post("/seller/sellerLogin",sellerLogin)


router.post("/seller/sendEmail",SendingTheMail)


module.exports=router;
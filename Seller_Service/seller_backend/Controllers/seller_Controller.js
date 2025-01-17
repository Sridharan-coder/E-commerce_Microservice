
const {createSeller, updateSellerDetails, deleteSellerDetails, getSellerDetails, getSellerLogin } = require("../Services/seller_Services");

const errorHandler = async (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};


const addSeller = async (req, res, next) => {
  try {
    const sellerInfo = req.body;
    const s_id = Math.floor(Math.random() * 10000)
    sellerInfo["s_id"] = s_id;
    await createSeller(sellerInfo);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      success: true,
      message: "Seller added successfully!"
    });
  } catch (error) {
    next(error);
  }
}

const updateSeller = async (req, res, next) => {
  try {
    const inputData = req.body;
    const s_id = Number(req.params["s_id"]);

    await updateSellerDetails(s_id, inputData);
    res.status(200).json({
      success: true,
      msg: "Seller updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteSeller = async (req, res, next) => {
  try {
    const s_id = Number(req.params["s_id"]);

    await deleteSellerDetails(s_id);
    res.status(200).json({
      success: true,
      msg: "Seller removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

const getSeller = async (req, res, next) => {
  try {
    const s_id = Number(req.params["s_id"]);

    const seller = await getSellerDetails(s_id);
    res.status(200).json({
      success: true,
      msg: "Seller Fetched successfully",
      seller
    });
  } catch (error) {
    next(error);
  }
}

const sellerLogin = async (req, res, next) => {
  try {
    const s_emailAddress = req.body.s_emailAddress;

    const seller = await getSellerLogin(s_emailAddress);


    if (seller && seller.s_password === req.body.s_password) {

      res.status(200).json({
        success: true,
        message: "Login successfully",
        seller
      });
    }
    else {
      res.status(404).json({
        success: true,
        message: "UserName or Password was incorrect"
      });
    }


  } catch (error) {
    next(error);
  }

}


module.exports = {
  errorHandler,
  addSeller,
  updateSeller,
  deleteSeller,
  getSeller,
  sellerLogin
}
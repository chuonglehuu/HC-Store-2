import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase/config";
import ConfirmAddress from "../Product/ConfirmAddress";
import styles from "./ProductDetail.module.scss";

const cx = classNames.bind(styles);

const ProductImage = styled("img")({
  width: "100%",
  height: "auto",
  border: "1px solid #ccc",
});

const ProductDetails = styled("div")({
  padding: "16px",
});

const ProductName = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "8px",
});

const ProductCategory = styled(Typography)({
  color: "gray",
  marginBottom: "8px",
});

const ProductPrice = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
});

const OldPrice = styled(Typography)({
  fontSize: "20px",
  marginLeft: "24px",
  fontStyle: "italic",
  color: "gray",
  textDecoration: "line-through",
});

const ProductDetail = () => {
  const location = useLocation();
  const { user, userDetail, role } = UserAuth();

  const [products, setProducts] = useState([]);
  const [openConfirmAddress, setOpenConfirmAddress] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [userNameBuy, setUserNameBuy] = useState("");
  const [productNameBuy, setProductNameBuy] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState();

  const navigate = useNavigate();

  const product = location.state;

  useEffect(() => {
    onSnapshot(collection(db, "products"), async (snapshot) => {
      const temp = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const id = doc.id;

        if (data.url_img) {
          const url = await getDownloadURL(
            ref(storage, `products/${data.url_img}`)
          );

          temp.push({ ...data, id, url_img: url });
        }
        if (!data.url_img) {
          temp.push({ ...data, id });
        }
      }

      const filterProducts = temp
        .filter((item) => item.id !== product.id)
        .slice(0, 3);
      setProducts(filterProducts);
    });
  }, [product]);

  const handleOpenConfirmAddress = (
    emailUser,
    userName,
    productName,
    productPrice
  ) => {
    setOpenConfirmAddress(true);
    setEmailUser(emailUser);
    setUserNameBuy(userName);
    setProductNameBuy(productName);
    setProductPriceBuy(productPrice);
  };

  function handleCloseAdd() {
    setOpenConfirmAddress(false);
  }

  return (
    <Box sx={{ display: "flex", marginTop: "24px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ProductImage src={product.url_img} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductDetails>
            <ProductName variant="h5">{product.name}</ProductName>
            <ProductCategory variant="body1">
              <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
              {product.type}
            </ProductCategory>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ProductPrice variant="h6">
                {Number(product.new_price).toLocaleString("en-US")} VNĐ
              </ProductPrice>
              <OldPrice>
                {Number(product.old_price).toLocaleString("en-US")} VNĐ
              </OldPrice>
            </Grid>
            {(role === 2 || userDetail.role === 2) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (user && user.providerData.length) {
                    handleOpenConfirmAddress(
                      user.providerData[0].email || userDetail.email || "",
                      user.providerData[0].displayName ||
                        userDetail.fullname ||
                        "",
                      product.name,
                      product.new_price
                    );
                  }
                }}
              >
                Buy
              </Button>
            )}
          </ProductDetails>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Other Information</Typography>
          <Typography variant="body1">{product.description}</Typography>
        </Grid>

        <Grid container spacing={2} mt={4} sx={{ paddingLeft: "16px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Similar products
            </Typography>
          </Grid>
          {products.map((ele) => (
            <Grid
              onClick={() =>
                navigate("/product/detail", {
                  state: ele,
                })
              }
              item
              xs={4}
              key={ele.id}
              sx={{
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                  cursor: "pointer",
                },
                paddingRight: "8px",
                paddingBottom: "8px"
              }}
            >
              <img
                src={ele.url_img}
                alt="Sản phẩm 1"
                style={{ width: "100%", height: 200 }}
              />
              <Typography variant="subtitle1" mt={2}>
                {ele.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                {ele.type}
              </Typography>
              <Typography variant="h6" mt={1}>
                {Number(ele.new_price).toLocaleString("en-US")}
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                <div className={cx("style-display")}>{ele.description}</div>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog
        open={openConfirmAddress}
        onClose={() => {
          handleCloseAdd();
        }}
      >
        <ConfirmAddress
          setOpen={setOpenConfirmAddress}
          emailUser={emailUser}
          userName={userNameBuy}
          productName={productNameBuy}
          productPrice={productPriceBuy}
        />
      </Dialog>
    </Box>
  );
};

export default ProductDetail;

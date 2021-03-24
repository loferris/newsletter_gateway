require("dotenv");
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SK);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Stripe Hello World!",
  });
});

//customer object

//create new customer
router.post("/newCustomer", async (req, res) => {
  try {
    const newCustomer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name
    });
  return res.status(200).send({
    customerId: customer.id,
    customerEmail: customer.email,
    customerName: customer.name
  });
  } catch (error) {
    return res.status(400).send({ Error: error.raw.message })
  }
});

//read customer metadata
router.get("/customers/:id", (req, res) => {
//retrieve
  const customerProfile = await stripe.customers.retrieve(req.body.cust_id);
});

//list all customers
router.get("/customers/", (req, res) => {
  const listCustomers = await stripe.customers.list({
    limit: 100
  });
}) 

//update customer
router.post("/customers/:id", (req, res) => {
//update
  const updateCustomer = await stripe.customers.update(
    req.body.cust_id,
    {...req.body.cust_info}
  );
});

//delete customer
router.delete("/customers/:id", (req, res) => {
//delete
  const deleteCustomer = await stripe.customers.delete(req.body.cust_id);
});

//card object
//create card
router.post("/customers/:id/sources", (req, res) => {
  const newCard = await stripe.customers.createSource(
    req.body.cust_id,
    {source: req.body.src}
  );

  const newToken = await stripe.tokens.create({
    card: {
      number: req.body.card_info.number,
      exp_month: req.body.card_info.exp_month,
      exp_year: req.body.card_info.exp_year,
      cvc: req.body.card_info.cvc
    }
  })
});

//show card metadata
router.get("customers/:id/sources/:id", (req, res) => {
  const cardProfile = await stripe.customers.retrieveSource(
    req.body.cust_id,
    req.body.card_id
  );
});

//list credit cards
router.get("customers/:id/sources?object=card", (req, res) => {
  const listCards = await stripe.customers.listSources(
    req.body.cust_id,
    {object: "card", limit: 10}
  )
});

//update card

router.post("customers/:id/sources/:id", (req, res) => {
  const updateCard = await stripe.customers.updateSource(
    req.body.cust_id,
    req.body.card_id,
    {...req.body.card_info}
  );
});

//delete card

router.delete("customers/:id/sources/:id", (req, res) => {
  const deleteCard = await stripe.customers.delete(
    req.body.cust_id,
    req.body.card_id
  );
});

//charges

module.exports = router;

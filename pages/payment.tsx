import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useTypedSelector } from "../store/index";
import { selectUsers } from "../store/usersSlice";

const elemOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PaymentForm = () => {
  const router = useRouter();

  const { userInfo } = useTypedSelector(selectUsers);

  const [paying, setpaying] = useState(false);
  const [productId, setproductId] = useState("prod_MgsHBTkR1JAr7c");

  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      //create order
      //   const { data: orderId } = await axios.post("/api/order", {
      //     // yourCart,
      //     userInfo,
      //   });
      //pay
      const cardElement = elements!.getElement(CardNumberElement);

      const paymentMethodReq = await stripe!.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: { name: "MG Costumer" },
      });
      const {
        data: { message, subscriptionId, clientSecret },
      } = await axios.post("/api/subscribe", {
        // orderId,
        id: userInfo!._id,
        name: userInfo!.name,
        email: userInfo!.email,
        paymentMethod: paymentMethodReq.paymentMethod!.id,
        productId,
      });

      console.log(clientSecret);
      const { error } = await stripe!.confirmCardPayment(clientSecret);

      //TODO Send Error messages

      if (error) {
        console.log("[error]", error);
        {
          /* dispatch({
                    type: "PAYMENT_FAILED",
                }); */
        }
      } else {
        // const { data } = await axios.post("/api/send", {
        //   userInfo,
        //   // yourCart,
        // });

        // dispatch(clearCart());
        router.push("/protected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const productsList = [
    {
      name: "guitar course",
      id: "prod_MgsHYsCjHi90iO",
    },
    {
      name: "Gym Pro Package",
      id: "prod_MgsHBTkR1JAr7c",
    },
    {
      name: "Premium Plan",
      id: "prod_MgsGOzGRz8ylF6",
    },
  ];

  console.log(productId);

  return (
    <>
      {productsList.map((item, index) => (
        <RadioWrapp key={index}>
          <label
            htmlFor={`#${index}`}
            className={`${productId == item.id ? "active" : null}`}
          >
            <input
              type="radio"
              name="option"
              value={index}
              checked={productId == item.id}
              id={`#${index}`}
              onChange={() => {
                setproductId(productsList[index].id);
              }}
            />
            <div>{item.name}</div>
            <div>{`${
              "productId" == "productId" ? "Selected" : "CHANGE TO THIS"
            }`}</div>
          </label>
        </RadioWrapp>
      ))}
      <Form onSubmit={handleSubmit}>
        {paying ? (
          <Loading>
            <h4>Connecting to your Bank...</h4>
            <div />
          </Loading>
        ) : null}
        <Label htmlFor="name">Full Name</Label>
        <Name
          id="name"
          placeholder="João Ninguém"
          style={{ mixBlendMode: "initial" }}
        />

        <Label htmlFor="cardNumber">
          Card Number (use: 4242 4242 4242 4242)
        </Label>
        <CardNumberElementStyled id="cardNumber" options={elemOptions} />

        <div>
          <div>
            <Label htmlFor="expiry">Card Expiration (use 12/33)</Label>
            <CardExpiryElementStyled id="expiry" options={elemOptions} />
          </div>

          <div>
            <Label htmlFor="cvc">CVC (use 123)</Label>
            <CardCvcElementStyled id="cvc" options={elemOptions} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!stripe}
          onClick={() => setpaying(true)}
        >
          PAY
        </Button>
      </Form>
    </>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default PaymentForm;

const Form = styled.form`
  position: relative;
  max-width: 600px;
  margin: 10px auto;
  margin-bottom: 50px;
  padding: 20px;

  background: white;
  box-shadow: 1px 1px 15px hsla(240, 50%, 50%, 0.1);
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    width: 100%;

    div {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: space-between;
    }
  }
`;

const Label = styled.label`
  padding: 24px 0px 4px 2px;

  align-self: start;
`;

const RadioWrapp = styled.div`
  label {
    padding: 24px 0px 4px 2px;

    align-self: start;
  }
  .active {
    background: blue;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 600px;
  height: 50px;
  margin: 20px auto;

  background: hsla(340, 100%, 50%, 1);
  background-image: linear-gradient(
    hsla(335, 100%, 50%, 1),
    hsla(345, 100%, 50%, 1)
  );
  box-shadow: 1px -1px 4px hsla(240, 50%, 0%, 0.3);
  border-radius: 5px;
  border: none;
  color: white;
`;

const Name = styled.input`
  width: 100%;

  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;

  font-size: 18px;

  letterspacing: 0.025em;
  ::placeholder {
    color: #aab7c4;
  }
  :focus {
    border-color: hsla(10, 85%, 51%, 1);
  }
`;

const CardNumberElementStyled = styled(CardNumberElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;

  :focus {
    color: hsla(10, 85%, 51%, 1);
  }
`;

const CardExpiryElementStyled = styled(CardExpiryElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;
`;

const CardCvcElementStyled = styled(CardCvcElement)`
  width: 100%;
  border: 1px solid hsla(0, 0%, 70%, 1);
  border-radius: 5px;
  padding: 5px;
`;

const Loading = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;

  background: hsla(290, 100%, 0%, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 5px;

  z-index: 3;

  display: flex;
  flex-direction: column;
  place-items: center;

  h4 {
    padding: 30px 0px;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    color: hsla(0, 0%, 100%, 1);
  }
`;
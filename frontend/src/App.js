import { useEffect } from "react";

const Product = ({ name, price }) => {
  const displayPaymentGateway = async () => {
    const data = await fetch("http://localhost:3001/razorpay", {
      method: "POST",
    }).then((res) => res.json());
    console.log(data);
    const options = {
      key: "rzp_test_ir7vJnMvVClur6",
      order_id: data.id,
      currency: data.currency,
      amount: data.amount,
      name: "TEst",
      description: "Wallet Transaction",
      image: "http://localhost:3001/logo.png",
      handler: function (response) {
        alert("PAYMENT ID ::" + response.razorpay_payment_id);
        alert("ORDER ID:" + response.razorpay_order_id);
      },
      prefill: {
        name: "Shivam bhaisn",
        email: "bhasinshivam2002@gmail.com",
        contact: "8076043379",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="bg-black/10 h-[400px] w-[350px] flex flex-col justify-evenly items-center ">
      <h1> Product Name: {name} </h1>
      <h1> Price: {price} </h1>
      <button
        className="p-4 bg-blue-800 text-white"
        onClick={displayPaymentGateway}
      >
        Purchase
      </button>
    </div>
  );
};

const Products = () => {
  return (
    <div className="flex flex-col items-center justify-evenly h-full">
      <h1 className="text-6xl font-bold ">Products</h1>
      <div className="flex flex-row justify-evenly">
        <Product name="Toothbrush" price="200" />
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    const laodScript = async () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.querySelector("body").appendChild(script);
      });
    };
    laodScript();
  }, []);

  return (
    <div className="App h-screen">
      <Products />
    </div>
  );
}

export default App;

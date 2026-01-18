import React, { useState } from "react";
import { ChevronLeft, CreditCard, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cart, getTotalPrice, clearCart }) => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [paymentData, setPaymentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  // ================= VALIDATION =================
  const validateForm = () => {
    if (
      !paymentData.firstName ||
      !paymentData.lastName ||
      !paymentData.email ||
      !paymentData.phone ||
      !paymentData.address ||
      !paymentData.zipCode
    ) {
      return false;
    }

    if (paymentMethod === "card") {
      return (
        paymentData.cardNumber &&
        paymentData.cardName &&
        paymentData.expiryDate &&
        paymentData.cvv
      );
    }

    if (paymentMethod === "upi") {
      return paymentData.upiId;
    }

    return true;
  };

  // ================= RAZORPAY =================
  const handleRazorpayPayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // 🔴 add later
      amount: Math.round(getTotalPrice() * 1.1 * 100),
      currency: "INR",
      name: "FurniStyle",
      description: "Furniture Purchase",
      handler: function (response) {
        alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        clearCart();
        navigate("/");
      },
      prefill: {
        name: `${paymentData.firstName} ${paymentData.lastName}`,
        email: paymentData.email,
        contact: paymentData.phone,
      },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
      return;
    }

    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button
        onClick={() => navigate("/cart")}
        className="mb-6 text-blue-600 font-semibold flex items-center gap-2"
      >
        <ChevronLeft /> Back to Cart
      </button>

      <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ================= SHIPPING DETAILS ================= */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                placeholder="First Name *"
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setPaymentData({ ...paymentData, firstName: e.target.value })
                }
              />
              <input
                placeholder="Last Name *"
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setPaymentData({ ...paymentData, lastName: e.target.value })
                }
              />
            </div>

            <input
              placeholder="Email *"
              className="border rounded-lg px-4 py-2 w-full mb-4"
              onChange={(e) =>
                setPaymentData({ ...paymentData, email: e.target.value })
              }
            />

            <input
              placeholder="Mobile Number *"
              className="border rounded-lg px-4 py-2 w-full mb-4"
              onChange={(e) =>
                setPaymentData({ ...paymentData, phone: e.target.value })
              }
            />

            <textarea
              rows="3"
              placeholder="Full Address *"
              className="border rounded-lg px-4 py-2 w-full mb-4"
              onChange={(e) =>
                setPaymentData({ ...paymentData, address: e.target.value })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="City"
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setPaymentData({ ...paymentData, city: e.target.value })
                }
              />
              <input
                placeholder="Postal / PIN Code *"
                maxLength="6"
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setPaymentData({ ...paymentData, zipCode: e.target.value })
                }
              />
            </div>

            <p className="text-xs text-gray-500 mt-4">
              🔒 Your shipping details are safe and used only for delivery.
            </p>
          </div>

          {/* ================= PAYMENT METHOD ================= */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`px-4 py-2 border rounded ${
                  paymentMethod === "card" && "border-blue-600 bg-blue-50"
                }`}
              >
                <CreditCard className="inline mr-2" />
                Card
              </button>

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`px-4 py-2 border rounded ${
                  paymentMethod === "upi" && "border-blue-600 bg-blue-50"
                }`}
              >
                <Smartphone className="inline mr-2" />
                UPI
              </button>

              <button
                onClick={() => setPaymentMethod("razorpay")}
                className={`px-4 py-2 border rounded ${
                  paymentMethod === "razorpay" && "border-blue-600 bg-blue-50"
                }`}
              >
                Razorpay
              </button>
            </div>

            {paymentMethod === "card" && (
              <>
                <input
                  placeholder="Card Number"
                  className="border rounded-lg px-4 py-2 w-full mb-3"
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, cardNumber: e.target.value })
                  }
                />
                <input
                  placeholder="Card Holder Name"
                  className="border rounded-lg px-4 py-2 w-full mb-3"
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, cardName: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM/YY"
                    className="border rounded-lg px-4 py-2"
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, expiryDate: e.target.value })
                    }
                  />
                  <input
                    placeholder="CVV"
                    className="border rounded-lg px-4 py-2"
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, cvv: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <input
                placeholder="Enter UPI ID (example@upi)"
                className="border rounded-lg px-4 py-2 w-full"
                onChange={(e) =>
                  setPaymentData({ ...paymentData, upiId: e.target.value })
                }
              />
            )}

            {paymentMethod === "razorpay" && (
              <p className="text-gray-600">
                You will be redirected to Razorpay secure payment gateway.
              </p>
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

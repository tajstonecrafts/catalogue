import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Building, Banknote, ArrowRight, Printer, MessageCircle, Phone, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'INR' | 'USD';
  onOrderComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pinCode, setPinCode] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');

  // Simulated card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const subtotalINR = items.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const shippingFeeINR = deliverySpeed === 'express' ? 450 : 0;
  const shippingFeeUSD = deliverySpeed === 'express' ? 6 : 0;
  const totalINR = subtotalINR + shippingFeeINR;
  const totalUSD = subtotalUSD + shippingFeeUSD;

  const totalFormatted = currency === 'INR' ? `₹${totalINR.toLocaleString('en-IN')}` : `$${totalUSD}`;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!phone.trim() || phone.trim().length < 10) errors.phone = 'Valid 10-digit mobile number required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email address required';
    if (!street.trim()) errors.street = 'Street delivery address required';
    if (!city.trim()) errors.city = 'City required';
    if (!pinCode.trim() || pinCode.trim().length < 5) errors.pinCode = 'Valid postal / PIN code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `TSC-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        shippingAddress: {
          street,
          city,
          state,
          pinCode,
          country: 'India'
        },
        paymentMethod,
        items,
        subtotalINR,
        subtotalUSD,
        shippingFeeINR,
        shippingFeeUSD,
        totalINR,
        totalUSD
      };

      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep(4);
      onOrderComplete(order);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!confirmedOrder) return;
    const msg = encodeURIComponent(
      `Hello Taj Stone Crafts,\n` +
      `I have placed Order #${confirmedOrder.orderId} on your website:\n` +
      `Customer: ${confirmedOrder.customerName} (${confirmedOrder.customerPhone})\n` +
      `Shipping Address: ${confirmedOrder.shippingAddress.street}, ${confirmedOrder.shippingAddress.city}, ${confirmedOrder.shippingAddress.pinCode}\n` +
      `Total: ${currency === 'INR' ? '₹' + confirmedOrder.totalINR : '$' + confirmedOrder.totalUSD}\n` +
      `Payment: ${confirmedOrder.paymentMethod.toUpperCase()}\n` +
      `Please acknowledge and share crating status.`
    );
    window.open(`https://wa.me/918077801032?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#101622] border border-[#26354a] rounded-xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-[#0d121a] border-b border-[#1f2b3d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#c5a059]/20 flex items-center justify-center border border-[#c5a059]/40">
              <Lock className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-white tracking-wide">
                Secure Checkout · Taj Stone Crafts
              </h2>
              <span className="text-[11px] text-[#9ca3af]">Agra Workshop Direct · 256-Bit SSL Encrypted</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-md hover:bg-[#1a2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-[#121926] px-6 py-3 border-b border-[#1e2a3c] flex items-center justify-between text-xs text-[#94a3b8]">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#c5a059] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
            <span>Delivery Info</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#c5a059] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
            <span>Secure Payment</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-[#4ade80] font-semibold' : ''}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Address & Customer Details */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                1. Customer & Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#94a3b8] mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  {formErrors.name && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs text-[#94a3b8] mb-1">Mobile Number (For dispatch updates) *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  {formErrors.phone && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#94a3b8] mb-1">Email ID (For official invoice copy) *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram@example.com"
                  className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
                {formErrors.email && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs text-[#94a3b8] mb-1">Street Address / House / Apartment *</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Flat 402, Royal Palms, Taj East Gate Road"
                  className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
                {formErrors.street && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#94a3b8] mb-1">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Agra / New Delhi / Mumbai"
                    className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  {formErrors.city && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs text-[#94a3b8] mb-1">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Uttar Pradesh"
                    className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#94a3b8] mb-1">PIN / Postal Code *</label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="282001"
                    className="w-full bg-[#131b27] border border-[#243346] rounded px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                  {formErrors.pinCode && <p className="text-[11px] text-[#f87171] mt-1">{formErrors.pinCode}</p>}
                </div>
              </div>

              {/* Shipping Speed Selection */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                  Delivery Method (Insured Packaging)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySpeed('standard')}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      deliverySpeed === 'standard'
                        ? 'border-[#c5a059] bg-[#162130]'
                        : 'border-[#222f42] bg-[#111723] hover:border-[#2d3e56]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">Insured Wooden Crate Delivery</span>
                      <span className="text-xs font-bold text-[#4ade80]">FREE</span>
                    </div>
                    <p className="text-[11px] text-[#9ca3af]">Dispatches in 24-48 hrs. Delivered in 4-6 days.</p>
                  </div>

                  <div
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      deliverySpeed === 'express'
                        ? 'border-[#c5a059] bg-[#162130]'
                        : 'border-[#222f42] bg-[#111723] hover:border-[#2d3e56]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">Express Air Cargo Priority</span>
                      <span className="text-xs font-bold text-white tabular-nums">
                        {currency === 'INR' ? '+₹450' : '+$6'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9ca3af]">Priority air freight. Delivered in 48-72 hours.</p>
                  </div>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t border-[#1e2a3c] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-[#94a3b8] hover:text-white"
                >
                  Return to Cart
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] text-[#0d121a] font-bold text-sm rounded shadow-lg flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Options */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                  2. Select Secure Payment Method
                </h3>
                <span className="text-xs font-serif font-bold text-white">
                  Total Payable: <span className="text-[#c5a059]">{totalFormatted}</span>
                </span>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#c5a059] bg-[#182333] text-white'
                      : 'border-[#222e40] bg-[#101622] text-[#9ca3af] hover:border-[#2d3e56]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1.5 text-[#c5a059]" />
                  <span className="block text-xs font-semibold">UPI & QR</span>
                  <span className="text-[10px] text-[#64748b]">GPay, PhonePe, Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#c5a059] bg-[#182333] text-white'
                      : 'border-[#222e40] bg-[#101622] text-[#9ca3af] hover:border-[#2d3e56]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-[#c5a059]" />
                  <span className="block text-xs font-semibold">Cards</span>
                  <span className="text-[10px] text-[#64748b]">Visa, RuPay, Master</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#c5a059] bg-[#182333] text-white'
                      : 'border-[#222e40] bg-[#101622] text-[#9ca3af] hover:border-[#2d3e56]'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1.5 text-[#c5a059]" />
                  <span className="block text-xs font-semibold">NetBanking</span>
                  <span className="text-[10px] text-[#64748b]">All Indian Banks</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#c5a059] bg-[#182333] text-white'
                      : 'border-[#222e40] bg-[#101622] text-[#9ca3af] hover:border-[#2d3e56]'
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto mb-1.5 text-[#c5a059]" />
                  <span className="block text-xs font-semibold">Cash on Delivery</span>
                  <span className="text-[10px] text-[#64748b]">Pay at doorstep</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div className="p-4 rounded-lg bg-[#121926] border border-[#233144] space-y-4">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">Instant UPI Payment</span>
                      <span className="text-[#4ade80]">Zero Transaction Fee</span>
                    </div>

                    <div className="p-3 bg-[#0d121a] rounded border border-[#232f42] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] text-[#9ca3af] block">Official Workshop UPI ID:</span>
                        <span className="text-sm font-mono font-bold text-[#c5a059]">8077801032@okbizaxis</span>
                      </div>
                      <span className="text-xs bg-[#192434] px-2.5 py-1 rounded text-[#cbd5e1] border border-[#2a3a50]">
                        Taj Stone Crafts
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs text-[#9ca3af] mb-1">Or Enter Your VPA / UPI ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#94a3b8] mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 ···· ···· 8921"
                        className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#94a3b8] mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="08/29"
                          className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#94a3b8] mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2 text-xs">
                    <p className="text-[#cbd5e1]">Select Bank for Direct NetBanking:</p>
                    <select className="w-full bg-[#0d121a] border border-[#232f42] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]">
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-2 text-xs text-[#cbd5e1]">
                    <div className="flex items-center gap-2 text-[#facc15]">
                      <Banknote className="w-4 h-4" />
                      <span className="font-semibold">Cash on Delivery Available</span>
                    </div>
                    <p className="text-[#94a3b8] leading-relaxed">
                      Pay via cash or UPI to the courier delivery agent upon receiving your insured wooden crate. Our workshop will call your phone ({phone || 'your number'}) prior to dispatch to confirm order verification.
                    </p>
                  </div>
                )}
              </div>

              {/* Summary of Items */}
              <div className="p-3 bg-[#0d121a] rounded border border-[#1e2a3c] text-xs text-[#94a3b8] flex justify-between items-center">
                <span>Shipping to: <strong>{city || 'Agra'}, {pinCode}</strong></span>
                <span className="text-white font-medium">{items.length} artisan items</span>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 border-t border-[#1e2a3c] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-[#94a3b8] hover:text-white"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-7 py-3 bg-gradient-to-r from-[#b38a3d] to-[#c5a059] hover:from-[#c5a059] hover:to-[#dfba6a] text-[#0d121a] font-bold text-sm rounded shadow-lg flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Encrypting & Confirming...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Authorize {totalFormatted}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Invoice */}
          {step === 4 && confirmedOrder && (
            <div className="space-y-6 text-center sm:text-left">
              {/* Success Banner */}
              <div className="p-5 rounded-lg bg-[#0f241a] border border-[#1b4330] text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
                <h3 className="text-xl font-bold font-serif text-white">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-[#9ca3af]">
                  Your order reference is <strong className="text-white font-mono text-sm">{confirmedOrder.orderId}</strong>.
                  A digital invoice copy has been sent to <strong>{confirmedOrder.customerEmail}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-lg bg-[#0d121a] border border-[#1f2b3d] space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row justify-between border-b border-[#1b2535] pb-3 text-[#94a3b8]">
                  <div>
                    <span className="block text-[11px] text-[#64748b]">Order Placed With:</span>
                    <strong className="text-white font-serif text-sm">Taj Stone Crafts (Agra)</strong>
                    <span className="block text-[11px] text-[#9ca3af]">WhatsApp: 8077801032 · tajstonecrafts@gmail.com</span>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <span className="block text-[11px] text-[#64748b]">Order Date:</span>
                    <span className="text-white font-medium">{confirmedOrder.date}</span>
                    <span className="block text-[#4ade80]">Payment: {confirmedOrder.paymentMethod.toUpperCase()} (Confirmed)</span>
                  </div>
                </div>

                {/* Items itemized */}
                <div className="space-y-2">
                  <span className="font-semibold text-[#c5a059] block">Itemized Artisan Summary:</span>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[#cbd5e1] py-1 border-b border-[#161f2c]">
                      <div>
                        <span>{it.quantity}x {it.product.name}</span>
                        {it.personalizationNote && (
                          <span className="block text-[10px] text-[#facc15]">
                            Personalization: {it.personalizationNote}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-white tabular-nums">
                        {currency === 'INR'
                          ? `₹${(it.product.priceINR * it.quantity).toLocaleString('en-IN')}`
                          : `$${it.product.priceUSD * it.quantity}`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Total */}
                <div className="pt-2 border-t border-[#1b2535] space-y-1">
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Shipping Address:</span>
                    <span className="text-right text-white">
                      {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.pinCode}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#94a3b8]">
                    <span>Packaging & Insurance:</span>
                    <span className="text-[#4ade80]">Complimentary Solid Wood Crate</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1b2535]">
                    <span>Grand Total:</span>
                    <span className="text-[#c5a059] font-serif tabular-nums">
                      {currency === 'INR' ? `₹${confirmedOrder.totalINR.toLocaleString('en-IN')}` : `$${confirmedOrder.totalUSD}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions: WhatsApp confirmation & Print receipt */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendWhatsAppConfirmation}
                  className="flex-1 py-3 px-4 bg-[#0d281e] hover:bg-[#13382b] border border-[#1b4d3a] text-[#25D366] hover:text-white font-semibold text-xs sm:text-sm rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Details to WhatsApp (8077801032)</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="py-3 px-4 bg-[#141d2a] hover:bg-[#1c283a] border border-[#25354b] text-white text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#c5a059]" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3 px-4 bg-[#c5a059] hover:bg-[#dfba6a] text-[#0d121a] text-xs font-bold rounded transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

function Checkout({ items, total, formatPrice, onBack, onPlaceOrder, orderPlaced }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !contact.trim() || !address.trim() || !cashOnDelivery || items.length === 0) return;
    onPlaceOrder();
  };

  if (orderPlaced) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-[#ffe8f1] px-4 py-12 sm:px-8">
        <section className="mx-auto max-w-3xl rounded-[28px] border-2 border-[#9b8b92] bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fbe1e9] text-3xl text-[#a83f5b]">✓</div>
          <h1 className="mt-5 font-serif text-4xl font-bold italic">Thank you for your order!</h1>
          <p className="mt-3 text-sm text-[#796d73]">Your order has been placed successfully. This is a frontend demonstration; no payment or order has been sent to a server.</p>
          <button onClick={() => window.location.assign("/")} className="mt-7 rounded-xl bg-[#a83f5b] px-8 py-3 text-sm font-semibold text-white hover:bg-[#87334a]">Continue Shopping</button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#ffe8f1] px-4 pb-32 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center justify-between rounded-[28px] border-2 border-[#9b8b92] bg-white px-6 py-7 sm:px-8">
          <h1 className="font-serif text-4xl font-bold italic text-[#393438] sm:text-5xl">Checkout</h1>
          <button onClick={onBack} className="text-sm font-medium text-[#a83f5b] hover:underline">Back to cart</button>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="rounded-[26px] border-2 border-[#9b8b92] bg-white px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex items-start gap-4">
              <svg viewBox="0 0 24 24" className="mt-1 h-7 w-7 shrink-0 text-[#393438]" fill="currentColor">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.1 7 13 7 13s7-7.9 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-semibold text-[#51464c]">User Name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Enter your full name" className="w-full rounded-lg border border-[#b9aab1] px-4 py-3 text-sm outline-none focus:border-[#a83f5b] focus:ring-2 focus:ring-[#f6d3df]" />
                </label>
                <label className="block">
                  <span className="mb-2 block font-semibold text-[#51464c]">Contact Number</span>
                  <input value={contact} onChange={(event) => setContact(event.target.value)} required type="tel" placeholder="09XX XXX XXXX" className="w-full rounded-lg border border-[#b9aab1] px-4 py-3 text-sm outline-none focus:border-[#a83f5b] focus:ring-2 focus:ring-[#f6d3df]" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-semibold text-[#51464c]">User Address</span>
                  <textarea value={address} onChange={(event) => setAddress(event.target.value)} required rows={2} placeholder="House number, street, barangay, city, province" className="w-full resize-y rounded-lg border border-[#b9aab1] px-4 py-3 text-sm outline-none focus:border-[#a83f5b] focus:ring-2 focus:ring-[#f6d3df]" />
                </label>
              </div>
            </div>

            <div className="my-8 border-t border-[#c9bbc1]" />

            <div className="space-y-5">
              {items.length === 0 ? (
                <p className="py-6 text-center text-sm text-[#796d73]">No items selected. Return to your cart and select the flowers you want to order.</p>
              ) : items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 sm:gap-7">
                  <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32" />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-xl font-bold italic text-[#393438] sm:text-3xl">{item.name}</h2>
                    <p className="mt-1 font-serif font-bold text-[#a83f5b]">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <span className="shrink-0 text-sm text-[#51464c]">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-[#c9bbc1]" />

            <div>
              <h2 className="font-sans text-2xl font-bold text-[#393438] sm:text-3xl">Payment Method</h2>
              <label className="mt-4 flex w-fit cursor-pointer items-center gap-3 text-sm text-[#51464c]">
                <input type="checkbox" checked={cashOnDelivery} onChange={(event) => setCashOnDelivery(event.target.checked)} className="h-5 w-5 accent-[#a83f5b]" />
                Cash on Delivery
              </label>
              <p className="mt-2 text-xs text-[#8c7d84]">Payment is collected upon delivery. Online payment is not connected in this frontend demo.</p>
            </div>
          </section>

          <div className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[#9b8b92] bg-white px-4 py-4 sm:px-8">
            <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-4 sm:gap-6">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#8c7d84]">Order total</p>
                <p className="font-serif text-lg font-bold text-[#a83f5b] sm:text-xl">{formatPrice(total)}</p>
              </div>
              <button
                type="submit"
                disabled={items.length === 0 || !cashOnDelivery}
                className="rounded-xl bg-[#a83f5b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#87334a] disabled:cursor-not-allowed disabled:opacity-40 sm:px-9"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;

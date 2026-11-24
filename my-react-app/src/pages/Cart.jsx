function Cart({
  cart,
  onQuantityChange,
  onToggleItem,
  onToggleAll,
  onRemove,
  onContinueShopping,
  onCheckout,
  selectedTotal,
  selectedCount,
  formatPrice,
}) {
  const allSelected = cart.length > 0 && cart.every((item) => item.selected);

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#ffe8f1] px-4 pb-32 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 rounded-[28px] border-2 border-[#9b8b92] bg-white px-6 py-7 sm:px-8">
          <h1 className="font-serif text-4xl font-bold italic text-[#393438] sm:text-5xl">
            Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h1>
        </div>

        {cart.length === 0 ? (
          <section className="rounded-[28px] border-2 border-[#9b8b92] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe8f1] text-[#a83f5b]">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 3h2l2.5 12h11L21 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
              </svg>
            </div>
            <h2 className="mt-5 font-serif text-3xl font-bold italic">Your cart is empty</h2>
            <p className="mt-2 text-sm text-[#796d73]">Find a bouquet that says what words cannot.</p>
            <button onClick={onContinueShopping} className="mt-6 rounded-xl bg-[#a83f5b] px-7 py-3 text-sm font-semibold text-white hover:bg-[#87334a]">
              Continue Shopping
            </button>
          </section>
        ) : (
          <div className="space-y-5">
            {cart.map((item) => (
              <article key={item.id} className="flex min-h-[190px] flex-col gap-4 rounded-[26px] border-2 border-[#9b8b92] bg-white p-5 sm:min-h-[200px] sm:flex-row sm:items-center sm:px-7 sm:py-6">
                <label className="flex shrink-0 items-center gap-3 sm:gap-5">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => onToggleItem(item.id)}
                    aria-label={`Select ${item.name}`}
                    className="h-6 w-6 accent-[#a83f5b]"
                  />
                  <img src={item.image} alt={item.name} className="h-28 w-28 object-contain sm:h-36 sm:w-36" />
                </label>

                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-2xl font-bold italic text-[#393438] sm:text-3xl">{item.name}</h2>
                  <p className="mt-1 font-serif text-base font-bold text-[#a83f5b]">{formatPrice(item.price)}</p>
                  <button onClick={() => onRemove(item.id)} className="mt-3 text-xs text-[#8c7d84] underline underline-offset-4 hover:text-[#a83f5b]">
                    Remove
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 self-end sm:self-start">
                  <button onClick={() => onQuantityChange(item.id, 1)} aria-label={`Increase ${item.name} quantity`} className="h-10 w-10 rounded-full border border-[#9b8b92] text-lg hover:bg-[#ffe8f1]">+</button>
                  <span className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-[#9b8b92] px-2 text-sm">{item.quantity}</span>
                  <button onClick={() => onQuantityChange(item.id, -1)} aria-label={`Decrease ${item.name} quantity`} className="h-10 w-10 rounded-full border border-[#9b8b92] text-lg hover:bg-[#ffe8f1]">−</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t-2 border-[#9b8b92] bg-white px-4 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-sm text-[#51464c]">
              <input type="checkbox" checked={allSelected} onChange={(event) => onToggleAll(event.target.checked)} className="h-6 w-6 accent-[#a83f5b]" />
              Select All
            </label>
            <div className="ml-auto flex items-center gap-4 sm:gap-6">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#8c7d84]">Selected total</p>
                <p className="font-serif text-lg font-bold text-[#a83f5b] sm:text-xl">{formatPrice(selectedTotal)}</p>
              </div>
              <button
                onClick={onCheckout}
                disabled={selectedCount === 0}
                className="rounded-xl bg-[#a83f5b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#87334a] disabled:cursor-not-allowed disabled:opacity-40 sm:px-8"
              >
                Check Out ({selectedCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;

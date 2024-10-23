import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { productsToCart } = useAuth();

  return (
    <>
    <div style={{ height: 'calc(100vh - 52px)' }} className=" bg-white dark:bg-gray-900 md:py-16">
      <section className=" bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div className="relative mt-6 overflow-x-auto border-b border-gray-200 dark:border-gray-800 sm:mt-8">
              <table className="w-full text-left text-base text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {productsToCart.map((product, index) => (
                    <tr key={index}>
                      <td className="w-96 min-w-56 whitespace-nowrap py-4">
                        <a href="#" className="flex items-center gap-4 font-medium hover:underline">
                          <div className="aspect-square h-10 w-10 shrink-0">
                            <img className="h-full w-full dark:hidden" src={product.imageLight} alt={product.name} />
                            <img className="hidden h-full w-full dark:block" src={product.imageDark} alt={product.name} />
                          </div>
                          {product.name}
                        </a>
                      </td>

                      <td className="p-4">
                        <label htmlFor={`counter-input-${index}`} className="sr-only">Choose quantity:</label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            id={`decrement-button-${index}`}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id={`counter-input-${index}`}
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            value={product.amount}
                            required
                          />
                          <button
                            type="button"
                            id={`increment-button-${index}`}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-end text-base font-bold text-gray-900 dark:text-white">${product.totalPrice}</td>

                      <td className="py-4">
                        <button type="button" className="ml-auto block rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:text-gray-400">
                          <span className="sr-only">Remove</span>
                          <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-500">-$299.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                </dl>
              </div>
            </div>

            <div className="mt-6 gap-4 sm:flex sm:items-center sm:justify-center">
              <a href="#" className="w-full flex rounded-lg border border-gray-200 bg-white px-5 py-2.5 justify-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Continue Shopping</a>
              <a href="#" className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Proceed to Checkout</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default CartPage;

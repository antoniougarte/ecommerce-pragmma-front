import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeaderComponent = () => {

  const { user } = useAuth();

  return(
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
              <div className="flex justify-start items-center">
                  <Link to="/" className="flex mr-4">
                    <img src="https://flowbite.s3.amazonaws.com/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pragmma Store</span>
                  </Link>
                </div>
              <div className="flex items-center lg:order-2">

              <Link to="/cart" className="flex items-center mx-8 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                  Go to cart
              </Link>
              
              {user && <p className="dark:text-white light:text-black">Welcome {user?.name}</p>}
              {!user && (
                <button
                  type="button"
                  className="sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
              )}
              <button type="button" className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
              </button>
              </div>
          </div>
      </nav>
    </header>
  )
};

export default HeaderComponent;
// components/SearchForm.js
function Search() {
  return (
    <form className="w-full">
      <div className="flex items-center justify-between w-full">
        <select
          id="pricingType"
          name="pricingType"
          className="hidden md:block w-[120px] h-10 border border-slate-300 focus:outline-none focus:border-slate-300 border-r-0 text-slate-500 px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="Products">Products</option>
          <option value="Purchase quotations">Purchase quotations</option>
          <option value="Stock offers">Stock offers</option>
        </select>
        <input
          type="text"
          placeholder="Search for the tool you like"
          className="w-full px-3 h-10 border border-slate-300 focus:outline-none focus:border-slate-300"
        />
        <button type="submit" className="bg-m p-3">
          <svg
            className="text-white"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default Search;

<div>
  <div className="md:hidden block">
    <div className="bg-green-500 text-white p-2 text-base flex items-center w-full">
      <BiLock className="mr-1" fontSize={30} />
      Your data is encrypted. You register safely.
    </div>
    <div className="p-3 bg-[#fcebcc] relative">
      <h6 className="text-y font-semibold uppercase">PREMIUM</h6>
      <del className="text-[#969696] text-md notranslate text-line-through">
        EUR 279.00
        <small className="text-muted font-normal">+VAT</small>
      </del>
      <span className="bg-rose-500 text-white">-20%</span>
      <br />
      <span className="text-2xl font-semibold uppercase">
        EUR 223.20
        <small className="text-[#969696] font-normal">+VAT</small>
      </span>
      <button
        onClick={() => setShowPremium(!showPremium)}
        className="absolute right-3 top-2"
      >
        <BiChevronDown className="fill-[#f29d00]" fontSize={30} />
      </button>
    </div>
  </div>
  <div className="md:hidden block">
    <div className="bg-green-500 text-white p-2 text-base flex items-center w-full">
      <BiLock className="mr-1" fontSize={30} />
      Your data is encrypted. You register safely.
    </div>
    <div className="p-3 bg-[#fcebcc] relative">
      <h6 className="text-y font-semibold uppercase">STANDARD</h6>
      <del className="text-[#969696] text-md notranslate text-line-through">
        EUR 199.00
        <small className="text-muted font-normal">+VAT</small>
      </del>
      <span className="bg-rose-500 text-white">-20%</span>
      <br />
      <span className="text-2xl font-semibold uppercase">
        EUR 159.20
        <small className="text-[#969696] font-normal">+VAT</small>
      </span>
      <small className="text-[#969696]">/ 1 year</small>
      <button
        onClick={() => setShowStandard(!showStandard)}
        className="absolute right-3 top-2"
      >
        <BiChevronDown className="fill-[#f29d00]" fontSize={30} />
      </button>
    </div>
  </div>
</div>;

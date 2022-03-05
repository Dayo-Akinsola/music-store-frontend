import { useState, useEffect } from "react";

const Options = ({ SortByPrice, setPages, genre }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const { highToLow, lowToHigh, defaultOrder } = SortByPrice; 

  useEffect(() => {
    setSelectedOption({ value: 'default'})
  }, [genre]);

  const sortFunctions = {
    'price-high-low': highToLow,
    'price-low-high': lowToHigh,
    'default': defaultOrder,
  }

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption({value});
    const albumGroupPaginated = sortFunctions[value]();
    setPages(albumGroupPaginated);
  }


  return (
    <div className="shop__options">
      <label htmlFor="sort" className="shop__options--label">Sort By :</label>
      <select name="sort" value={selectedOption.value} onChange={handleSelectChange} className="shop__options--select">
        <option value="default">Default</option>
        <option value="price-low-high">Price: low to high</option>
        <option value="price-high-low">Price: high to low</option>
      </select>
    </div>
  )

}

export default Options;
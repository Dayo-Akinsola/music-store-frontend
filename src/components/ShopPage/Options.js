import { useState } from "react";

const Options = ({ SortByPrice }) => {
  const [selectedOption, setSelectedOption] = useState({ value: 'default'});

  const handleSelectChange = (event) => {
    setSelectedOption({ value: event.target.value});
  }

  return (
    <div className="shop__options">
      <label htmlFor="sort" className="shop__options--label">Sort By :</label>
        <select name="sort" value={selectedOption.value} onChange={handleSelectChange} className="shop__options--select">
          <option value="default">Default</option>
          <option value="price-low-high">Price: low to high</option>
          <option onSelect={SortByPrice.highToLow()} value="price-high-low">Price: high to low</option>
        </select>
    </div>
  )

}

export default Options;
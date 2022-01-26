const QuantityInput = ({ quantity, decrementQuantity, incrementQuantity, handleQuantityChange, classNamePrefix}) => {

	const quantityStyle = {
		position: 'relative',
		width: '100%',
		maxWidth: '9.3rem',
		padding: 0,
		border: 0,
	}
	const btnStyles = {
		plusBtn: {
			right: '0.3em',
			backgroundPositionX: '-3.2rem',
			top: 0,
			backgroundPositionY: '-0.5em',
		},
		minusBtn: {
			left: '0.3em',
			top: 0,
			backgroundPositionX: '-0.7em',
			backgroundPositionY: '-0.5em',
		}
	}

	const purchaseQuantityStyle = {
	  'WebkitAppearance': 'none',
	  'MozAppearance': 'textfield',
    margin: 0,
	  fontSize: '18px',
	  height: '2rem',
	  borderRadius: '2rem',
	  border: 0,
	  background: '#fff',
	  color: '#222',
	  boxShadow: '2px 5px 16px 0px #1A3D645E',
	  textAlign: 'center',
	  boxSizing: 'border-box',
	  fontWeight: 400,
	  outline: 'none',
	  width: '100%',
	}

	return (
		<div style={quantityStyle} className={`${classNamePrefix}--quantity`}>
			<button style={btnStyles.plusBtn} onClick={incrementQuantity} className={`${classNamePrefix}--plus increment-btn`}>Plus</button>
			<input 
				style={purchaseQuantityStyle}
				type="number" step="1" min="1" 
				name="quantity" 
				value={quantity} onChange={handleQuantityChange} 
				className={`${classNamePrefix}--purchase-quantity`} 
			/>
			<button style={btnStyles.minusBtn} onClick={decrementQuantity} className={`${classNamePrefix}--minus increment-btn`}>
				Minus
			</button>
		</div>
	)
}

export default QuantityInput;
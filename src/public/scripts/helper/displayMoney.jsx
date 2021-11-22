export default function dislplayMoney(amt) {
	return (Math.round(amt * 100) / 100).toFixed(2)
}

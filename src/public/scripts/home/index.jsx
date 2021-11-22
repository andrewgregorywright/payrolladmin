import $								from 'jquery'
import ReactDOM							from 'react-dom'
import Navbar							from '../header/navbar'

$(function () {
	ReactDOM.render(<Navbar active="Home" />, document.getElementById('header'))
})

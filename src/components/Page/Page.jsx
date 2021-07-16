import './Page.css'
import Spinner from 'react-bootstrap/Spinner';

const Page = (props) => {
  return (
    <div className="page">
			{ props.isLoading ? (
				<Spinner className="loading-spinner" animation="border" variant="secondary" />
			) : props.children }
		</div>
  )
}

export default Page
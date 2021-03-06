import React, { useState } from "react"
import "./ReadPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { useHistory } from "react-router-dom";
import { isAddressInstanceOfContract } from '../../utils/contractHelpers'
import Page from '../../components/Page/Page'
import { ethers } from "ethers";

const ReadPage = (props) => {
	const history = useHistory();
  const [addressInput, setAddressInput] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    var valid = ethers.utils.isAddress(addressInput)
    if (valid) {
      var isBlog = await isAddressInstanceOfContract(addressInput, DBlogContract)
      if (isBlog) {
        history.push(`/blog?id=${addressInput}`)
      }
      else {
        var isPost = await isAddressInstanceOfContract(addressInput, DBlogPostContract)
        if (isPost) {
          history.push(`/post?id=${addressInput}`)
        }
        else {
          // display not found
        }
      }
    }
    else {
      // display invalid address
    }
  }

  return (
		<Page isLoading={false}>
      <div className="page-container">
      <form className="mb-3" onSubmit={handleSubmit}>
        <h4 className="read-title">Enter blog address or post address.</h4>
				<div className="search-address-input input-group mb-4">
					<input 
					  type="text"
            onChange={e => setAddressInput(e.target.value)}
						className="form-control form-control-lg"
						placeholder="0x0"
						required />
					<div className="input-group-append">
					</div>
				</div>
				<button type="submit" className="btn btn-primary btn-block btn-lg">Search</button>
			</form>
      </div>
    </Page>
  )
}


export default ReadPage

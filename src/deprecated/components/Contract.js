import logo from '../images/largeLogo.png';

export const Contract = props => {


	const signatureReturn = () => {
		if (this.props.isSigned) {
			props.client.name
		}
	}
	return {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		const d = new Date();
		const dayOf = d.getDate();
		switch (dayOf % 10 ) {
			case 1:
				const day = dayOf+"st,";
				break;
			case 2:
				const day = dayOf+"nd,";
				break;
			case 3:
				const day = dayOf+"rd,";
				break;
			default:
				const day = dayOf+"th,";
				break;
		}
		if (props.handle) {
			const handle = props.handle;
		}
		else
		{
			const handle = props.asCompany : client.company.name ? client.name;
		}
		if (props.asCompany){
			const clientIntro = client.name + ' on behalf of ' + client.company.name + ', with an office located at ' client.company.address + ' ("'+ handle +'")';
			const handle = client.company.name;
			const signatureEntry = client.name + ', ' + client.company.name;
		}
		else{
			const clientIntro = client.name + ' (" '+ handle + '")';
			const handle=client.name;
		}

		return (
			<div id='contract'>
				<p>Sign as company representative <input type="checkbox" onCheck= {val => props.asCompanyChange(val.target.checked)} /></p>
				<div>
					<div class="title">Service Contract</div>
					<p>This contract is entered into and made effective as of {[months[d.getMonth()], day, d.getFullYear()].join(' ');}
					between {client}, and Colin Brennan on behalf of SysVisionz, with an office located at {props.svz.address} (“SysVisionz”).</p>
					<p className='header'>Description of the Services</p>
					<p>SysVisionz will provide paid services as requested or required in</p>
					<p>{props.svz.services.map(service => <p>"-"{service}</p>)}</p>
					<p className='header'>Terms and Conditions</p>
					<p>This contract is governed by the terms and conditions provided here.</p>
					<p className='subheader'>I. Intellectual Property Rights</p>
					<p className='miniheader'>1.Retained Rights.</p>
					<p>Each party will retain all right, title, and interest in and to its own 
					preexisting intellectual property, regardless of any disclosure of such preexisting 
					intellectual property to the other party, subject to any licenses granted in the following.</p>
					<p className='miniheader'>2. Preexisting Intellectual Property</p>
					<p>SysVisionz will not use any SysVisionz or third party preexisting intellectual property in connection with this 
					contract unless SysVisionz has the right to use it for {handle}’s benefit. If SysVisionz does not have ownership rights to
					such preexisting intellectual property, SysVisionz will obtain from the owner any rights as are necessary to enable 
					SysVisionz to comply with this contract.</p>
					<p className='miniheader'>3. No Rights to {handle} Intellectual Property</p>
					<p>Except for the limited license to use materials provided by {handle} necessary for SysVisionz to perform 
					the services under this contract, SysVisionz is granted no right, title, or interest in any {client.company.name} 
					intellectual property.</p>
					<p className='subheader'>II. Limitation of Liability</p>
					<p className='miniheader'>1. Losses</p>
					<p>Except as in the following section, in no event is either party liable for damages 
					loss of data, profits or revenue, cost of capital, downtime costs, or any exemplary 
					or punitive damages from any claim or action, even if advised of the possibility of such damages.</p>
					<p className='miniheader'>2. Excepted Losses</p>
					<p>Any purported limitation or waiver of liability does not extend to the SysVisionz obligation
					to take all reasonable measures to prevent theft of agreed upon confidential data, obligation to 
					under no conditions provide a product not conforming to the expressed standards as outlined in 
					the non-conforming services section, and obligation to reasonably advise risks of an approach or method.</p>
					<p className='subheader'>III. Inspection and Acceptance</p>
					<p className='miniheader'>1. Non-Conforming Services.</p>
					<p>If any of the services performed do not meet the specified requirements, {handle} may require 
					SysVisionz to perform the services again in order to bring them into full conformity with the requirements, at SysVisionz’s sole cost and expense. When the defects in services cannot be corrected by re-performance, {handle} may require SysVisionz to take necessary action, at the cost and expense of Sysvisionz, to ensure that future performance conforms to the requirements and/or reduce any price payable under the applicable project to reflect the reduced value of the services performed by SysVisionz and accepted by {handle}.
					</p>
					<p className="subheader">IV. Limited Technical Warranty</p>
					<p className="miniheader">1. Length</p>
					<p>The limited technical warranty extends for 6 months from the delivery of the product. 
					This is not extended by work done to satisfy the limited technical warranty, 
					routine maintenance done on the product by SysVizionz, 
					changes made to the product by {handle} or other entities 
					or any software or hardware updates performed by SysVisionz, {handle} or other entities. 
					The technical warranty does not extend to any items outside the delivered product, 
					even if they are part of a larger project or site.</p>
					<p className="miniheader">2. Qualifying Items</p>
					<p>The limited technical warranty does not extend to items
					<p className='header'>Compensation</p>
					<p>Wherever possible, please make payment within 21 days following the receipt of invoice. Rates are hourly or project based, at a rate or total sum agreed upon between {handle} and SysVisionz at the start of a project. In addition, half of the estimated bill is to be paid at the start of the project, and the remainder to be paid upon project completion. This sum is non-refundable, excepting such cases as outlined in the Excepted Losses section.</p><br/>
					<p>By their signatures below,</p>
					<p>{clientIntro} and Colin Brennan on behalf of SysVisionz have agreed to this contract as laid forth.</p>
					<p>Colin Brennan, SysVisionz LLC</p>
					<img src={signature} />
					<p>{signatureEntry}</p>
					{signatureReturn()}
				</div>
			</div>
		)
	}
}
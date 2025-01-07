'use client'
import { FC } from "react";
import ProposalProvider from "../../contexts/proposal";
import Loading from "~/Loading";

const Proposal: FC = () => {
	return (

		<ProposalProvider>
			<h1>Proposal</h1>
			<Loading message="Loading proposal..." delay={2500} onIsLoaded={() => console.log('loaded!')} at={{10: () => console.log('10%'), 50: () => console.log("50%")}} />
		</ProposalProvider>
	)
}

export default Proposal;
import { RouteProps } from "./routeProps";

import { OrganizationLinksType, WorkloadResponse } from "../types";
import OrganizationLinks from "../organization_links.json";

import { jira, github } from "../utils";

export const workload = async ( { req, res } : RouteProps ) => {
    try {
        let people : WorkloadResponse = {};

        let tickets = await jira.GetActiveTickets();
        let pullRequest = await github.GetAllPullRequestData();
    
        for ( const key in OrganizationLinks ) {
            let person = ( OrganizationLinks as OrganizationLinksType )[key];
            
            if ( !( person.name in people ) ) people[ person.name ] = {
                email: key,
                github: person.github,
                tickets: { count: 0, data: [] },
                reviewing: { count: 0, data: [] }
            }
    
            let personTickets = tickets.filter( ticket => ticket.assignee.match(`.*${person.name}.*`) );
    
            people[ person.name ].tickets.count = personTickets.length;
    
            for ( let ticket of personTickets ) {
    
                let pRLink = pullRequest.find( pR => pR.title.match(`.${ticket.key}.*`) );
    
                people[ person.name ].tickets.data.push( {
                    ticket,
                    pullRequest: pRLink
                } );
    
                // Time To Get People assigned to review a pull request
    
                if ( pRLink?.reviewers ) {
                    for ( let rev of pRLink.reviewers ) {
                        let orgUser = Object.values( OrganizationLinks ).find( orgLink => orgLink.github === rev.name );
    
                        if ( orgUser ) {

                            if ( !people[ orgUser.name ] ) {
                                people[ orgUser.name ] = {
                                    email: orgUser.email,
                                    github: orgUser.github,
                                    tickets: { count: 0, data: [] },
                                    reviewing: { count: 0, data: [] }
                                }
                            }

                            people[ orgUser.name ].reviewing.count += 1;
    
                            people[ orgUser.name ].reviewing.data.push({
                                ticket,
                                pullRequest: pRLink
                            });
                        } 
                    }
                }
    
            }
        }
    
        res.json( people );
    }catch( e ) {
        res.status( 400 ).json({ message: "Problem getting devs workload. Please try again" })
    }
};

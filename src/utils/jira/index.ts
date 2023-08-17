import fs from "fs";

import * as JiraTypes from "./type";

export const GetActiveTickets = async (): Promise<JiraTypes.ImportantIssueData[]> => {
  var options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.jiraApiEmail}:${process.env.jiraApiKey}`
      ).toString('base64')
        }`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: [
        "summary",
        "status",
        "assignee",
        "reporter",
        "labels",
        "creator",
        "created",
        "issuetype",
        "priority",
        "updated",
        "customfield_10000"
      ],
      jql: "project = AP AND assignee != null AND status != Closed AND status != To-do"
    })
  };

  let response = await fetch("https://docnetwork.atlassian.net/rest/api/2/search", options);

  if ( !response.ok ) throw "Problem Getting Active Issues"

  const issues = ( await response.json() as any ).issues as JiraTypes.IssueData[];

  return issues.map(
    issue => ({
      title: issue.fields.summary,
      key: issue.key,
      labels: issue.fields.labels,
      status: issue.fields.status.name,
      creator: issue.fields.creator.displayName,
      reporter: issue.fields.reporter.displayName,
      assignee: issue.fields.assignee.displayName,
      issuetype: issue.fields.issuetype.name,
      priority: issue.fields.priority?.name,
      created: issue.fields.created,
      updated: issue.fields.updated,
      customfield_10000: issue.fields.customfield_10000
    })
  ) as JiraTypes.ImportantIssueData[];
};

export const GetPersonActiveTickets = async ( name: string ): Promise<JiraTypes.ImportantIssueData[]> => {
  return (
    await GetActiveTickets()
  ).filter( ( ticket ) => ticket.assignee.match(`.*${name}.*`) )
};

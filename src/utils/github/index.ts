import { Octokit, App } from "octokit";
import { ImportantRepoPullRequestData } from "./type";

const octokit = new Octokit({
  userAgent: "GitHubBot/v1.0.0",
  auth: process.env.octokitAuth
});

const getOrgRepos = async ( org: string ) => {
  try {
    return (
      await octokit.request('GET /orgs/{org}/repos', {
        org,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    ).data
  }catch (e) {
    return [];
  }
}

const getRepo = async ( owner: string, repo: string ) =>  {
  return (
    await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  ).data
}

export const getRepoPullRequest = async ( owner: string, repo: string ) => {
  return (
    await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  ).data
}

export const GetAllReposPullRequestData = async () => {
  let repos = await getOrgRepos("docnetwork");

  let repoPullRequest: { [ key: string ]: ImportantRepoPullRequestData[] } = {}

  for ( let repo of repos ) {
    repoPullRequest[repo.full_name] = (
      await getRepoPullRequest('docnetwork', repo.name)
    ).map( pr => ({
      title: pr.title,
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      creator: {
        name: pr.user?.login,
        url: pr.user?.url
      },
      pull_url: pr.html_url,
      status: pr.state,
      pull_request_from_branch_name: pr.head.ref,
      pull_request_to_branch_name: pr.base.ref,
      assignes: [
        pr.assignee && {
          name: pr.assignee.login,
          url: pr.assignee.url
        },

        ...(
          pr.assignees ? pr.assignees.map( as => ({ name: as.login, url: as.url })) : []
        )
      ],
      reviewers: pr.requested_reviewers?.map( rr => ({ name: rr.login, url: rr.url })),
      labels: pr.labels.map( l => ({ name: l.name, description: l.description }))
    }))
  }
  
  return repoPullRequest;
}

export const GetAllPullRequestData = async () => {
  return Object.values(
    await GetAllReposPullRequestData()
  ).filter( rP => rP.length > 0 ).flat();
}

export const GetAllRepoPullRequestData = async ( repo : string ) => {
  return ( await GetAllReposPullRequestData() )[repo];
}

export const GetTicketPullRequestData = async ( ticketName: string ) => {
  const allData = await GetAllReposPullRequestData();

  const repoList = Object.values( allData );

  for ( let repo of repoList ) {
    for ( let pullrequest of repo ) {
      if ( pullrequest.title.match(`.${ticketName}.*`)) return pullrequest;
    }
  }

  return null;
}

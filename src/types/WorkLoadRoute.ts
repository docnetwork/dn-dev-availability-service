import { ImportantRepoPullRequestData } from "../utils/github/type";
import { ImportantIssueData } from "../utils/jira/type";

export type WorkloadResponseTicket = {
    ticket: ImportantIssueData;
    pullRequest?: ImportantRepoPullRequestData;
};

export type WorkloadResponseIndividual = {
    github: string;
    email: string;
    tickets: {
        count: number;
        data: WorkloadResponseTicket[];
    };
    reviewing: {
        count: number;
        data: WorkloadResponseTicket[]
    };
};

export type WorkloadResponse = Record<string, WorkloadResponseIndividual>;

export type ImportantIssueData = {
    title: string;
    key: string;
    labels: string[]
    status: string;
    creator: string;
    reporter: string;
    assignee: string;
    created: string; // Time Stamp
    updated: string; // Time Stamp
    issuetype: string;
    priority: string;
    customfield_10000: string;
}

export type IssueDataPerson = {
    self: string;
    accountId: string;
    avatarUrls: { [key in "48x48" | "24x24" | "16x16" | "32x32"]: string };
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
}

export type IssueData = {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: {
        customfield_10000: string;
        summary: string;
        created: string; // Time Stamp
        updated: string; // Time Stamp
        creator: IssueDataPerson;
        reporter: IssueDataPerson;
        assignee: IssueDataPerson;
        labels: string[];
        status: {
            self: string;
            description: string;
            iconUrl: string;
            name: string;
            id: string;
            statusCategory: {
                self: string;
                id: string;
                key: string;
                colorName: string;
                name: string;
            };
        }
        issuetype: {
            self: string;
            id: string;
            description: string;
            iconUrl: string;
            name: string;
            subtask: boolean;
            avatarId: number;
            hierarchyLevel: number
        };
        priority: {
            self: string;
            iconUrl: string;
            name: string;
            id: string;
        }
    }
};

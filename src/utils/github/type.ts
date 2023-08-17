export type ImportantRepoPullRequestData = {
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
    pull_url: string;
    pull_request_from_branch_name: string;
    pull_request_to_branch_name: string;
    creator: {
        name?: string;
        url?: string;
    };
    labels: {
        name: string;
        description: string;
    }[];
    reviewers?: {
        url: string;
        name: string;
    }[];
    assignes: (
        {
            url: string;
            name: string;
        } | null
    )[];
};

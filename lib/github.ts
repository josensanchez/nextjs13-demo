// CONSTANTS

const baseUrl = "https://api.github.com";
const baseContentUrl = "https://raw.githubusercontent.com";


//PUBLIC API

export const getRepository = async (organization: string, name: string): Promise<Repository> => {
  return fetch(`${baseUrl}/repos/${organization}/${name}`)
          .then((response) => response.json())
          .then(addExtraReadmeHtml);
}

export const addExtraReadmeHtml = async(repository: Repository):Promise<Repository> => {
  const md = await getReadme(repository);
  const html = await md2html(md);
  repository.readme = html;
  return repository;
}


export const getReadme = async (repository: Repository):Promise<string> => {
  const { default_branch, full_name } = repository;
  const url = `${baseContentUrl}/${full_name}/${default_branch}/README.md`;

  return fetch(url)
          .then((response) => response.text())
          .catch((error)  => "## Readme.md File not Found")
};

export const md2html = async (md: string): Promise<string> => {
  const headers = getPostHeaders()
  const body = JSON.stringify({
    "text": md,
  });

  return fetch(`${baseUrl}/markdown`, {method:"POST", headers, body})
    .then(response => response.text())
};


// Types
export type User = {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  "type": string;
}


export type Repository = {
  name: string;
  full_name: string;
  owner: Partial<User>;
  description: string;
  url: string;
  default_branch: string;
  organization: Partial<User>;
  readme?: string,
}


// Privated Methods
 const token = process.env.GITHUB_TOKEN;
function getPostHeaders() {
  return new Headers({
      'Content-Type': 'application/json',
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
  });

}

const github = { getRepository, addExtraReadmeHtml, getReadme, md2html };
export default github;

const listeRepos = async (userName) => {
  const repos = await fetch(
    `https://api.github.com/users/${userName}/repos?type=owner&sort=updated`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching repos: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      return []; // Return -1 in case of error
    });
  const markup = repos
    .map((repo) => {
      return `<li>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        (⭐${repo.stargazers_count})
    </li>`;
    })
    .join("");

  console.log(markup);
  const content = document.getElementById("content");
  content.innerHTML = `<ul>${markup}</ul>`;
};

listeRepos("vancemcgrady"); // Replace "octocat" with any GitHub username you want to test

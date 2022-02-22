// -- Prismic Repo Name
export const repoName = 'shibuya-ignews'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = 'MC5ZaFR0U3hJQUFDZ0F5NHlr.HjDvv70V77-9ZRPvv73vv73vv716Oe-_vRARdG5n77-9E--_ve-_vQlnOC8r77-977-977-977-9Ng'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'post') {
    return `/posts/${doc.uid}`
  }
  return '/'
}

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const routeResolver = {
  routes: [
    {
      "type":"page",
      "path":"/:uid"
    },
  ]
};
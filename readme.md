# Quickstart

- **Dev server:** `yarn serve`
- **Build:** `yarn build`

# To-Do

## MVP 

- [x] Load data from source server
- [x] Display as table
- [x] Paginate data table
- [x] Load indicator
- [x] Sorting by job title, description
- [x] Searching by job title, description

## 0.1 - Statefulness

- [ ] Show job details in separate route
- [x] Persist search queries, sort and page in URL
- [x] Add mobile responsive support

## 0.2 - Details

- [ ] Add up/down/back buttons when viewing a job detail
- [ ] Add enhanced map UI in job detail
- [ ] Add enhanced search UI to display matching terms inline
- [ ] Add icons and labels/tags for other flags provided from API data
- [ ] Enable search by job ID
- [x] Enable sort by company, newest/oldest
- [ ] Enable hop to page by clicking current page button
- [ ] Enhance paginator slide animation when scrolling pages
- [ ] Add progress indicator bar on paginator
- [ ] Flag as liked, filter by liked

## 0.3 - Reusability

- [x] Abstract out loading/error components in job grid
- [x] Convert job grid loop to a functional component
- [ ] Abstract grid sorting and searching to services
- [ ] Consider using Vuex as primary data store

## Dev Notes

- There are errors bubbling up regarding Route being exported from vue-router. Known issue.
[VueJS issue here.](https://github.com/vuejs/vue-cli/issues/1498#issuecomment-395461425)
- IDEs may get an error regarding `RawLocation` in `$router.push` arguments. Known issue that
is fixed in vue-router, but not yet tagged for release. 
[Vue-router issue here.](https://github.com/vuejs/vue-router/issues/1932)
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
- [ ] Persist search queries, sort and page in URL
- [ ] Add mobile responsive support

## 0.2 - Details

- [ ] Add up/down/back buttons when viewing a job detail
- [ ] Add enhanced map UI in job detail
- [ ] Add enhanced search UI to display matching terms inline
- [ ] Add icons and labels/tags for other flags provided from API data
- [ ] Enable search by job ID
- [ ] Enable sort by company, newest/oldest
- [ ] Enable hop to page by clicking current page button
- [ ] Enhance paginator slide animation when scrolling pages
- [ ] Add progress indicator bar on paginator
- [ ] Flag as liked, filter by liked

## 0.3 - Reusability

- [ ] Abstract out loading/error components in job grid
- [ ] Convert job grid loop to a functional component
- [ ] Consider using Vuex as primary data store
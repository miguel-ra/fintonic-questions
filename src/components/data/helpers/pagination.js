export function generatePages(pageIndex, showPages, numberOfPages) {
  let pages = [pageIndex];
  let index = 0;
  let buttonInserted = true;
  while (pages.length < showPages && buttonInserted) {
    index += 1;
    buttonInserted = false;
    if (pageIndex + index < numberOfPages) {
      pages.push(pageIndex + index);
      buttonInserted = true;
    }
    if (pageIndex - index >= 0) {
      pages.unshift(pageIndex - index);
      buttonInserted = true;
    }
  }
  return pages;
}

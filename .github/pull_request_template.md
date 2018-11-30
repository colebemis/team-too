# Pull Request Checklist
As the requestor of this pull request, it is your responsibility to complete the following steps.
- [ ] Inlcude a reference to the issue(s) that this pull request closes using the associated issue numbers.
  -  Make sure to use the syntax "Closes #XX"
- [ ] List commands that must be run if packages must be updated or installed. If there are no package changes, include that "No package changes have been made."
- [ ] List any overall changes to the data model.
- [ ] List known issues and associated workarounds. If there are no known issues, include that "No known issues have been discovered."
- [ ] List test cases and expected behavior to pass the test case.

## Summary
This pull request closes #XX

### Package Changes
- Added NewPackage. Run `npm install greatPackage` from within `/source` directory
- Updated OldPackage. Run `npm install oldPackage@1.0.1` from within `/source` directory

### Data Model Changes
- New PR_DATA database object with fields for requestor, approver, and comments.
- [ ] I have updated the [Database model](https://whimsical.co/7PBV8ZYSoxCeq6V4dUw2Sz) with all changes I am proposing with this Pull Request.
- [ ] I have updated the [Requirements Document](https://docs.google.com/document/d/1HpaTuRBecx1ZbhxYL6glrHLT2Lg676OVGS2v6zB32JM/edit?usp=sharing) with all changes I am proposing with this Pull Request.

### Known Issues
- Pull requests are not standardized. Workaround: Create PR template.
- Pull requests do not do my taxes. No workaround.

## QA
### Test Cases
- [ ] When opening a pr, text should pre-populate the pr comment field.

### User Acceptance Tests
- [ ] I updated the [UAT Spreadsheet](https://docs.google.com/spreadsheets/d/1-unNcLQL7Nr2V69aXBpQKMH-Uv7lJhNOD3K-V7wv5Ik/edit?usp=sharing "UAT Spreadsheet") with tests for all proposed feature in this PR.

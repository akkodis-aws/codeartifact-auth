# aws-codeartifact-auth

This repo houses a CLI tool and custom Github Action for authenticating npm with AWS codeartifact.

Forked from the great work at https://github.com/MondoPower/codeartifact-auth

## Quickstart

### Github Action

#### Usage

The below action will setup npm with the codeartifact registry scoped to the referenced package.

```yam
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v2
  with:
    role-to-assume: "<IAM role to assume, e.g. from secrets>"
    role-session-name: "<Sessions name>"
    aws-region: "<AWS region>"
- name: Configure npm with AWS CodeArtifact
  uses: akkodis-aws/codeartifact-auth@v3
  with:       
    domain: "<Domain in AWS CodeArtifact>"
    repository: "<Repository in AWS CodeArtifact>"
    scope: "<Package Scope (optional)>"
    region: "<AWS Region>"
    accountId: "<AWS AccountId>"
    packageType: "<Package Type>" #Supports poetry or npm as arguments
```

### CLI

#### Usage

Recommended for local usage, refer to the github action above for CI runners.

##### Method 1 - Package.json

Add the following to package.json:

```json
{
  "awsCodeArtifact": {
    "domain": "<Domain in AWS CodeArtifact>",
    "repository": "<Repository in AWS CodeArtifact>",
    "scope": "<Package Scope (optional)>",
    "region": "<AWS Region>",
    "accountId": "<AWS AccountId>",
    "packageType": "<Package Type>" //Supports poetry or npm as arguments
  }
}
```

Once you've added the config to your package.json. You will need to assumerole/set your aws credentials within your running context (CI/Terminal).

Then run ```codeartifact-auth```

It will update your home directories .npmrc file with the scope and token information.

##### Method 2 - CLI Arguments

```bash
CodeArtifact Command Line Arguments

-a --accountId                  AWS AccountId associated with codeartifact repo
-d --domain                     The name of the domain that is in scope for the generated authorization token
-r --repository                 The name of the repository e.g. OrganisationNamePackages
-s --scope                      The npm scope for the private package e.g. @OrganisationName
-p --region                     The region the codeArtifact repository is hosted in e.g. us-east-1
-m --packageType                The package type to set. Currently supports npm or poetry
-h --help                       display help page

Long options may be passed with a single dash.
```

Example

```bash
codeartifact-auth --accountId 290556015539 --domain mondo-artifacts --region ap-southeast-2 -r MondoNPMPackages -s @mondo
```

#### Windows Users

If you're using this tool on windows and you have installed it globally, you will need to set the path for npm packages. Otherwise the tool won't be picked up in your path.

Make sure you add it to your system path

e.g. ```%USERPROFILE%\AppData\Roaming\npm```

Example

![Image of ](./docs/updating-path-windows.png)

Command usage on windows:

```codeartifact-auth.cmd```

### Testing CLI locally

- npm link
- build
- run ```codeartifact-auth```

### Potential extensions/improvements

- CLI Tool to take a config or argument list
- CLI/Github action support for removing scope. This is useful for users that want all their packages pulled via codeartifact instead of just privately scoped ones.

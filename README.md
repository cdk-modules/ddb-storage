# Basic table storage system

This module provides a DynamoDB table with three predefined policies for read from, write into and administer it. As usual, it can be deployed standalone or as part of a larger setup

## Module components

This module contains a DynamoDB table with a partition key, and priced on-demand. Three policies allow specific access levels to that table - i.e. `read`, `write`, and `admin`, respectively. These policies can be attached to the users that will ultimately interact with the table, being able to assign more tailored permissions into their statements.

## Default configuration

By default, a table called `MyTable` will be created, containing a String primary key called `Id`.

## Getting started

### Running in one click

I'm working on preparing automated builds of the modules that could be installed in one click. Stay tuned!

### Installing from code

Install the dependency: `npm i @cdk-modules/ddb-storage` or clone this repository. If you just want to install this module standalone, follow this process

```bash
cd cdk-modules/ddb-storage/
npm i
npm run build
cdk deploy
```

And a new stack will appear in your account containing this module's resources.

### Integrating it into your app

If you already have a larger CDK app going - or plan to have it - you can use this module to provide your app with the authecation mechanism you'd need. Just install the deependency into your project, and follow this example:

```typescript
import { DdbStorage } from '@cdk-modules/ddb-storage'

...
this.storage = new DdbStorage(this, 'DdbStorage', {
  tableName: 'MyTable',
  keyName: 'Id'
});
...
```

## Combine modules

### Combine with Cognito Auth

This module, in combination with [cognito-auth](https://github.com/cdk-modules/cognito-auth), will allow you to provide table storage to your users. You could use object-level IAM statement conditions to further limit the access to the table items - i.e. by User Id or OAuth `sub`.
